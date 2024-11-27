import { Component } from '@angular/core';


import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  products: Product[] = [];

  pagedProducts: Product[] = [];
  currentPage = 0;
  itemsPerPage = 5;
  totalPages: number[] = [];
  errorMessage: string | null = null;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération des clients.';
        console.error('Erreur API:', err);
        this.products = [];
      }
    });

  }

  calculatePagination(): void {
    this.totalPages = Array.from({ length: Math.ceil(this.products.length / this.itemsPerPage) }, (_, i) => i);
    this.updatePagedCustomers();
  }

  updatePagedCustomers(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedProducts = this.products.slice(start, end);
  }

  changePage(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.totalPages.length) {
      this.currentPage = pageIndex;
      this.updatePagedCustomers();
    }
  }

  deleteCustomer(id: string): void {
    console.log('Suppression du client avec ID:', id); // Vérifiez l'ID
    this.productService.deleteCustomer(id).subscribe({
      next: () => {
        console.log('Client supprimé avec succès');
        this.products = this.products.filter((customer) => customer.id !== id);
        this.calculatePagination();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        this.errorMessage = 'Erreur lors de la suppression du client.';
      }
    });
  }

  protected readonly Product = Product;
}
