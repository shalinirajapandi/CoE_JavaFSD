import 'package:flutter/material.dart';
import '../newspage.dart';

class CategoriesPage extends StatelessWidget {
  const CategoriesPage({super.key});

  static const List<Map<String, String>> categories = [
    {"name": "Technology", "icon": "💻"},
    {"name": "Sports", "icon": "⚽"},
    {"name": "Business", "icon": "📈"},
    {"name": "Health", "icon": "🏥"},
    {"name": "Entertainment", "icon": "🎭"},
    {"name": "Science", "icon": "🔬"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('News Categories'), centerTitle: true),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          return Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            elevation: 4,
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              leading: Text(category["icon"]!, style: const TextStyle(fontSize: 26)),
              title: Text(
                category["name"]!,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
              ),
              trailing: const Icon(Icons.arrow_forward_ios, size: 20),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => NewsPage(category: category["name"]!)),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
