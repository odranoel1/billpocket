import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { Product } from 'src/app/shared/interfaces/interfaces';
import { MessagesService } from 'src/app/shared/utils/messages.service';
import { SCService } from 'src/app/shared/utils/shopping/sc.service';
import { ProductModel } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: Product[];
  public product: Product;
  public cartQty: number;
  public productModel: ProductModel = {
    id: null,
    title: null,
    description: null,
    price: null,
    img_pri: null,
    stock: null,
    qty: null
  };

  constructor(
    private api: ApiService,
    private SC: SCService,
    private activeRoute: ActivatedRoute,
    private message: MessagesService,
  ) { }

  ngOnInit() {

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
      const shoppingCart = data;
      let total = 0;
      for (let i = 0; i < shoppingCart.length; i++) {
        total += shoppingCart[i].qty;
      }
      this.cartQty = total;
    });

  }

  onAddProduct() {

    // let test = new ProductModel(
    //   '1',
    //   'producto1',
    //   'excelente',
    //   200,
    //   'asd',
    //   100,
    //   2,
    // );

    // console.log(test);

    // test.setId('2');
    // console.log(test);
    // this.productModel.setId(this.product.id);
    // console.log(addToCartForm, this.productModel);
    // this.addToCartForm.controls['product_id'].setValue(this.product.id);

    // console.log(this.addToCartForm);

    // Add product (Only 10 for client)
    const added = this.SC.addItem(
      this.product.title,
      this.product.price,
      this.product.img_pri,
      this.productModel.id,
      this.productModel.qty
    );

    if (added) {
      this.message.getAlertMsg('Producto', 'added');
    }

  }

}
