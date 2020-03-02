import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/utils/messages.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/interfaces';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  public cardForm: FormGroup;
  public months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  public years = [
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030'
  ];
  public paymentMethod = {
    'oxxo': 1,
    'card': 2
  };
  public paymentType: number;
  public submitted = false;
  public reference = [];
  public order: any;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessagesService,
    public router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

    console.log(this.api.getOrder());

    // Create cardForm
    this.cardForm = this.formBuilder.group({
      card_name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21)
      ]],
      card: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(15),
        Validators.maxLength(21)
      ]],
      month: ['', [
        Validators.required
      ]],
      year: ['', [
        Validators.required
      ]],
      cvc: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(4)
      ]]
    })

    // Get Order (localStorage)
    if (
      localStorage.getItem('order') !== "" &&
      localStorage.getItem('order') !== null) {

      this.order = JSON.parse(localStorage.getItem('order')) as Order;
    }

  }

  get getFields() {
    return this.cardForm.controls;
  }

  sendCardForm() {

    this.submitted = true;

    if (!this.cardForm.valid) {

      this.message.getAlertMsg('Pago con tarjeta', 'error');
    } else {

      this.message.getAlertMsg('Pago con tarjeta', 'added');
      this.router.navigate(['thanks']);
    }
  }

  setPaymentMethod(event: Event, type: number) {
    event.preventDefault();
    
    // Show methods in view
    if (this.paymentMethod.oxxo == type) {
      this.paymentType = type;

      // Give reference number
      if (this.reference.length == 0) {
        for (let index = 1; index <= 10; index++) {
          this.reference.push(Math.round(Math.random()*10));
        }
      }

    } else {
      this.paymentType = type;
    }
  }

}
