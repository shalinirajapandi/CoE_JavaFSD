import java.util.List;

class Order {
private String orderID;
private List<String> productIDs;
private Priority priority;

public Order(String orderID, List<String> productIDs, Priority priority) {
    this.orderID = orderID;
    this.productIDs = productIDs;
    this.priority = priority;
}

public String getOrderID() { return orderID; }
public List<String> getProductIDs() { return productIDs; }
public Priority getPriority() { return priority; }

public enum Priority {
    STANDARD, EXPEDITED
}
}
