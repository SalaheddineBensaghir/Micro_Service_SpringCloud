import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigateByUrl("/customers");
  }
  products() {

    this.router.navigateByUrl("/products");

  }

  customers(): void{
    this.router.navigateByUrl("/customers");
  }

  logout(): void {
    // Vous pouvez ajouter la logique de déconnexion ici
    console.log('Logged out');
    this.router.navigateByUrl('/login');
  }
}
