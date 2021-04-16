import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {restaurantDetailContent}
  from './templates/restaurant-content';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import postReview from '../../utils/review-customer';

const DetailRestaurant = {
  async render() {
    return `
    <div class="box">
      <div class="row" id="detailRestaurant"></div>
      <div class="form-review">
        <form class="form-red">
          <div class="bottom-1">
            <label for="inputName" class="form-label">Nama</label>
            <input name="inputName" type="text" 
              class="form-control" id="inputName">
          </div>
          <div class="bottom-1">
            <label for="inputReview" class="form-label">Review</label>
            <input name="inputReview" type="text" 
              class="form-control" id="inputReview">
          </div>
          <button id="submit-review" type="submit" class="btn-submit">
            Tambah Review
          </button>
        </form>
      </div>
      <div id="favoriteButtonContainer"></div>
    </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurats(url.id);
    const restaurantContainer = document.querySelector('#detailRestaurant');
    restaurantContainer.innerHTML = restaurantDetailContent(restaurant);

    FavoriteButtonInitiator.init({
      favoriteButtonContainer:
        document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        pictureId: restaurant.restaurant.pictureId,
        name: restaurant.restaurant.name,
        rating: restaurant.restaurant.rating,
        city: restaurant.restaurant.city,
        address: restaurant.restaurant.address,
        description: restaurant.restaurant.description,
      },
    });

    const btnSubmit = document.querySelector('#submit-review');
    const nameInput = document.querySelector('#inputName');
    const reviewInput = document.querySelector('#inputReview');

    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (nameInput.value === '' || reviewInput.value === '') {
        // eslint-disable-next-line no-alert
        alert('Silahkan Isi Terlebih Dahulu');
        nameInput.value = '';
        reviewInput.value = '';
      } else {
        postReview(url, nameInput.value, reviewInput.value);
        nameInput.value = '';
        reviewInput.value = '';
        if (alert('Review Berhasil Ditambahkan')) {

        } else {
          window.location.reload();
        }
      }
    });
  },
};

export default DetailRestaurant;
