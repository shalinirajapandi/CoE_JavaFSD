import 'package:flutter/material.dart';
import 'package:flutter_contacts/flutter_contacts.dart';
import 'package:app_settings/app_settings.dart';
import 'package:url_launcher/url_launcher.dart';

class ShareContactsPage extends StatefulWidget {
  @override
  _ShareContactsPageState createState() => _ShareContactsPageState();
}

class _ShareContactsPageState extends State<ShareContactsPage> {
  List<Contact> contacts = [];

  @override
  void initState() {
    super.initState();
    _fetchContacts();
  }

  Future<void> _fetchContacts() async {
    if (!await FlutterContacts.requestPermission()) {
      print("Contacts permission denied! Open settings.");
      AppSettings.openAppSettings();
      return;
    }

    try {
      List<Contact> fetchedContacts =
          await FlutterContacts.getContacts(withProperties: true);
      print("Fetched ${fetchedContacts.length} contacts.");

      setState(() {
        contacts = fetchedContacts;
      });
    } catch (e) {
      print("Error fetching contacts: $e");
    }
  }

  Future<void> _sendSMS(String phoneNumber) async {
  String message = "Hey, check out this latest news update! 📰 https://newswebsite.com/latest";
  
  Uri smsUri = Uri.parse("smsto:$phoneNumber?body=${Uri.encodeComponent(message)}");

  try {
    bool launched = await launchUrl(smsUri, mode: LaunchMode.externalApplication);

    if (!launched) {
      throw 'Could not launch SMS app';
    }
  } catch (e) {
    print("Error launching SMS: $e");
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("No SMS app found or unable to send SMS."))
    );
  }
}
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Share with Contacts")),
      body: contacts.isEmpty
          ? const Center(child: Text("No contacts available", style: TextStyle(fontSize: 16)))
          : ListView.builder(
              itemCount: contacts.length,
              itemBuilder: (context, index) {
                String? phoneNumber = contacts[index].phones.isNotEmpty
                    ? contacts[index].phones.first.number.replaceAll(" ", "").replaceAll("-", "")
                    : null;

                return ListTile(
                  title: Text(contacts[index].displayName,
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: Text(phoneNumber ?? "No phone number"),
                  trailing: phoneNumber != null
                      ? IconButton(
                          icon: Icon(Icons.sms, color: Colors.blue),
                          onPressed: () => _sendSMS(phoneNumber),
                        )
                      : null,
                );
              },
            ),
    );
  }
}
