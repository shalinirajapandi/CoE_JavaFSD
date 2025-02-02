import java.util.Scanner;

class MatrixMultiplication {
    public static int[][] multiplyMatrices(int[][] matrixA, int[][] matrixB) {
        int m = matrixA.length;
        int n = matrixA[0].length;
        int p = matrixB[0].length;
        int[][] result = new int[m][p];
        Thread[][] threads = new Thread[m][p];
        int i = 0;
        while (i < m) {
            int j = 0;
            while (j < p) {
                final int row = i;
                final int col = j;
                threads[i][j] = new Thread(() -> {
                    int k = 0;
                    while (k < matrixA[0].length) {
                        result[row][col] += matrixA[row][k] * matrixB[k][col];
                        k++;
                    }
                });
                threads[i][j].start();
                j++;
            }
            i++;
        }
        i = 0;
        while (i < m) {
            int j = 0;
            while (j < p) {
                try {
                    threads[i][j].join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                j++;
            }
            i++;
        }
        return result;
    }

    public static void printMatrix(int[][] matrix) {
        int i = 0;
        while (i < matrix.length) {
            int j = 0;
            while (j < matrix[i].length) {
                System.out.print(matrix[i][j] + " ");
                j++;
            }
            System.out.println();
            i++;
        }
    }

    public static int[][] readMatrix(Scanner scanner, String matrixName) {
        System.out.print("Enter the number of rows for " + matrixName + ": ");
        int rows = scanner.nextInt();
        System.out.print("Enter the number of columns for " + matrixName + ": ");
        int cols = scanner.nextInt();
        int[][] matrix = new int[rows][cols];
        System.out.println("Enter the elements for " + matrixName + ": ");
        int i = 0;
        while (i < rows) {
            int j = 0;
            while (j < cols) {
                System.out.print("Element at [" + i + "][" + j + "]: ");
                matrix[i][j] = scanner.nextInt();
                j++;
            }
            i++;
        }
        return matrix;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[][] matrixA = readMatrix(scanner, "Matrix A");
        int[][] matrixB = readMatrix(scanner, "Matrix B");
        int[][] result = multiplyMatrices(matrixA, matrixB);
        System.out.println("Result of matrix multiplication:");
        printMatrix(result);
    }
}
