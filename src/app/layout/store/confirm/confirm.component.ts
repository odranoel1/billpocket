import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/shared/utils/messages.service';
import { Router } from '@angular/router';
import { SCService } from 'src/app/shared/utils/shopping/sc.service';
import { OrderModel } from 'src/app/shared/models/order';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public items: any;
  public subtotal: number = 0;
  public orderModel: OrderModel = {
    email: null,
    name: null,
    lastname: null,
    phone: null,
    client_reference: null,
    zipcode: null,
    state: null,
    city: null,
    suburb: null,
    street: null,
    num_ext: null,
    num_int: null,
  };

  constructor(
    private message: MessagesService,
    private router: Router,
    private SC: SCService,
    private api: ApiService
  ) { }

  ngOnInit() {
    // Get items in Shopping Cart (localStorage) and get Total
    if (localStorage.getItem('shopping_cart') !== "" &&
        localStorage.getItem('shopping_cart') !== null) {

      this.items = JSON.parse(localStorage.getItem('shopping_cart'));

      this.items.forEach(item => {
        this.subtotal = this.subtotal + item.price * item.qty;
      });
    }

  }

  getTotal() {
    return this.subtotal
  }

  onSubmitOrder () {

    this.api.saveOrder(this.orderModel);
    this.message.getAlertMsg('Orden', 'create');


    // Create Order for client
    // const order = {
    //   email: this.orderForm.controls['email'].value,
    //   name: this.orderForm.controls['name'].value,
    //   lastname: this.orderForm.controls['lastname'].value,
    //   phone: this.orderForm.controls['phone'].value,
    //   shipment: {
    //     client_reference: this.orderForm.controls['client_reference'].value,
    //     zipcode: this.orderForm.controls['zipcode'].value,
    //     state: this.orderForm.controls['state'].value,
    //     city: this.orderForm.controls['city'].value,
    //     suburb: this.orderForm.controls['suburb'].value,
    //     street: this.orderForm.controls['street'].value,
    //     num_ext: this.orderForm.controls['num_ext'].value,
    //     num_int: this.orderForm.controls['num_int'].value
    //   },
    //   items: this.items,
    //   total: this.getTotal()
    // }

    //Update Order
    // localStorage.setItem('order', JSON.stringify(order));

    // Clean Shopping Cart
    localStorage.setItem('shopping_cart', '');
    this.SC.getShoppingCart('');

    // Reset form after send
    // this.orderForm.reset();

    this.router.navigate(['store/pay']);

  }

}
