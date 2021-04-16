import FavoriteRestaurantIdb from '../../data/favrestaurant-idb';
import {restaurantItemContent} from './templates/restaurant-content';

const Favorite = {
  async render() {
    return `
    <div class="box">
    <div class="row">
      <div class="column-12">
        <h2 class="section-heading text-capitalize text-center" 
        tabindex="0">Favorit Restoran Anda</h2>
        <h3 class="section-subheading text-center" tabindex="0">
        Daftar Restoran Yang Telah Anda Jadikan Favorit
        </h3>
      </div>
    </div>
    </div>
    <div class="box">
      <div class="row" id="restaurants">

      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += restaurantItemContent(restaurant);
    });
  },
};

export default Favorite;
