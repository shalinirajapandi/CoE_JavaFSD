package service;

import dao.AccountantDao;
import dao.AdminDao;

public class AuthenticationService {

    private final AdminDao adminDao = new AdminDao();
    private final AccountantDao accountantDao = new AccountantDao();

    public boolean authenticateAdmin(String username, String password) {
        return adminDao.authenticateAdmin(username, password);
    }

    public boolean authenticateAccountant(String email, String password) {
        return accountantDao.authenticateAccountant(email, password);
    }
}
