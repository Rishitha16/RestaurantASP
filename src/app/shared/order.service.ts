import { Injectable } from '@angular/core';
import { Order } from './order.model';
import {OrderItem } from './order-item.model'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders:Array<Order> = [];
  orderItems:Array<OrderItem> = [];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder(){
    var body = {
      ...this.orders[0],
      OrderItems: this.orderItems
    }
    console.log(body)
    return this.http.post(environment.apiURL + '/Order', body);
  }

  getOrderList(){
    return this.http.get(environment.apiURL + '/Order').toPromise();
  }
 
}