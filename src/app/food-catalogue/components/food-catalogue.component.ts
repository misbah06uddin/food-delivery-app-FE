import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from '../../Shared/models/FoodCataloguePage';
import { FoodItem } from '../../Shared/models/FoodItem';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-food-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent {

  restaurantId = 0;
  foodItemResponse: FoodCataloguePage | null = null;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router, private zone: NgZone, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = Number(params.get('id') ?? 0);
      this.getFoodItemsByRestaurant(this.restaurantId);
    });
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.isLoading = true;
    this.errorMessage = '';
    this.foodItemService.getFoodItemsByRestaurant(restaurant).pipe(
      finalize(() => {
        this.zone.run(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      })
    ).subscribe(
      data => {
        this.zone.run(() => {
          this.foodItemResponse = {
            ...data,
            foodItemsList: data.foodItemsList?.map((item: FoodItem) => ({
              ...item,
              quantity: item.quantity ?? 0
            })) ?? []
          };
          this.cdr.detectChanges();
        });
      },
      error => {
        console.error('FoodCatalogue: load error', error);
        this.zone.run(() => {
          this.errorMessage = 'Unable to load menu. Please refresh or try again later.';
          this.cdr.detectChanges();
        });
      }
    );
  }

  increment(food: any) {
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      // If record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If record exists, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

    }
  }

  onCheckOut() {
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurant: null
    }
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }




}
