import RestaurantSource from '../../data/restaurant-source';
import {restaurantItemContent}
  from './templates/restaurant-content';

const ListRestaurant = {
  async render() {
    return `
    <div class="page-section">
      <div class="box">
        <div class="row text-center">
          <div class="column-12 bottom-2">
          <h2 class="section-heading text-capitalize text-center" tabindex="0">
            Mengapa Harus Pilih Kami
          </h2>
          </div>
        <div class="column-3 ">
          <img src="images/chef.png" alt="chef-terbaik" tabindex="0">
          <h3 class="section-subheading text-center" tabindex="0"><strong>
            Diracik oleh Chef Terbaik</strong>
          </h3>
        </div>
        <div class="column-3">
          <img src="images/delicious.png" alt="rasa-terjamin" tabindex="0">
          <h3 class="section-subheading text-center" tabindex="0"><strong>
            Rasa dan Kebersihan Terjamin</strong>
          </h3>
        </div>
        <div class="column-3">
          <img src="images/delivery.png" alt="antar-kerumah" tabindex="0">
          <h3 class="section-subheading text-center" tabindex="0"><strong>
            Siap Antar Kerumah Anda</strong>
          </h3>
        </div>
        <div class="column-3">
          <img src="images/cheap.png" alt="murah" tabindex="0">
          <h3 class="section-subheading text-center" tabindex="0"><strong>
            Harga Gabikin Bokek</strong>
          </h3>
        </div>
        </div>
      </div>
    </div>

    <div class="box">
    <div class="row">
      <div class="column-12">
        <h2 class="section-heading text-capitalize text-center" 
        tabindex="0">Gerai Kami</h2>
        <h3 class="section-subheading text-center" tabindex="0">
        WARTEG 5.0 memiliki gerai yang tersebar di beberapa titik di Indonesia.
        </h3>
      </div>
    </div>
    </div>
    <div class="box">
      <div class="row" id="listRestaurant">
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.querySelector('#listRestaurant');
    restaurants.forEach((restaurants) => {
      restaurantsContainer.innerHTML += restaurantItemContent(restaurants);
    });
  },
};

export default ListRestaurant;
