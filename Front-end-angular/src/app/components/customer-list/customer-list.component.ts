import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  pagedCustomers: Customer[] = [];
  currentPage = 0;
  itemsPerPage = 5;
  totalPages: number[] = [];
  errorMessage: string | null = null;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des clients.';
        console.error('Erreur API:', err);
        this.customers = [];
      }
    });

  }

  calculatePagination(): void {
    this.totalPages = Array.from({ length: Math.ceil(this.customers.length / this.itemsPerPage) }, (_, i) => i);
    this.updatePagedCustomers();
  }

  updatePagedCustomers(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCustomers = this.customers.slice(start, end);
  }

  changePage(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.totalPages.length) {
      this.currentPage = pageIndex;
      this.updatePagedCustomers();
    }
  }

  deleteCustomer(id: number): void {
    console.log('Suppression du client avec ID:', id);
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        console.log('Client supprimé avec succès');
        this.customers = this.customers.filter((customer) => customer.id !== id);
        this.calculatePagination();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err.errorMessage);
        this.errorMessage = 'Erreur lors de la suppression du client.';
      }
    });
  }

}
