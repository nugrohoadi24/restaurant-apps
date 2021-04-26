import FavoriteRestaurantIdb from '../../src/scripts/data/favrestaurant-idb';
import FavoriteButtonPresenter
  from '../../src/scripts/utils/favorite-button-presenter';

const createFavoriteButtonPresenterWithRest = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};

export {
  createFavoriteButtonPresenterWithRest,
};

