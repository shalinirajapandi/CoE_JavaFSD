import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'newsdetailpage.dart';
import 'searchpage.dart';
import 'savedarticlespage.dart';
import 'notificationpage.dart'; 

class NewsPage extends StatefulWidget {
  final String category;
  const NewsPage({super.key, this.category = "general"});

  @override
  State<NewsPage> createState() => _NewsPageState();
}
class _NewsPageState extends State<NewsPage> with SingleTickerProviderStateMixin {
  List articles = [];
  List<dynamic> savedArticles = [];
  List<Map<String, dynamic>> notifications = [];
  bool isLoading = true;
  late TabController _tabController;
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;

  final List<Map<String, String>> categories = [
    {"name": "General", "icon": "📰"},
    {"name": "Technology", "icon": "💻"},
    {"name": "Sports", "icon": "⚽"},
    {"name": "Business", "icon": "📈"},
    {"name": "Health", "icon": "🏥"},
    {"name": "Entertainment", "icon": "🎭"},
    {"name": "Science", "icon": "🔬"},
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: categories.length, vsync: this);
    _tabController.addListener(() {
      if (!_tabController.indexIsChanging) {
        fetchNews(categories[_tabController.index]["name"]!);
      }
    });
    fetchNews(widget.category);
    loadSavedArticles();
    _loadNotifications();
  }

  Future<void> _loadNotifications() async {
    final prefs = await SharedPreferences.getInstance();
    final String? savedData = prefs.getString('notifications');
    if (savedData != null) {
      setState(() {
        notifications = List<Map<String, dynamic>>.from(jsonDecode(savedData));
      });
    }
  }

  Future<void> _saveNotifications() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('notifications', jsonEncode(notifications));
  }
void _addNotification(String message) {
    setState(() {
      notifications.add({
        'message': message,
        'timestamp': DateTime.now().millisecondsSinceEpoch,
      });
      _saveNotifications();
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
  Future<void> fetchNews(String category) async {
    setState(() {
      isLoading = true;
    });

    final response = await http.get(Uri.parse(
        'https://newsapi.org/v2/top-headlines?country=us&category=${category.toLowerCase()}&apiKey=12eaa2fbdfba421590e82f1f0424fe20'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        articles = data['articles'];
        isLoading = false;
        _addNotification('New articles available in $category');
      });
    }
  }

  Future<void> loadSavedArticles() async {
    final prefs = await SharedPreferences.getInstance();
    final String? savedData = prefs.getString('saved_articles');
    if (savedData != null) {
      setState(() {
        savedArticles = jsonDecode(savedData);
      });
    }
  }

  Future<void> saveArticle(Map<String, dynamic> article) async {
  final prefs = await SharedPreferences.getInstance();
  if (!savedArticles.any((saved) => saved['title'] == article['title'])) {
    savedArticles.add({
      'title': article['title'],
      'description': article['description'],
      'urlToImage': article['urlToImage'], 
    });
    await prefs.setString('saved_articles', jsonEncode(savedArticles));
    setState(() {});
  }
}


  bool isArticleSaved(String title) {
    return savedArticles.any((saved) => saved['title'] == title);
  }

  void _showNotifications() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => NotificationPage(notifications: notifications),
      ),
    ).then((_) {
      _loadNotifications();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      appBar: AppBar(
        title: Text(
          'BREAKING NEWS 📰',
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 22,
            color: Colors.white70, 
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.primary,
        centerTitle: true,
        elevation: 4,
        actions: [
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications, color: Colors.white70), 
                onPressed: _showNotifications,
              ),
              if (notifications.isNotEmpty)
                Positioned(
                  right: 8,
                  top: 8,
                  child: Container(
                    padding: const EdgeInsets.all(2),
                    decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    constraints: const BoxConstraints(
                      minWidth: 16,
                      minHeight: 16,
                    ),
                    child: Text(
                      notifications.length.toString(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
            ],
          ),
          IconButton(
            icon: const Icon(Icons.bookmark, color: Colors.white70), 
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SavedArticlesPage()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.search, color: Colors.white70), 
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SearchPage()),
              );
            },
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: Colors.white70, 
          labelColor: Colors.white70, 
          unselectedLabelColor: Colors.grey.shade300,
          tabs: categories.map((category) => Tab(text: category["name"])).toList(),
        ),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : articles.isEmpty
              ? const Center(child: Text('No news available'))
              : Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                  child: ListView.builder(
                    itemCount: articles.length,
                    itemBuilder: (context, index) {
                      return Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        elevation: 8,
                        margin: const EdgeInsets.symmetric(vertical: 8),
                        child: Column(
                          children: [
                            if (articles[index]['urlToImage'] != null)
                              ClipRRect(
                                borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                                child: Image.network(
                                  articles[index]['urlToImage'],
                                  height: 200,
                                  width: double.infinity,
                                  fit: BoxFit.cover,
                                  errorBuilder: (context, error, stackTrace) =>
                                      Container(height: 200, color: Colors.grey.shade300),
                                ),
                              ),
                            Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    articles[index]['title'] ?? 'No Title',
                                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                          fontWeight: FontWeight.bold,
                                          color: Colors.black87,
                                        ),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    articles[index]['description'] ?? 'No description available.',
                                    style: Theme.of(context).textTheme.bodyMedium,
                                    maxLines: 3,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 10),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      IconButton(
                                        icon: Icon(
                                          isArticleSaved(articles[index]['title'])
                                              ? Icons.bookmark
                                              : Icons.bookmark_border,
                                          color: Colors.blue,
                                        ),
                                        onPressed: () {
                                          saveArticle(articles[index]);
                                          ScaffoldMessenger.of(context).showSnackBar(
                                            const SnackBar(content: Text('Article Saved!')),
                                          );
                                        },
                                      ),
                                      TextButton(
                                        style: TextButton.styleFrom(
                                          backgroundColor: Theme.of(context).colorScheme.primary,
                                          foregroundColor: Colors.white,
                                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                        ),
                                        onPressed: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => NewsDetailPage(article: articles[index]),
                                            ),
                                          );
                                        },
                                        child: const Text('Read More'),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
}