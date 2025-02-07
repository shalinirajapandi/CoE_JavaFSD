class Location {
    private int aisle;
    private int shelf;
    private int bin;

    public Location(int aisle, int shelf, int bin) {
        this.aisle = aisle;
        this.shelf = shelf;
        this.bin = bin;
    }

    public int getBin() {
        return bin;
    }

    public void setBin(int bin) {
        this.bin = bin;
    }

    public int getAisle() {
        return aisle;
    }

    public int getShelf() {
        return shelf;
    }

    public void setShelf(int shelf) {
        this.shelf = shelf;
    }

    public void setAisle(int aisle) {
        this.aisle = aisle;
    }

    @Override
    public String toString() {
        return "Aisle: " + aisle + ", Shelf: " + shelf + ", Bin: " + bin;
    }
}
