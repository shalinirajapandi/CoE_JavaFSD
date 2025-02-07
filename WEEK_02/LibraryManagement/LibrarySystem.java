import java.util.ArrayList;
import java.util.List;

public abstract class LibrarySystem implements ILibrary {
    protected List<Book> books;
    protected List<User> users;

    public LibrarySystem() {
        this.books = new ArrayList<>();
        this.users = new ArrayList<>();
    }

    public abstract void addBook(Book book);
    public abstract void addUser (User user);

    @Override
    public Book searchBook(String title) {
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                return book;
            }
        }
        return null;
    }
}