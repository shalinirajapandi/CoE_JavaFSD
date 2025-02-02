import java.util.LinkedList;
import java.util.Queue;

public class BinaryTree {

    public String serialize(Tree root) {
        if (root == null) {
            return "null";
        }

        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }

    private void serializeHelper(Tree node, StringBuilder sb) {
        if (node == null) {
            sb.append("null,");
            return;
        }
        sb.append(node.val).append(",");
        serializeHelper(node.left, sb);
        serializeHelper(node.right, sb);
    }

    public Tree deserialize(String data) {
        if (data.equals("null")) {
            return null;
        }
        String[] nodes = data.split(",");
        Queue<String> queue = new LinkedList<>();
        for (String node : nodes) {
            queue.offer(node);
        }
        return deserializeHelper(queue);
    }

    private Tree deserializeHelper(Queue<String> queue) {
        String value = queue.poll();

        if (value.equals("null")) {
            return null;
        }
        Tree node = new Tree(Integer.parseInt(value));
        node.left = deserializeHelper(queue);
        node.right = deserializeHelper(queue);
        return node;
    }

    public void inorderPrint(Tree root) {
        if (root != null) {
            inorderPrint(root.left);
            System.out.print(root.val + " ");
            inorderPrint(root.right);
        }
    }
}