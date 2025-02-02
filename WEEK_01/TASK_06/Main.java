import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        LinkedList list = new LinkedList();
        while (true) {
            System.out.println("\n1. Add Node\n2. Create Cycle\n3. Check Cycle\n4. Print List\n5. Exit");
            System.out.print("Enter your choice: ");
            int choice;
            try {
                choice = scanner.nextInt();
            } catch (Exception e) {
                System.out.println("Invalid input. Enter a number.");
                scanner.next();
                continue;
            }
            switch (choice) {
                case 1:
                    System.out.print("Enter node value: ");
                    int value = scanner.nextInt();
                    list.addNode(value);
                    break;
                case 2:
                    System.out.print("Enter position to create cycle :");
                    int pos = scanner.nextInt();
                    list.createCycle(pos);
                    break;
                case 3:
                    System.out.println("Cycle detected: " + list.hasCycle());
                    break;
                case 4:
                    list.printList();
                    break;
                case 5:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
}
