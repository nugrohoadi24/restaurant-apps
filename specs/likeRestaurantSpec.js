import FavoriteRestaurantIdb from '../src/scripts/data/favrestaurant-idb';
import * as TestFactories from './helper/testFactories';

describe('Favorit Restoran', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('Menampilkan button fav jika belum di tambahkan', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    expect(document.querySelector('[aria-label="Tambahkan Favorit"]'))
        .toBeTruthy();
  });

  it('Tidak menampilkan button fav jika sudah di tambahkan', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    expect(document.querySelector('[aria-label="Hapus Favorit"]'))
        .toBeFalsy();
  });

  it('Menambahkan favorite', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({id: 1});

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('Tidak menambahkan favorite jika sudah di tambahkan', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteRestaurantIdb.putRestaurant({id: 1});
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // tidak ada film yang ganda
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{id: 1}]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('Tidak dapat menambah film yang tidak memiliki id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
