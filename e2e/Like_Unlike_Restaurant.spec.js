/* eslint-disable quotes */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
const assert = require('assert');
Feature('Like and Unlike Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#restaurants');

  I.wait(5);

  I.see(`You don't have any Favorite Cafe or Restaurant`, '#restaurants');
});

Scenario('like and unlike one restaurant', async ({ I }) => {
  I.wait(5);
  I.see(`You don't have any Favorite Cafe or Restaurant`, '#restaurants');

  I.amOnPage('/');

  I.seeElement('.post-title a');

  const firstRestaurant = locate('.post-title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const likedRestaurantTitle = await I.grabTextFrom('.post-title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement(firstRestaurant);

  I.wait(5);
  I.see(`You don't have any Favorite Cafe or Restaurant`, '#restaurants');
});
