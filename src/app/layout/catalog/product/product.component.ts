import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/resources/api/api.service';
import { Product } from 'src/app/resources/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/resources/utils/messages.service';
import { SCService } from 'src/app/resources/utils/shopping/sc.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: Product[];
  public product: Product;
  public addToCartForm: FormGroup;
  public submitted = false;
  public cartQty: number;

  constructor(
    private api: ApiService,
    private SC: SCService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private message: MessagesService,
  ) { }

  ngOnInit() {

    // Create addToCartForm
    this.addToCartForm = this.formBuilder.group({
      qty: [ '', [
        Validators.required,
        Validators.min(1),
        Validators.pattern("^[0-9]*$")
      ]],
      product_id: ['', [
        Validators.required
      ]]
    });


    // Search product in params
    this.api.getProducts().subscribe(response => {
      
      if (response.status === 1) {
        this.products = response.result as Product[];
        
        this.activeRoute.params.subscribe(params => {

          this.products.filter(product => {

            if (product.id === params.id) {
              this.product = product;
            }
          })

        })

      }
    });

    // Get cartQty from shopping cart
    this.SC.itemsInCart.subscribe(data => {
        const shoppingCart =  data;
        let total = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            total += shoppingCart[i].qty;
        }
        this.cartQty = total;
    });

  }

  get getFields() {
    return this.addToCartForm.controls;
  }

  addProduct() {

    this.submitted = true;
    this.addToCartForm.controls['product_id'].setValue(this.product.id);

    if (!this.addToCartForm.valid) {
      this.message.getAlertMsg('Producto', 'error');
    } else {

      // Add product (Only 10 for client)
      if (this.cartQty >= 10) {
        this.message.getAlertMsg('Producto', 'max');
      } else {

        const added = this.SC.addItem(
          this.product.title,
          this.product.price,
          this.product.img_pri,
          this.addToCartForm.controls['product_id'].value,
          this.addToCartForm.controls['qty'].value
        );
  
        if (added) {
            this.message.getAlertMsg('Producto', 'added');
        }
      }

    }

  }

}
