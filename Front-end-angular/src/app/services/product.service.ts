import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private  host :string="http://localhost:8884";
  constructor(private http:HttpClient) { }

  // Récupérer les clients avec une structure correcte
  public getProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.host}/inventory-service/api/products`, { observe: 'response' })
        .subscribe({
          next: (response) => {
            // Extraire les clients depuis `_embedded.customers`
            const products = response.body?._embedded?.products || [];
            observer.next(products as Product[]);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
    });
  }

  addCustomer(customer: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/inventory-service/api/products`, customer);
  }

  updateCustomer(customer: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/inventory-service/api/products/${customer.id}`, customer);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${this.host}/inventory-service/api/products/${id}`);
  }

}
