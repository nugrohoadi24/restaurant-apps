import FavoriteRestaurantIdb from '../src/scripts/data/favrestaurant-idb';
import * as TestFactories from './helper/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
};

describe('Hapus Favorit Restoran', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({id: 1});
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('Menampilkan', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    expect(document.querySelector('[aria-label="Hapus Favorit"]'))
        .toBeTruthy();
  });

  it('Tidak menampilkan', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    expect(document.querySelector('[aria-label="Tambahkan Favorit"]'))
        .toBeFalsy();
  });

  it('Menghapus restoran dari fav', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    document.querySelector('[aria-label="Hapus Favorit"]')
        .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('Tidak membuat error jika restoran tidak di fav', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRest({id: 1});

    // hapus dulu film dari daftar film yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="Hapus Favorit"]')
        .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
