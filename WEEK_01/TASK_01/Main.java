import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        TaskManager taskManager = new TaskManager();
        while (true) {
            System.out.println("\nChoose an option: \n1. Add Task \n2. Remove Task \n3. View Highest Priority Task \n4. Print all tasks \n5. Exit");
            System.out.print("Enter choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();
            switch (choice) {
                case 1:
                    System.out.print("Enter Task ID: ");
                    String id = scanner.nextLine();
                    if (taskManager.hasUniqueKey(id)) {
                        System.out.println("\nTask with ID " + id + " already exists");
                        break;
                    }
                    System.out.print("Enter Task Description: ");
                    String description = scanner.nextLine();
                    System.out.print("Enter Task Priority (higher number = higher priority): ");
                    int priority = scanner.nextInt();
                    taskManager.addTask(id, description, priority);
                    break;
                case 2:
                    System.out.print("Enter Task ID to remove: ");
                    String removeId = scanner.nextLine();
                    taskManager.removeTask(removeId);
                    break;
                case 3:
                    Task highestTask = taskManager.getHighestPriorityTask();
                    if (highestTask != null) {
                        System.out.println("Highest Priority Task: " + highestTask);
                    } else {
                        System.out.println("No tasks available.");
                    }
                    break;
                case 4:
                    taskManager.printAllTasks();
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
