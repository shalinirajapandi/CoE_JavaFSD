package controller;

import java.util.Scanner;

import service.AccountantService;
import service.AuthenticationService;

public class AccountantController {
    private final AuthenticationService authenticationService = new AuthenticationService();
    private final AccountantService accountantService = new AccountantService();

    public void accountantLogin(Scanner scanner) {
        System.out.print("Enter Email: ");
        String email = scanner.nextLine();
        System.out.print("Enter Password: ");
        String password = scanner.nextLine();
        if (authenticationService.authenticateAccountant(email, password)) {
            System.out.println("Accountant login successful!!!!");
            manageStudents(scanner);
        } else {
            System.out.println("Invalid credentials.");
        }
    }

    public void manageStudents(Scanner sc) {
        while (true) {
            System.out.println("1. Add Student");
            System.out.println("2. View Students");
            System.out.println("3. Edit Student");
            System.out.println("4. Delete Student");
            System.out.println("5. Logout");
            System.out.print("Enter choice: ");
            int choice = sc.nextInt();
            sc.nextLine();
            switch (choice) {
                case 1: {
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Email: ");
                    String email = sc.nextLine();
                    System.out.print("Enter Course: ");
                    String course = sc.nextLine();
                    System.out.print("Enter Fee: ");
                    double fee = sc.nextDouble();
                    System.out.print("Enter Paid: ");
                    double paid = sc.nextDouble();
                    double due = fee - paid;
                    sc.nextLine();
                    System.out.print("Enter Address: ");
                    String address = sc.nextLine();
                    System.out.print("Enter Phone: ");
                    String phone = sc.nextLine();
                    accountantService.addStudent(name, email, course, fee, paid, due, address, phone);
                } break;
                case 2: {
                    accountantService.viewStudents();
                } break;
                case 3: {
                    System.out.print("Enter Student ID to edit: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter New Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter New Email: ");
                    String email = sc.nextLine();
                    accountantService.editStudent(id, name, email);
                } break;
                case 4: {
                    System.out.print("Enter Student ID to delete: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    accountantService.deleteStudent(id);
                } break;
                case 5:
                    return;
                default:
                    System.out.println("Invalid choice, Try again...");
            }
        }
    }
}