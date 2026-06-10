import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { RestaurantListingComponent } from './restaurant-listing/components/restaurant-listing.component';
import { FoodCatalogueComponent } from './food-catalogue/components/food-catalogue.component';
import { OrderSummaryComponent } from './order-summary/component/order-summary.component';

const routes: Routes = [
  { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },
  { path: 'restaurant-listing', component: RestaurantListingComponent },
  { path: 'food-catalogue/:id', component: FoodCatalogueComponent },
  { path: 'orderSummary', component: OrderSummaryComponent },
  { path: '**', redirectTo: 'restaurant-listing' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
