import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../Shared/models/Restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css']
})
export class RestaurantListingComponent {

  public restaurantList: Restaurant[] = [];
  public errorMessage = '';
  public isLoading = true;

  ngOnInit() {
    this.getAllRestaurants();
  }

  constructor(private router: Router, private restaurantService: RestaurantService, private zone: NgZone, private cdr: ChangeDetectorRef) { }

  getAllRestaurants() {
    console.log('RestaurantListing: getAllRestaurants start');
    this.isLoading = true;
    this.restaurantService.getAllRestaurants().pipe(
      finalize(() => {
        console.log('RestaurantListing: finalize isLoading false');
        this.zone.run(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      })
    ).subscribe({
      next: data => {
        console.log('RestaurantListing: data received', data);
        this.zone.run(() => {
          this.restaurantList = data.map((restaurant, index) => ({
            ...restaurant,
            imageUrl: `assets/restaurant-pics/${(index % 8) + 1}.jpg`
          }));
          this.cdr.detectChanges();
        });
      },
      error: error => {
        console.error('RestaurantListing: request error', error);
        this.zone.run(() => {
          this.errorMessage = 'Failed to load restaurants. Please check the backend or proxy configuration.';
          this.cdr.detectChanges();
        });
      }
    });
  }

  onButtonClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }


}
