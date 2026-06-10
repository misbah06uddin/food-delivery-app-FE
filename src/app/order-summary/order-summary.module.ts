import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSummaryRoutingModule } from './order-summary-routing.module';
import { OrderSummaryComponent } from './component/order-summary.component';

@NgModule({
  imports: [
    CommonModule,
    OrderSummaryRoutingModule,
    OrderSummaryComponent
  ]
})
export class OrderSummaryModule { }
