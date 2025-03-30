import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsPage extends StatefulWidget {
  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool _darkMode = false;
  double _fontSize = 16.0;
  String _selectedLanguage = "English";
  List<String> _languages = ["English", "Hindi", "French", "Spanish"];

  Map<String, Map<String, String>> localizedText = {
    "English": {
      "settings": "Settings",
      "dark_mode": "Dark Mode",
      "font_size": "Font Size",
      "language": "Language",
    },
    "Hindi": {
      "settings": "सेटिंग्स",
      "dark_mode": "डार्क मोड",
      "font_size": "फ़ॉन्ट आकार",
      "language": "भाषा",
    },
    "French": {
      "settings": "Paramètres",
      "dark_mode": "Mode sombre",
      "font_size": "Taille de police",
      "language": "Langue",
    },
    "Spanish": {
      "settings": "Configuración",
      "dark_mode": "Modo oscuro",
      "font_size": "Tamaño de fuente",
      "language": "Idioma",
    },
  };

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _darkMode = prefs.getBool("darkMode") ?? false;
      _fontSize = prefs.getDouble("fontSize") ?? 16.0;
      _selectedLanguage = prefs.getString("language") ?? "English";
    });

    print("Loaded Dark Mode: $_darkMode");
    print("Loaded Font Size: $_fontSize");
    print("Loaded Language: $_selectedLanguage");
  }

  Future<void> _updateSettings() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setBool("darkMode", _darkMode);
    await prefs.setDouble("fontSize", _fontSize);
    await prefs.setString("language", _selectedLanguage);

    print("Saved Dark Mode: $_darkMode");
    print("Saved Font Size: $_fontSize");
    print("Saved Language: $_selectedLanguage");

    setState(() {}); 
  }

  @override
  Widget build(BuildContext context) {
    bool isDarkMode = _darkMode;
    Color textColor = isDarkMode ? Colors.white : Colors.black;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          localizedText[_selectedLanguage]?["settings"] ?? "Settings",
          style: TextStyle(fontSize: _fontSize, color: textColor),
        ),
        backgroundColor: Colors.deepPurple,
      ),
      body: Container(
        color: isDarkMode ? Colors.black : Colors.white,
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SwitchListTile(
              title: Text(
                localizedText[_selectedLanguage]?["dark_mode"] ?? "Dark Mode",
                style: TextStyle(fontSize: _fontSize, color: textColor),
              ),
              value: _darkMode,
              onChanged: (value) {
                setState(() {
                  _darkMode = value;
                  _updateSettings();
                });
              },
            ),

            const SizedBox(height: 16),
            Text(
              localizedText[_selectedLanguage]?["font_size"] ?? "Font Size",
              style: TextStyle(fontSize: _fontSize, fontWeight: FontWeight.bold, color: textColor),
            ),
            Slider(
              value: _fontSize,
              min: 12.0,
              max: 24.0,
              divisions: 6,
              label: "${_fontSize.round()}",
              onChanged: (value) {
                setState(() {
                  _fontSize = value;
                  _updateSettings();
                });
              },
            ),

            const SizedBox(height: 16),
            Text(
              localizedText[_selectedLanguage]?["language"] ?? "Language",
              style: TextStyle(fontSize: _fontSize, fontWeight: FontWeight.bold, color: textColor),
            ),
            DropdownButton<String>(
              value: _selectedLanguage,
              dropdownColor: isDarkMode ? Colors.grey[900] : Colors.white,
              items: _languages.map((String language) {
                return DropdownMenuItem(
                  value: language,
                  child: Text(language, style: TextStyle(fontSize: _fontSize, color: textColor)),
                );
              }).toList(),
              onChanged: (value) {
                if (value != null) {
                  setState(() {
                    _selectedLanguage = value;
                    _updateSettings();
                  });
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
