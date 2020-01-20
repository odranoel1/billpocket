import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SCService {

    public items = [];
    public cart: string;
    public product_id: string;
    private checkShoppingCart = new BehaviorSubject<any>([]);
    public itemsInCart = this.checkShoppingCart.asObservable();

    constructor() {}

    // Add item in Cart
    addItem(title: string, price: number, img: string, product_id: string, qty: number) {

        this.product_id = product_id;

        const item = this.items.find(item => item.product_id === product_id);

        // Validate if exists in cart
        if (item) {
            item.qty = item.qty + qty;
        } else {
            this.items.push({
                title,
                price,
                img,
                product_id, 
                qty
            });
        }

        // Saving shopping as observable
        this.getShoppingCart(this.items);

        localStorage.setItem('shopping_cart', JSON.stringify(this.items));

        return true;
    }

    public getItems() {
        return this.items;
    }

    public getShoppingCart(shopping: any) {
        this.checkShoppingCart.next(shopping);
    }

}