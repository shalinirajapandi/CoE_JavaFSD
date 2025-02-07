import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.PriorityBlockingQueue;

class InventoryManager {
    private ConcurrentHashMap<String, Product> products;
    private PriorityBlockingQueue<Order> orderQueue;
    private static final String INVENTORY_FILE = "inventory.txt";
    private static final String ORDERS_FILE = "orders.txt";

    public InventoryManager() {
        products = new ConcurrentHashMap<>();
        orderQueue = new PriorityBlockingQueue<>(10, new OrderComparator());
        loadInventoryFromFile();
        loadOrdersFromFile();
    }

    public synchronized void addProduct(Product product) {
        products.put(product.getProductID(), product);
        System.out.println("Product added: " + product.getName());
    }

    public synchronized void updateStock(String productID, int quantity) throws OutOfStockException, InvalidLocationException {
        Product product = products.get(productID);
        if (product == null) {
            throw new InvalidLocationException("Product not found: " + productID);
        }
        if (product.getQuantity() + quantity < 0) {
            throw new OutOfStockException("Insufficient stock for product: " + productID);
        }
        product.setQuantity(product.getQuantity() + quantity);
        //System.out.println("Stock updated for product: " + productID + ", New quantity: " + product.getQuantity());
    }

    public void addOrder(Order order) {
        orderQueue.add(order);
        System.out.println("Order added: " + order.getOrderID());
    }

    public void processOrders() {
        while (!orderQueue.isEmpty()) {
            Order order = orderQueue.poll();
            new Thread(() -> fulfillOrder(order)).start();
        }
    }

    private void fulfillOrder(Order order) {
        try {
            for (String productID : order.getProductIDs()) {
                updateStock(productID, -1);
            }
            System.out.println("Order fulfilled: " + order.getOrderID());
        } catch (OutOfStockException | InvalidLocationException e) {
            System.err.println("Error processing order " + order.getOrderID() + ": " + e.getMessage());
        }
    }

    public void viewInventory() {
        System.out.println("\n--- Current Inventory ---");
        for (Product product : products.values()) {
            System.out.println("Product ID: " + product.getProductID() +
                    ", Name: " + product.getName() +
                    ", Quantity: " + product.getQuantity() +
                    ", Location: " + product.getLocation());
        }
    }

    private void loadInventoryFromFile() {
        File file = new File(INVENTORY_FILE);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 6) {
                    String productID = parts[0].trim();
                    String name = parts[1].trim();
                    int quantity = Integer.parseInt(parts[2].trim());
                    int aisle = Integer.parseInt(parts[3].trim());
                    int shelf = Integer.parseInt(parts[4].trim());
                    int bin = Integer.parseInt(parts[5].trim());

                    Location location = new Location(aisle, shelf, bin);
                    Product product = new Product(productID, name, quantity, location);
                    products.put(productID, product);
                }
            }
            System.out.println("Inventory loaded from file.");
        } catch (IOException e) {
            System.err.println("Error loading inventory: " + e.getMessage());
        }
    }

    private void loadOrdersFromFile() {
        File file = new File(ORDERS_FILE);
        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    String orderID = parts[0].trim();
                    List<String> productIDs = Arrays.asList(parts[1].trim().split(";"));
                    Order.Priority priority = Order.Priority.valueOf(parts[2].trim());

                    Order order = new Order(orderID, productIDs, priority);
                    orderQueue.add(order);
                }
            }
            System.out.println("Orders loaded from file.");
        } catch (IOException e) {
            System.err.println("Error loading orders: " + e.getMessage());
        }
    }

    public void saveInventoryToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(INVENTORY_FILE))) {
            for (Product product : products.values()) {
                writer.write(product.getProductID() + "," +
                        product.getName() + "," +
                        product.getQuantity() + "," +
                        product.getLocation().getAisle() + "," +
                        product.getLocation().getShelf() + "," +
                        product.getLocation().getBin());
                writer.newLine();
            }
            System.out.println("Inventory saved to file.");
        } catch (IOException e) {
            System.err.println("Error saving inventory: " + e.getMessage());
        }
    }

    public void saveOrdersToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(ORDERS_FILE))) {
            for (Order order : orderQueue) {
                writer.write(order.getOrderID() + "," +
                        String.join(";", order.getProductIDs()) + "," +
                        order.getPriority().toString());
                writer.newLine();
            }
            System.out.println("Orders saved to file.");
        } catch (IOException e) {
            System.err.println("Error saving orders: " + e.getMessage());
        }
    }
}
