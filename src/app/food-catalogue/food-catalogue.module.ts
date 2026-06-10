import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCatalogueRoutingModule } from './food-catalogue-routing.module';
import { FoodCatalogueComponent } from './components/food-catalogue.component';

@NgModule({
  imports: [
    CommonModule,
    FoodCatalogueRoutingModule,
    FoodCatalogueComponent
  ]
})
export class FoodCatalogueModule { }
