import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { CartService } from '../../services/cart.service'; 

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null; 
  sizes: string[] = ['S', 'M', 'L', 'XL']; 
  colors: string[] = ['#FF0000', '#000000', '#0000FF']; 
  extraFeatures: string[] = ['Handcrafted embroidery', 'Premium fabric', 'Free alteration']; 

  selectedSize: string | null = null; 
  selectedColor: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.fetchProduct(id);
    } else {
      console.error('Invalid product ID');
    }
  }

  fetchProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error: any) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  addToCart(): void {
    if (!this.product) {
      console.error('No product selected');
      return;
    }

    if (!this.selectedSize || !this.selectedColor) {
      alert('Please select a size and color before adding to cart.');
      return;
    }

    const cartItem = {
      ...this.product,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor
    };

    this.cartService.addToCart(cartItem); 
    alert('Product added to cart!');
  }
}