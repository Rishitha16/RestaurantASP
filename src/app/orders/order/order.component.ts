import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from './../../shared/order.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Order } from '../../shared/order.model';
import { OrderItem } from 'src/app/shared/order-item.model';
import { Customer } from 'src/app/shared/customer.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customerList:Array<Customer> = [];
  isValid: boolean = true;

  orders: Array<Order> = [
    {
      OrderID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0,
    }
  ]

  orderItems: Array<OrderItem> = [];
 
  constructor(
  public service: OrderService, 
  private dialog: MatDialog,
  private customerService: CustomerService,
  private toastr: ToastrService,
  private router: Router,
  private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
    this.service.orders = [{
      OrderID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
    }];
  }

  resetForm(form?: any) {
    this.service.orders = [{
      OrderID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0
    }];
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex:any, OrderID:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex, OrderID};
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(OrderItemID:number, i:number){
    this.service.orderItems.splice(i,1);
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.service.orders[0].GTotal = this.service.orderItems.reduce((prev, curr)=>{
      return prev + curr.Total;
    }, 0);
    this.service.orders[0].GTotal = parseFloat((this.service.orders[0].GTotal.toFixed(2)));
  }

  validateForm(){
    this.isValid = true;
    if(this.service.orderItems.length==0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit(form:NgForm){
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
      this.resetForm();
      this.router.navigate(['/orders']);
      })
    }
  }
}