import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url: string = './assets/produscts.json';

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product>(this.url);
  }
}
