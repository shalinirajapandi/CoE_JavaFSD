import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'share_contacts_page.dart'; 
class NewsDetailPage extends StatelessWidget {
  final Map article;
  const NewsDetailPage({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("News Details"),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.contacts, color: Colors.black),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => ShareContactsPage()),
              );
            },
          ),
        ],
      ),
      extendBodyBehindAppBar: true,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Share.share(article['url'] ?? "Check out this news!");
        },
        backgroundColor: Colors.grey,
        child: const Icon(Icons.share, color: Colors.white),
      ),
      body: Stack(
        children: [
          if (article['urlToImage'] != null)
            Positioned.fill(
              child: Image.network(
                article['urlToImage'],
                fit: BoxFit.cover,
                alignment: Alignment.topCenter,
                errorBuilder: (context, error, stackTrace) {
                  return const Center(
                    child: Icon(Icons.broken_image, size: 100, color: Colors.grey),
                  );
                },
              ),
            ),

          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.black.withOpacity(0.6), Colors.black.withOpacity(0.9)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),
          ),

          SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 100),

                if (article['urlToImage'] != null)
                  Hero(
                    tag: article['urlToImage'],
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(15),
                      child: Image.network(
                        article['urlToImage'],
                        width: double.infinity,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                const SizedBox(height: 20),

                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: Text(
                    article['title'] ?? 'No Title',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                  ),
                ),
                const SizedBox(height: 8),

                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        article['author'] != null ? "By ${article['author']}" : "Unknown Author",
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: Colors.white70),
                      ),
                      Text(
                        article['publishedAt']?.split("T")[0] ?? 'No Date',
                        style: const TextStyle(fontSize: 14, color: Colors.white60),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white.withOpacity(0.2)),
                    ),
                    child: Text(
                      article['content'] ?? 'No Content Available',
                      style: const TextStyle(fontSize: 16, color: Colors.white),
                      textAlign: TextAlign.justify,
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                if (article['url'] != null)
                  Center(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Share.share(article['url']); 
                      },
                      icon: const Icon(Icons.open_in_new, color: Colors.white),
                      label: const Text("Read More", style: TextStyle(color: Colors.white)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                    ),
                  ),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
