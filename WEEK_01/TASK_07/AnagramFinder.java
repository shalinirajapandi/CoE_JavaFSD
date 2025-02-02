import java.util.List;
import java.util.Scanner;
import java.util.ArrayList;

public class AnagramFinder {

    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (s == null || p == null || s.length() < p.length()) {
            return result;
        }
        int[] pCount = new int[26];
        for (char c : p.toCharArray()) {
            pCount[c - 'a']++;
        }
        int[] windowCount = new int[26];
        for (int i = 0; i < p.length(); i++) {
            windowCount[s.charAt(i) - 'a']++;
        }
        if (isEqual(pCount, windowCount)) {
            result.add(0);
        }
        for (int i = p.length(); i < s.length(); i++) {
            windowCount[s.charAt(i) - 'a']++;
            windowCount[s.charAt(i - p.length()) - 'a']--;

            if (isEqual(pCount, windowCount)) {
                result.add(i - p.length() + 1);
            }
        }
        return result;
    }

    private static boolean isEqual(int[] pCount, int[] windowCount) {
        for (int i = 0; i < 26; i++) {
            if (pCount[i] != windowCount[i]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\nChoose an option:\n1. Find Anagrams\n2. Exit\nEnter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();
            switch (choice) {
                case 1:
                    System.out.println("Enter the string s: ");
                    String s = scanner.nextLine();
                    System.out.println("Enter the string p: ");
                    String p = scanner.nextLine();
                    List<Integer> anagramIndices = findAnagrams(s, p);
                    System.out.println("Anagram start indices: " + anagramIndices);
                    break;
                case 2:
                    System.out.println("Exiting the program.");
                    return;
                default:
                    System.out.println("Invalid choice! Please choose a valid option.");
                    break;
            }
        }
    }
}
