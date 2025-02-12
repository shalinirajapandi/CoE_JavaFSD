package service;

import dao.AccountantDao;
import model.Student;

import java.util.List;

public class AccountantService {
    private final AccountantDao accountantDao = new AccountantDao();

    public void addStudent(String name, String email, String course, double fee, double paid, double due, String address, String phone) {
        boolean success = accountantDao.addStudent(name, email, course, fee, paid, due, address, phone);
        if (success) {
            System.out.println("Student added successfully!!!!");
        } else {
            System.out.println("Failed to add student.");
        }
    }

    public void viewStudents() {
        List<Student> students = accountantDao.viewStudents();
        if (students.isEmpty()) {
            System.out.println("No students found.");
        } else {
            for (Student student : students) {
                System.out.println(student);
            }
        }
    }

    public void editStudent(int id, String name, String email) {
        boolean success = accountantDao.editStudent(id, name, email);
        if (success) {
            System.out.println("Student updated successfully!!!!");
        } else {
            System.out.println("Student not found.");
        }
    }

    public void deleteStudent(int id) {
        boolean success = accountantDao.deleteStudent(id);
        if (success) {
            System.out.println("Student deleted successfully!!!!");
        } else {
            System.out.println("Student not found.");
        }
    }
}
