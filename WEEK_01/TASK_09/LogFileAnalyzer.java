import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class LogFileAnalyzer {
    private List<String> keywords;
    private String inputFile;
    private String outputFile;

    public LogFileAnalyzer() {
        this.keywords = new ArrayList<>();
    }

    public void analyzeLogFile() {
        Map<String, Integer> keywordCounts = new HashMap<>();
        for (String keyword : keywords) {
            keywordCounts.put(keyword, 0);
        }
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                for (String keyword : keywords) {
                    if (line.contains(keyword)) {
                        keywordCounts.put(keyword, keywordCounts.get(keyword) + 1);
                    }
                }
            }
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {
                writer.write("Log File Analysis Results:\n\n");
                for (Map.Entry<String, Integer> entry : keywordCounts.entrySet()) {
                    writer.write("Keyword \"" + entry.getKey() + "\" appeared " + entry.getValue() + " times.\n");
                }
            }
            System.out.println("Results written to: " + outputFile);
        } catch (IOException e) {
            System.out.println("Error reading or writing files: " + e.getMessage());
        }
    }

    public void getInputFromUser(Scanner scanner) {
        scanner.nextLine();
        System.out.print("Enter the path of the input log file: ");
        inputFile = scanner.nextLine();
        System.out.print("Enter the path of the output file to save analysis: ");
        outputFile = scanner.nextLine();
        System.out.println("Enter the keywords to search for in comma-separated format");
        String keywordInput = scanner.nextLine();
        keywords = Arrays.asList(keywordInput.split(","));
    }
}
