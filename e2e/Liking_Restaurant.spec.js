/* eslint-disable new-cap */
const assert = require('assert');
Feature('Favorite Testing Restaurant');

Before((I) => {
  // Pergi ke Home
  I.amOnPage('/');
});

Scenario('Memastikan daftar favorite masih kosong', (I) => {
  I.amOnPage('/#/favorite');
  I.seeElement('.no-favorite-data');
});

Scenario('Favorit Testing', (I) => {
  // Klik resto pertama
  I.seeElement('.card a');
  I.click(locate('.card a').first());

  // Klik like
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pergi ke favorite
  I.amOnPage('/#/favorite');

  // Klik resto pertama
  I.seeElement('.card a');
  I.click(locate('.card a').first());

  // Klik batal like
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Pergi ke favorite
  I.amOnPage('/#/favorite');

  // Pastikan tidak ada resto yang disukai
  I.seeElement('.no-favorite-data');
});

Scenario('Customer review', async (I) => {
  // Klik restoran pertama
  I.seeElement('.card a');
  I.click(locate('.card a').first());

  I.seeElement('.form-review form');

  // Mengisi form review
  const textReview = 'Review E2E testing';
  I.fillField('inputName', 'Nugroho Adi Pratomo');
  I.fillField('inputReview', textReview);

  // Submit Review
  I.click('#submit-review');

  // Match Review dengan Last Review
  const lastReview = locate('.text-review').last();
  const textLastReview = await I.grabTextFrom(lastReview);

  assert.strictEqual('Review : ' + textReview, textLastReview);
});
