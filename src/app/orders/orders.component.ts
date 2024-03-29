import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: any;

  constructor(private service: OrderService) { }

  ngOnInit(): void {
    this.service.getOrderList().then(res => this.orderList = res);
  }

}