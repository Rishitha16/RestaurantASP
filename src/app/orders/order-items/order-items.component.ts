import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { Order } from '../../shared/order.model';
import { OrderService } from './../../shared/order.service';
import { Item } from 'src/app/shared/item.model';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  isValid:boolean = true;

  itemList:Array<Item> = [];
  orderItems: Array<OrderItem> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<OrderItemsComponent>, private itemService: ItemService, private orderService: OrderService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.OrderItemIndex == null)
      this.orderItems = [{
        OrderItemID: 0,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: "",
        Price: 0,
        Quantity: 0,
        Total: 0
      }];
    else {
      this.orderItems[0] = Object.assign({}, this.orderService.orderItems[this.data.OrderItemIndex]);
    }
  }

  updatePrice(ctrl:any){
    if(ctrl.selectedIndex==0){
      this.orderItems[0].Price = 0;
      this.orderItems[0].ItemName = '';
    }
    else{
      this.orderItems[0].Price = this.itemList[ctrl.selectedIndex-1].Price;
      this.orderItems[0].ItemName = this.itemList[ctrl.selectedIndex-1].Name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.orderItems[0].Total = parseFloat((this.orderItems[0].Quantity * this.orderItems[0].Price).toFixed(2));
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){
      if(this.data.orderItemIndex==null){
        this.orderService.orderItems.push(form.value);
      }
      else {
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      console.log(form.value);
      this.dialogRef.close();
    }
  }

  validateForm(orderItems: OrderItem){
    this.isValid = true;
    if(orderItems.ItemID==0)
      this.isValid = false;
    else if(orderItems.Quantity==0)
      this.isValid = false;
    return this.isValid;
  }
}