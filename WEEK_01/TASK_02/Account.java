import java.util.Scanner;

public class Account {
    private double balance;

    public Account() {
        this.balance = 0;
    }

    public synchronized void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println(Thread.currentThread().getName() + " deposited: $" + amount + " | New Balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount.");
        }
    }

    public synchronized void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println(Thread.currentThread().getName() + " withdrew: $" + amount + " | New Balance: $" + balance);
        } else {
            System.out.println("Insufficient funds or invalid amount.");
        }
    }

    public synchronized double getBalance() {
        return balance;
    }
}
