import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {restaurantDetailContent, restaurantReviewContent}
  from './templates/restaurant-content';
import API_ENDPOINT from '../../globals/api-endpoint';
import CONFIG from '../../globals/config';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FavoriteRestaurantIdb from '../../data/favrestaurant-idb';

const DetailRestaurant = {
  async render() {
    return `
    <div class="box">
      <div class="row" id="detailRestaurant"></div>
      <div class="row" id="reviewRestaurant"></div>
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

    const reviewContainer = document.querySelector('#reviewRestaurant');
    reviewContainer.innerHTML = restaurantReviewContent(restaurant);

    FavoriteButtonPresenter.init({
      favoriteButtonContainer:
        document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
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
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date().toLocaleDateString('id-ID', options);

    btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      if (nameInput.value === '' || reviewInput.value === '') {
        // eslint-disable-next-line no-alert
        alert('Silahkan Isi Terlebih Dahulu');
        nameInput.value = '';
        reviewInput.value = '';
      } else {
        const data = {
          id: url.id,
          name: nameInput.value,
          review: reviewInput.value,
        };

        const rawResponse = await fetch(API_ENDPOINT.POST_REVIEW, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': CONFIG.KEY,
          },
          body: JSON.stringify(data),
        })

            .then((response) => response.json())
            .catch((error) => {
              alert('Gagal menambah review, koneksi terputus');
              console.log(error);
            });

        const newReview = `
            ${rawResponse.customerReviews.map((customerReviews) =>`
            <div class="column-12">  
              <div class="review">
                <p class="top-1" tabindex="0">${date}</p>
                <h4 class="no-top color-red" tabindex="0"><span 
                class="iconify color-black" 
                data-icon="ph:user-circle-fill" 
                data-inline="false" style="font-size:1.3em;"></span>
                  &nbsp;
                  ${customerReviews.name}
                </h4>
                <div class="text-review" tabindex="0">
                Review : ${customerReviews.review}
                </div>
                <div class="border-bottom"></div>
              </div>
            </div>
            `).join('')}
          `;

        reviewContainer.innerHTML = '';
        reviewContainer.innerHTML += newReview;

        nameInput.value = '';
        reviewInput.value = '';
      }
    });
  },
};

export default DetailRestaurant;
