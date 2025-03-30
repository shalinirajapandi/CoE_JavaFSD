import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; 

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: any[] = []; 
  filteredProducts: any[] = []; 
  categories: string[] = []; 
  searchTerm: string = ''; 
  selectedCategory: string = ''; 
  sortOption: string = 'nameAsc'; 
  isLoading: boolean = true; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products]; 
        this.categories = this.getUniqueCategories(data); 
        this.applyFilters(); 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
      }
    });
  }

  getUniqueCategories(products: any[]): string[] {
    const categories = new Set<string>();
    products.forEach((product) => categories.add(product.category));
    return Array.from(categories);
  }

  applyFilters(): void {
    let filtered = this.products;

    if (this.searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter((product) => product.category === this.selectedCategory);
    }

    switch (this.sortOption) {
      case 'nameAsc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    this.filteredProducts = filtered;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortOption = 'nameAsc';
    this.applyFilters();
  }
}