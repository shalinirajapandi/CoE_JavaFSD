import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        BinaryTree binaryTree = new BinaryTree();
        Scanner scanner = new Scanner(System.in);
        Tree root = null;
        while (true) {
            System.out.println("\nChoose an option:\n1. Enter Binary Tree\n2. Serialize the Binary Tree\n3. Deserialize the Binary Tree\n4. Inorder Traversal\n5. Exit\nEnter your choice: ");
            int choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    System.out.print("Enter root node value: ");
                    int rootValue = scanner.nextInt();
                    root = new Tree(rootValue);
                    System.out.println("Enter left child of " + rootValue + ": ");
                    int leftValue = scanner.nextInt();
                    if (leftValue != -1) {
                        root.left = new Tree(leftValue);
                    }
                    System.out.println("Enter right child of " + rootValue + ": ");
                    int rightValue = scanner.nextInt();
                    if (rightValue != -1) {
                        root.right = new Tree(rightValue);
                    }
                    break;
                case 2:
                    if (root == null) {
                        System.out.println("Tree is empty. Please enter a tree first.");
                        break;
                    }
                    String serializedData = binaryTree.serialize(root);
                    System.out.println("Serialized Tree: " + serializedData);
                    break;
                case 3:
                    System.out.print("Enter serialized tree string: ");
                    scanner.nextLine();
                    String serializedInput = scanner.nextLine();
                    Tree deserializedRoot = binaryTree.deserialize(serializedInput);
                    System.out.println("Deserialized Tree's Root: " + deserializedRoot);
                    break;
                case 4:
                    if (root != null) {
                        System.out.print("Inorder Traversal: ");
                        binaryTree.inorderPrint(root);
                        System.out.println();
                    } else {
                        System.out.println("Tree is empty. Please enter a tree first.");
                    }
                    break;
                case 5:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice, please try again.");
            }
        }
    }
}
