import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class TaskManager {
    private PriorityQueue<Task> taskQueue = new PriorityQueue<>(Comparator.comparingInt(Task::getPriority).reversed());
    private Map<String, Task> taskMap = new HashMap<>();

    public boolean hasUniqueKey(String id) {
        return taskMap.containsKey(id);
    }

    public void addTask(String id, String description, int priority) {
        Task task = new Task(id, description, priority);
        taskQueue.add(task);
        taskMap.put(id, task);
        System.out.println("Task added: \n" + task);
    }

    public void removeTask(String id) {
        Task task = taskMap.remove(id);
        if (task != null) {
            taskQueue.remove(task);
            System.out.println("Task removed: \n" + task);
        } else {
            System.out.println("Task with ID " + id + " not found.");
        }
    }

    public Task getHighestPriorityTask() {
        return taskQueue.peek();
    }

    public void printAllTasks() {
        System.out.println("All tasks in priority order:");
        taskQueue.stream().sorted(Comparator.comparingInt(Task::getPriority).reversed())
                .forEach(System.out::println);
    }
}
