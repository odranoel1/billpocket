import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/resources/utils/messages.service';
import { Router } from '@angular/router';
import { SCService } from 'src/app/resources/utils/shopping/sc.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public orderForm: FormGroup;
  public submitted = false;
  public items: any;
  public subtotal: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessagesService,
    private router: Router,
    private SC: SCService,
  ) { }

  ngOnInit() {
    // Create orderForm
    this.orderForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastname: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ]],
      client_reference: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      zipcode: ['', [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern("^[0-9]*$"),
      ]],
      state: ['', [
        Validators.required,
        Validators.maxLength(32)
      ]],
      city: ['', [
        Validators.required,
        Validators.maxLength(64)
      ]],
      suburb: ['', [
        Validators.required,
        Validators.maxLength(64)
      ]],
      street: ['', [
        Validators.required,
        Validators.maxLength(32)
      ]],
      num_ext: ['', [
        Validators.required
      ]],
      num_int: ['', [
        Validators.required
      ]]
    });

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

  get getFields() {
    return this.orderForm.controls;
  }

  sendOrderForm () {

    this.submitted = true;

    if (!this.orderForm.valid) {
      this.message.getAlertMsg('Orden', 'error');
    } else {

      this.message.getAlertMsg('Orden', 'create');

      // Create Order for client
      const order = {
        email: this.orderForm.controls['email'].value,
        name: this.orderForm.controls['name'].value,
        lastname: this.orderForm.controls['lastname'].value,
        phone: this.orderForm.controls['phone'].value,
        shipment: {
          client_reference: this.orderForm.controls['client_reference'].value,
          zipcode: this.orderForm.controls['zipcode'].value,
          state: this.orderForm.controls['state'].value,
          city: this.orderForm.controls['city'].value,
          suburb: this.orderForm.controls['suburb'].value,
          street: this.orderForm.controls['street'].value,
          num_ext: this.orderForm.controls['num_ext'].value,
          num_int: this.orderForm.controls['num_int'].value
        },
        items: this.items,
        total: this.getTotal()
      }

      //Update Order
      localStorage.setItem('order', JSON.stringify(order));

      // Clean Shopping Cart
      localStorage.setItem('shopping_cart', '');
      this.SC.getShoppingCart('');

      // Reset form after send
      this.orderForm.reset();

      this.router.navigate(['store/pay']);
    }
  }

}
