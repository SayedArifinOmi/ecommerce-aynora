import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from 'src/app/core/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckoutSuccessComponent } from './checkout/checkout-success/checkout-success.component';
import { CheckoutCancelComponent } from './checkout/checkout-cancel/checkout-cancel.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessagesComponent } from './admin-messages/admin-messages.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'product-details', component: ProductDetailsComponent},
      //{path: 'product-details/:id', component: ProductDetailsComponent},
     {path: 'product-details/:id', component: ProductDetailsComponent, canActivate: [AuthGuard]}, //for dynamic routes
     { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
     { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
     {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
     {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
     {path: 'my-orders/:id', component: MyOrdersComponent, canActivate: [AuthGuard]},
     {path: 'checkout-success', component: CheckoutSuccessComponent, canActivate: [AuthGuard]},
     {path: 'checkout-cancel', component: CheckoutCancelComponent, canActivate: [AuthGuard]},
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact-us', component: ContactUsComponent },
    {path: 'admin-messages', component: MessagesComponent, canActivate: [AuthGuard]},

    
     
     
     

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
