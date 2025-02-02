import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\nChoose an option: \n1. Calculate Reciprocal\n2. Exit");
            System.out.print("Enter your choice: ");
            try {
                int choice = scanner.nextInt();
                if (choice == 2) {
                    System.out.println("Exiting...");
                    break;
                } else if (choice == 1) {
                    System.out.print("Enter a number: ");
                    double number = scanner.nextDouble();
                    if (number == 0) {
                        throw new ArithmeticException("Division by zero is not allowed.");
                    }
                    double reciprocal = 1 / number;
                    System.out.println("Reciprocal: " + reciprocal);
                } else {
                    System.out.println("Invalid choice. Please enter 1 or 2.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Error: Invalid input. Please enter a valid number.");
                scanner.next();
            } catch (ArithmeticException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}
