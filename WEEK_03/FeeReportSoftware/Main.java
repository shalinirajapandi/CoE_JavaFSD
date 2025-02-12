import java.sql.SQLException;
import java.util.InputMismatchException;
import java.util.Scanner;

import controller.AccountantController;
import controller.AdminController;

public class Main {
    public static void main(String[] args) throws SQLException,InputMismatchException{
        AdminController adminController = new AdminController();
        AccountantController accountantController = new AccountantController();
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("1. Admin Login");
            System.out.println("2. Accountant Login");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            int choice = sc.nextInt();
            sc.nextLine();
            switch (choice) {
                case 1:
                    adminController.adminLogin(sc);
                    break;
                case 2:
                    accountantController.accountantLogin(sc);
                    break;
                case 3:
                    System.out.println("Exiting...");
                    sc.close();
                    System.exit(0);
                default:
                    System.out.println("Invalid choice, Try again....");
            }
        }
    }
}
