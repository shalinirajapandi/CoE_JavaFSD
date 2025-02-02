class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String toString() {
        return name + "," + email;
    }

    public static User fromString(String line) {
        String[] parts = line.split(",");
        return (parts.length == 2) ? new User(parts[0], parts[1]) : null;
    }
}
