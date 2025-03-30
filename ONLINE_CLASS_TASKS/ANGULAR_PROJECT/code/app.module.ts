import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';  
import { HttpClientModule } from '@angular/common/http';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { ReviewComponent } from './components/review/review.component';
import { EmojiDescriptionPipe } from './emoji-description.pipe';
import { SignupComponent } from './components/signup/signup.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ProductDetailComponent,
    NavbarComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ContactusComponent,
    SigninComponent,
    ReviewComponent,
    EmojiDescriptionPipe,
    SignupComponent,
    EnquiriesComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
