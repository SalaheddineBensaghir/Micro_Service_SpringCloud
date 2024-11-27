import { NgModule } from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { AppComponent } from './app.component';
import {CustomerListComponent} from './components/customer-list/customer-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {RouterOutlet} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { BillsListComponent } from './components/bills-list/bills-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavbarComponent,
    ProductsListComponent,
    BillsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
