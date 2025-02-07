public class LibraryManager extends LibrarySystem {
    private static final int MAX_BORROWED_BOOKS = 3;

    @Override
    public void addBook(Book book) {
        books.add(book);
    }

    @Override
    public void addUser (User user) {
        users.add(user);
    }

    @Override
    public synchronized void borrowBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException {
        Book book = null;
        for (Book b : books) {
            if (b.getISBN().equals(ISBN)) {
                book = b;
                break;
            }
        }
        if (book == null) {
            throw new BookNotFoundException("Book with ISBN " + ISBN + " not found.");
        }

        User user = null;
        for (User u : users) {
            if (u.getUserID().equals(userID)) {
                user = u;
                break;
            }
        }
        if (user == null) {
            throw new UserNotFoundException("User  with ID " + userID + " not found.");
        }

        if (user.getBorrowedBooks().size() >= MAX_BORROWED_BOOKS) {
            throw new MaxBooksAllowedException("User  has reached the maximum number of borrowed books.");
        }

        if (!book.isBorrowed()) {
            book.setBorrowed(true);
            user.borrowBook(book);
            System.out.println(user.getName() + " borrowed " + book.getTitle());
            return;
        }
        System.out.println("book is already borrowed.");

    }

    @Override
    public synchronized void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
        User user = null;
        for (User  u : users) {
            if (u.getUserID().equals(userID)) {
                user = u;
                break;
            }
        }
        if (user == null) {
            throw new UserNotFoundException("User  with ID " + userID + " not found.");
        }

        Book book = null;
        for (Book b : user.getBorrowedBooks()) {
            if (b.getISBN().equals(ISBN)) {
                book = b;
                break;
            }
        }
        if (book == null) {
            throw new BookNotFoundException("Book with ISBN " + ISBN + " not borrowed by user " + userID + ".");
        }

        user.returnBook(book);
        System.out.println(user.getName() + " returned " + book.getTitle());
    }

    @Override
    public synchronized void reserveBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
            for (Book book : books) {
                if (book.getISBN().equals(ISBN) && !book.isBorrowed()) {
                    for (User user : users) {
                        if (user.getUserID().equals(userID)) {
                            book.setBorrowed(true);
                            user.getBorrowedBooks().add(book);
                            System.out.println(user.getName() + " reserved " + book.getTitle());
                            return;
                        }
                    }
                }
            }
            System.out.println("Book is already reserved");
        }
    }
