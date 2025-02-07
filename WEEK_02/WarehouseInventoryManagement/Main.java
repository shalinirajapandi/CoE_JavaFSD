import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        InventoryManager inventoryManager = new InventoryManager();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Warehouse Inventory Management System ---");
            System.out.println("1. Add Product");
            System.out.println("2. Place Order");
            System.out.println("3. Process Orders");
            System.out.println("4. View Inventory");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    addProductFromUserInput(inventoryManager, scanner);
                    break;
                case 2:
                    placeOrderFromUserInput(inventoryManager, scanner);
                    break;
                case 3:
                    inventoryManager.processOrders();
                    break;
                case 4:
                    inventoryManager.viewInventory();
                    break;
                case 5:
                    inventoryManager.saveInventoryToFile();
                    inventoryManager.saveOrdersToFile();
                    System.out.println("Exiting the system...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void addProductFromUserInput(InventoryManager inventoryManager, Scanner scanner) {
        System.out.print("Enter Product ID: ");
        String productID = scanner.nextLine();
        System.out.print("Enter Product Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Quantity: ");
        int quantity = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Enter Aisle: ");
        int aisle = scanner.nextInt();
        System.out.print("Enter Shelf: ");
        int shelf = scanner.nextInt();
        System.out.print("Enter Bin: ");
        int bin = scanner.nextInt();
        scanner.nextLine();

        Location location = new Location(aisle, shelf, bin);
        Product product = new Product(productID, name, quantity, location);
        inventoryManager.addProduct(product);
    }

    private static void placeOrderFromUserInput(InventoryManager inventoryManager, Scanner scanner) {
        System.out.print("Enter Order ID: ");
        String orderID = scanner.nextLine();
        System.out.print("Enter Product IDs (comma-separated): ");
        String productIDsInput = scanner.nextLine();
        List<String> productIDs = Arrays.asList(productIDsInput.split(","));
        System.out.print("Enter Priority (1 for STANDARD, 2 for EXPEDITED): ");
        int priorityChoice = scanner.nextInt();
        scanner.nextLine();

        Order.Priority priority = (priorityChoice == 2) ? Order.Priority.EXPEDITED : Order.Priority.STANDARD;
        Order order = new Order(orderID, productIDs, priority);
        inventoryManager.addOrder(order);
    }
}
