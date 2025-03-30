import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:provider/provider.dart';
import 'loginpage.dart';
import '../main.dart'; 
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'settings_page.dart';
import 'profilepage.dart';


class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _selectedLanguage = 'en';

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.deepPurple.shade700,
        elevation: 0,
        title: Text(
          'Daily Hunt',
          style: TextStyle(color: Colors.white),
        ),
        actions: [
  IconButton(
    icon: const Icon(Icons.person, color: Colors.white),
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ProfilePage()),
      );
    },
  ),
  IconButton(
    icon: const Icon(Icons.settings, color: Colors.white),
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => SettingsPage()),
      );
    },
  ),
],

      ),
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.deepPurple.shade800, 
              Colors.deepPurple.shade300
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Card(
                elevation: 20,
                shadowColor: Colors.deepPurple.withOpacity(0.5),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                color: Colors.white.withOpacity(0.95),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 30, 
                    vertical: 40
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Hero(
                        tag: 'app-logo',
                        child: FaIcon(
                          FontAwesomeIcons.newspaper,
                          size: 120,
                          color: Colors.deepPurple.shade700,
                        ),
                      ),
                      const SizedBox(height: 25),
                      Text(
                        l10n.welcomeTitle,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 30,
                          fontWeight: FontWeight.w800,
                          color: Colors.deepPurple.shade800,
                          letterSpacing: 1.5,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        l10n.welcomeSubtitle,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.deepPurple.shade500,
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                      const SizedBox(height: 30),
                      _buildLanguageDropdown(context, appState),
                      const SizedBox(height: 30),
                      AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(25),
                          gradient: LinearGradient(
                            colors: [
                              Colors.deepPurple.shade600, 
                              Colors.deepPurple.shade800
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.deepPurple.withOpacity(0.4),
                              blurRadius: 15,
                              offset: const Offset(0, 8),
                            )
                          ],
                        ),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.transparent,
                            shadowColor: Colors.transparent,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 50, 
                              vertical: 18
                            ),
                            textStyle: const TextStyle(
                              fontSize: 20, 
                              fontWeight: FontWeight.bold
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25)
                            ),
                          ),
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const LoginPage(),
                              ),
                            );
                          },
                          child: Text(
                            'Login',
                            style: TextStyle(
                              color: Colors.white,
                              letterSpacing: 1.2,
                              shadows: [
                                Shadow(
                                  blurRadius: 10.0,
                                  color: Colors.black.withOpacity(0.3),
                                  offset: const Offset(1.0, 1.0),
                                )
                              ]
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLanguageDropdown(BuildContext context, AppState appState) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        border: Border.all(
          color: Colors.deepPurple.shade300, 
          width: 1.5
        ),
        gradient: LinearGradient(
          colors: [
            Colors.white,
            Colors.deepPurple.shade50
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: DropdownButton<String>(
        value: _selectedLanguage,
        isExpanded: true,
        underline: const SizedBox(),
        icon: Icon(
          Icons.language, 
          color: Colors.deepPurple.shade700
        ),
        items: const [
          DropdownMenuItem(
            value: 'en',
            child: Text(
              'English', 
              style: TextStyle(fontWeight: FontWeight.w500)
            ),
          ),
          DropdownMenuItem(
            value: 'ta',
            child: Text(
              'தமிழ்', 
              style: TextStyle(fontWeight: FontWeight.w500)
            ),
          ),
        ],
        onChanged: (String? newValue) {
          setState(() {
            _selectedLanguage = newValue;
          });
          appState.setLocale(Locale(newValue!));
        },
      ),
    );
  }
}
