import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import{ ProductDetailsComponent } from './product-details/product-details.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AboutUsComponent } from './about-us/about-us.component';
import{ ContactUsComponent } from './contact-us/contact-us.component';
import { MessagesComponent } from './admin-messages/admin-messages.component'; 

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import{ CheckoutSuccessComponent } from './checkout/checkout-success/checkout-success.component';
import{ CheckoutCancelComponent } from './checkout/checkout-cancel/checkout-cancel.component';  
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { ProfileService } from '../../core/services/profile.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';




@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    ProfileComponent,
    ProductDialogComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    MyOrdersComponent,
    CheckoutSuccessComponent,
    CheckoutCancelComponent,
    AboutUsComponent,
    ContactUsComponent,
    MessagesComponent
    
    
   
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    CurrencyPipe,
    MatRadioModule,
    MatSlideToggleModule,
    MatGridListModule

  ],
  providers: [CurrencyPipe]
})
export class DashboardModule {}
