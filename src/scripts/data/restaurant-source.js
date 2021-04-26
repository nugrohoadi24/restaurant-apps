/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurats(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default RestaurantSource;
