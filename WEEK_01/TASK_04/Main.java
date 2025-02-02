import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        UserManager userManager = new UserManager();
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\n1. Add User\n2. Save Users to File\n3. Load Users from File\n4. Display All Users\n5. Exit");
            System.out.print("Enter your choice: ");
            int choice;
            try {
                choice = scanner.nextInt();
                scanner.nextLine();
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a number.");
                scanner.next();
                continue;
            }
            switch (choice) {
                case 1:
                    System.out.print("Enter name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter email: ");
                    String email = scanner.nextLine();
                    userManager.addUser(name, email);
                    break;
                case 2:
                    System.out.print("Enter file name with .txt extension: ");
                    String saveFileName = scanner.nextLine();
                    userManager.saveUsersToFile(saveFileName);
                    break;
                case 3:
                    System.out.print("Enter file name with .txt extension: ");
                    String loadFileName = scanner.nextLine();
                    userManager.loadUsersFromFile(loadFileName);
                    break;
                case 4:
                    userManager.printUsers();
                    break;
                case 5:
                    System.out.println("Exiting User Management System...");
                    return;
                default:
                    System.out.println("Invalid choice. Please select a valid option.");
            }
        }
    }
}
