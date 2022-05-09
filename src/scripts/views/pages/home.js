/* eslint-disable no-undef */
import RestaurantResource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/creator-template';

const Home = {
  async render() {
    return `
    <section id="hero-item">
        <div class="hero-content">
            <p class="hero-welcome">Welcome</p>
            <h1 class="hero-title">restoKU</h1>
            <p class="hero-tag">Enjoy fine dining with us</p>
        </div>
    </section>

    <div class="container">
      <h2 class="content-title">Explore Restaurant</h2>
      <div id="loading">
      
      </div>
      <section id="post-list" class="post-list">

      </section>
    </div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    loading.innerHTML = '<div class="loader"></div>';

    try {
      const restaurants = await RestaurantResource.listRestaurants();
      const restaurantsContainer = document.querySelector('#post-list');
      restaurants.forEach((Restaurant) => {
        restaurantsContainer.innerHTML
          += createRestaurantItemTemplate(Restaurant);
      });
      loading.style.display = 'none';
    } catch (err) {
      loading.style.display = 'none';
      restaurantsContainer.innerHTML = `Error: ${err}, swipe up to refresh!`;
    }
  },
};

export default Home;
