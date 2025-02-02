import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class UserManager {
    private List<User> users = new ArrayList<>();

    public void addUser(String name, String email) {
        users.add(new User(name, email));
        System.out.println("User added: " + name + " (" + email + ")");
    }

    public void saveUsersToFile(String fileName) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            for (User user : users) {
                writer.write(user.toString());
                writer.newLine();
            }
            System.out.println("Users saved to file: " + fileName);
        } catch (IOException e) {
            System.out.println("Error saving users: " + e.getMessage());
        }
    }

    public void loadUsersFromFile(String fileName) {
        users.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                User user = User.fromString(line);
                if (user != null) users.add(user);
            }
            System.out.println("Users loaded from file: " + fileName);
        } catch (IOException e) {
            System.out.println("Error loading users: " + e.getMessage());
        }
    }

    public void printUsers() {
        if (users.isEmpty()) {
            System.out.println("No users found.");
        } else {
            System.out.println("User List:");
            for (User user : users) {
                System.out.println(user.toString());
            }
        }
    }
}
