import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        LogFileAnalyzer analyzer = new LogFileAnalyzer();
        while (true) {
            System.out.println("\nChoose an option:\n1. Enter Log File Details and Keywords\n2. Exit\nEnter your choice: ");
            int choice;
            try {
                choice = scanner.nextInt();
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a valid number.");
                scanner.next();
                continue;
            }
            switch (choice) {
                case 1:
                    analyzer.getInputFromUser(scanner);
                    analyzer.analyzeLogFile();
                    break;
                case 2:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice. Please select a valid option.");
            }
        }
    }
}
