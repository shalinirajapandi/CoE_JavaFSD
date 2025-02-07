import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        LibraryManager libManager = new LibraryManager();
        loadLibraryData(libManager);
        Scanner scanner = new Scanner(System.in);

        while (true) {
            try {
                System.out.println("\nLibrary System Menu:");
                System.out.println("1. Add Book");
                System.out.println("2. Add User");
                System.out.println("3. Borrow Book");
                System.out.println("4. Reserve Book");
                System.out.println("5. Return Book");
                System.out.println("6. Search Book");
                System.out.println("7. Exit");
                System.out.print("Enter your choice: ");

                int choice = Integer.parseInt(scanner.nextLine().trim());

                switch (choice) {
                    case 1:
                        System.out.print("Enter ISBN of the book: ");
                        String isbn = scanner.nextLine();
                        System.out.print("Enter Author name: ");
                        String author = scanner.nextLine();
                        System.out.print("Enter book title: ");
                        String title = scanner.nextLine();
                        libManager.addBook(new Book(title, author, isbn));
                        System.out.println("\nBook added successfully: " + title);
                        break;
                    case 2:
                        System.out.print("Enter User name: ");
                        String name = scanner.nextLine();
                        System.out.print("Enter User ID: ");
                        String userId = scanner.nextLine();
                        libManager.addUser(new User(name, userId));
                        System.out.println("\nUser added successfully: " + name);
                        break;
                    case 3:
                        System.out.print("Enter ISBN of the book: ");
                        String borrowIsbn = scanner.nextLine();
                        System.out.print("Enter User ID: ");
                        String borrowUserId = scanner.nextLine();
                        libManager.borrowBook(borrowIsbn, borrowUserId);
                        break;
                    case 4:
                        System.out.print("Enter ISBN of the book: ");
                        String reserveIsbn = scanner.nextLine();
                        System.out.print("Enter User ID: ");
                        String reserveUserId = scanner.nextLine();
                        libManager.reserveBook(reserveIsbn, reserveUserId);
                        break;
                    case 5:
                        System.out.print("Enter ISBN of the book: ");
                        String returnIsbn = scanner.nextLine();
                        System.out.print("Enter User ID: ");
                        String returnUserId = scanner.nextLine();
                        libManager.returnBook(returnIsbn, returnUserId);
                        break;
                    case 6:
                        System.out.print("Enter book title: ");
                        String searchTitle = scanner.nextLine();
                        Book book = libManager.searchBook(searchTitle);
                        if (book != null) {
                            System.out.println("Book found: " + book);
                        } else {
                            System.out.println("Book not found.");
                        }
                        break;
                    case 7:
                        System.out.println("Saving data and exiting...");
                        saveLibraryData(libManager);
                        scanner.close();
                        System.exit(0);
                    default:
                        System.out.println("Invalid choice. Try again.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
            } catch (Exception e) {
                System.out.println("An error occurred: " + e.getMessage());
            }
        }
    }

    private static void loadLibraryData(LibraryManager libManager) {
        File file = new File("library_data.txt");
        if (!file.exists()) {
            System.out.println("No previous data found, starting fresh.");
            return;
        }

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            boolean readingBooks = true;

            while ((line = br.readLine()) != null) {
                if (line.equals("#USERS")) {
                    readingBooks = false;
                    continue;
                }

                String[] data = line.split(",");
                if (readingBooks) {
                    libManager.addBook(new Book(data[0], data[1], data[2]));
                } else {
                    libManager.addUser(new User(data[0], data[1]));
                }
            }

            System.out.println("Library data loaded successfully.");
        } catch (IOException e) {
            System.out.println("Error loading library data: " + e.getMessage());
        }
    }

    private static void saveLibraryData(LibraryManager libManager) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("library_data.txt"))) {
            for (Book book : libManager.books) {
                bw.write(book.getTitle() + "," + book.getAuthor() + "," + book.getISBN());
                bw.newLine();
            }

            bw.write("#USERS");
            bw.newLine();

            for (User user : libManager.users) {
                bw.write(user.getName() + "," + user.getUserID());
                bw.newLine();
            }

            System.out.println("Library data saved successfully.");
        } catch (IOException e) {
            System.out.println("Error saving library data: " + e.getMessage());
        }
    }
}
