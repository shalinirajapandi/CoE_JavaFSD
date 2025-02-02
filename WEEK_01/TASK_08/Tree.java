public class Tree {
    int val;
    Tree left;
    Tree right;

    Tree(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return String.valueOf(val);
    }
}