import { Injectable } from '@angular/core';
import { OrderModel } from '../models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = './assets/products.json';
  private OrderModel: OrderModel[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getConfig() {
    this.http.get(this.url);
  }

  saveOrder(order: OrderModel): void {
    this.OrderModel.push(order);
  }

  getOrder(): OrderModel[] {
    return this.OrderModel;
  }
}
