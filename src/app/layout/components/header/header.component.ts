import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SCService } from 'src/app/shared/utils/shopping/sc.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public active: boolean = false;
    public shoppingCart: any;
    public cartQty: number;

    constructor(
        public router: Router,
        public SC: SCService
    ) {}

    ngOnInit() {

        // Get shopping from shopping
        this.SC.itemsInCart.subscribe(data => {

            this.shoppingCart =  data;

            let total = 0;
            for (let i = 0; i < this.shoppingCart.length; i++) {
                total += this.shoppingCart[i].qty;
            }

            this.cartQty = total;
        });

        if (
            localStorage.getItem('shopping_cart') !== "" &&
            localStorage.getItem('shopping_cart') !== null
            ) {
            // Get shopping from storage
            this.shoppingCart = JSON.parse(localStorage.getItem('shopping_cart'));

            let total = 0;
            for (let i = 0; i < this.shoppingCart.length; i++) {
                total += this.shoppingCart[i].qty;
            }
            
            this.cartQty = total;

        }

    }
}
