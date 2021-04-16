import ListRestaurant from '../view/pages/list-restaurant';
import DetailRestaurant from '../view/pages/detail-restaurant';
import Favorite from '../view/pages/favorite';

const routes = {
  '/': ListRestaurant,
  '/list': ListRestaurant,
  '/detail/:id': DetailRestaurant,
  '/favorite': Favorite,

};

export default routes;
