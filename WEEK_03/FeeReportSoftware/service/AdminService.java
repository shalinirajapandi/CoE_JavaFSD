package service;

import dao.AdminDao;
import model.Accountant;

import java.util.List;

public class AdminService {
    private final AdminDao adminDao = new AdminDao();

    public void addAccountant(String name, String email, String phone, String password) {
        boolean success = adminDao.addAccountant(name, email, phone, password);
        if (success) {
            System.out.println("Accountant added successfully!!!!");
        } else {
            System.out.println("Failed to add accountant.");
        }
    }

    public void viewAccountants() {
        List<Accountant> accountants = adminDao.viewAccountants();
        if (accountants.isEmpty()) {
            System.out.println("No accountants found.");
        } else {
            for (Accountant accountant : accountants) {
                System.out.println(accountant);
            }
        }
    }

    public void editAccountant(int id, String name, String email, String phone) {
        boolean success = adminDao.editAccountant(id, name, email, phone);
        if (success) {
            System.out.println("Accountant updated successfully!!!!");
        } else {
            System.out.println("Accountant not found.");
        }
    }

    public void deleteAccountant(int id) {
        boolean success = adminDao.deleteAccountant(id);
        if (success) {
            System.out.println("Accountant deleted successfully!!!!");
        } else {
            System.out.println("Accountant not found.");
        }
    }
}
