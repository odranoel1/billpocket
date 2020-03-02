import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { Product } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product;
  public carouselOptions: Array<object>;
  public error: any;
  public obs: any;

  constructor(
    public router: Router,
    carousel: NgbCarouselConfig,
    private productService: ProductService
  ) {
    carousel.interval = 0;  
    carousel.wrap = true;  
    carousel.keyboard = true;  
    carousel.pauseOnHover = false;
  }

  ngOnInit() {

    this.productService.getProducts()
      .subscribe(
        (data: any) => { this.products = data.result },
        error => this.error = console.log(error)
      );

    // this.api.getProducts().subscribe(response => {
      
    //   if (response.status === 1) {
    //     this.products = response.result as Product;
    //   }
    // });

  }

  getProductDetail(id: string) {
    this.router.navigate(['/catalog/product', id]);
  }

}
