import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public items: any;
  public subtotal: number = 0;
  public empty: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    // Set Cart in Empty
    this.empty = true;

    // Get items in Shopping Cart (localStorage) and set empty
    if (
        localStorage.getItem('shopping_cart') !== "" &&
        localStorage.getItem('shopping_cart') !== null) {

      this.empty = false;

      this.items = JSON.parse(localStorage.getItem('shopping_cart'));

      // Get Total in ShopppingCart
      this.items.forEach(item => {
        this.subtotal = this.subtotal + item.price * item.qty;
      });
    }

  }

  getTotal() {
    return this.subtotal;
  }

  setOrder(event: Event) {
    event.preventDefault();
    
    this.router.navigate(['store/confirm']);
  }

}
