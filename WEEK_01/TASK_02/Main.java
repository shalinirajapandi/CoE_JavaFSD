import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Account account = new Account();
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\nChoose an option: \n1. Deposit\n2. Withdraw\n3. Check Balance\n4. Exit\nEnter Choice : ");
            int choice = scanner.nextInt();
            if (choice == 4) {
                System.out.println("Exiting...");
                break;
            }
            double amount;
            if (choice != 3) {
                System.out.print("Enter amount: ");
                amount = scanner.nextDouble();
            } else {
                amount = 0;
            }
            Thread transaction = new Thread(() -> {
                switch (choice) {
                    case 1 -> account.deposit(amount);
                    case 2 -> account.withdraw(amount);
                    case 3 -> System.out.println("Current Balance: $" + account.getBalance());
                    default -> System.out.println("Invalid option.");
                }
            });
            transaction.start();
            try {
                transaction.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
