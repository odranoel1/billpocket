import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { ApiService } from 'src/app/resources/api/api.service';
import { Product } from 'src/app/resources/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product;
  public carouselOptions: Array<object>;

  constructor(
    private api: ApiService,
    public router: Router,
    carousel: NgbCarouselConfig
  ) {
    carousel.interval = 0;  
    carousel.wrap = true;  
    carousel.keyboard = true;  
    carousel.pauseOnHover = false;
  }

  ngOnInit() {

    this.api.getProducts().subscribe(response => {
      
      if (response.status === 1) {
        this.products = response.result as Product;
      }
    });

  }

  getProductDetail(id: string) {
    this.router.navigate(['/catalog/product', id]);
  }

}
