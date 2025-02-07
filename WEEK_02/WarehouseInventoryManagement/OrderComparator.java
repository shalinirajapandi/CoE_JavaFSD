import java.util.Comparator;

class OrderComparator implements Comparator<Order> {
    @Override
    public int compare(Order a, Order b) {
        return b.getPriority().compareTo(a.getPriority());
    }
}