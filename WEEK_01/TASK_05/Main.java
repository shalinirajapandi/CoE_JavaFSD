import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        StringProcessor processor = new StringProcessor();
        String userInput = "";
        while (true) {
            System.out.println("\nChoose an option:\n1. Reverse a string\n2. Count occurrences of a substring\n3. Split and capitalize words in a string\n4. Exit\nEnter your choice: ");
            int choice;
            try {
                choice = scanner.nextInt();
                scanner.nextLine();
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a valid choice.");
                scanner.next();
                continue;
            }
            switch (choice) {
                case 1:
                    System.out.print("Enter the string to reverse: ");
                    userInput = scanner.nextLine();
                    System.out.println("Reversed String: " + processor.reverseString(userInput));
                    break;
                case 2:
                    System.out.print("Enter the text: ");
                    String text = scanner.next();
                    System.out.print("Enter the substring to count: ");
                    String sub = scanner.next();
                    int occurrences = processor.countOccurrences(text, sub);
                    System.out.println("Occurrences of '" + sub + "': " + occurrences);
                    break;
                case 3:
                    System.out.print("Enter the string to split and capitalize: ");
                    userInput = scanner.nextLine();
                    System.out.println("Capitalized String: " + processor.splitAndCapitalize(userInput));
                    break;
                case 4:
                    System.out.println("Exiting the program.");
                    return;
                default:
                    System.out.println("Invalid choice. Please select a valid option.");
            }
        }
    }
}
