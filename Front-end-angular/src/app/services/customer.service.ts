import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private  host :string="http://localhost:8884";
  constructor(private http:HttpClient) { }

  // Récupérer les clients avec une structure correcte
  public getCustomers(): Observable<Customer[]> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.host}/customer-service/api/customers`, { observe: 'response' })
        .subscribe({
          next: (response) => {
            // Extraire les clients depuis `_embedded.customers`
            const customers = response.body?._embedded?.customers || [];
            observer.next(customers as Customer[]);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
    });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.host}/customer-service/api/customers`, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.host}/customer-service/api/customers/${customer.id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.host}/customer-service/api/customers/${id}`);
  }

}
