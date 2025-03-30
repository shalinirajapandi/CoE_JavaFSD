import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart'; 
import 'pages/homepage.dart';
import 'firebase_options.dart';


class AppState extends ChangeNotifier {
  Locale _locale = const Locale('en');

  Locale get locale => _locale;

  AppState() {
    _loadLocale(); 
  }

  Future<void> _loadLocale() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? savedLocale = prefs.getString('languageCode');
    if (savedLocale != null) {
      _locale = Locale(savedLocale);
      notifyListeners();
    }
  }

  Future<void> setLocale(Locale locale) async {
    if (!const [Locale('en'), Locale('ta')].contains(locale)) return;
    
    _locale = locale;
    notifyListeners();
    
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('languageCode', locale.languageCode);
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<AppState>(
      create: (_) => AppState(),
      child: Consumer<AppState>(builder: (context, appState, _) {
        return MaterialApp(
          title: 'Super News',
          debugShowCheckedModeBanner: false,
          locale: appState.locale,
          localizationsDelegates: const [
            AppLocalizations.delegate, 
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: const [
            Locale('en'), 
            Locale('ta'), 
          ],
          themeMode: ThemeMode.system,
          theme: ThemeData(
            colorScheme: ColorScheme.light(
              primary: Colors.blue.shade800,
              secondary: Colors.blue.shade600,
              background: Colors.white,
            ),
            textTheme: const TextTheme(
              bodyLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
              bodyMedium: TextStyle(fontSize: 16, color: Colors.black87),
            ),
            visualDensity: VisualDensity.adaptivePlatformDensity,
          ),
          darkTheme: ThemeData(
            colorScheme: ColorScheme.dark(
              primary: Colors.blueAccent.shade700,
              secondary: Colors.blueAccent.shade400,
              background: Colors.grey.shade900,
            ),
            textTheme: const TextTheme(
              bodyLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
              bodyMedium: TextStyle(fontSize: 16, color: Colors.white70),
            ),
            visualDensity: VisualDensity.adaptivePlatformDensity,
          ),
          home: const HomePage(),
        );
      }),
    );
  }
}
