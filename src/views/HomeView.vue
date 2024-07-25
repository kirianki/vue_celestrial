<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
            Welcome
        </p>
        <p class="subtitle">
          celestialcrafters demo
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Items</h2>
      </div>
    </div>

    <div class="columns is-3">
    <productbox
    v-for="product in lastestProducts"
    :key="product.id"
    :product="product"
    />
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import productbox from '@/components/productbox.vue';
import Category from './category.vue';

export default {
  name: 'Home',
  data() {
    return {
      lastestProducts: []
      }
    },
  components: {
    productbox
  },
  mounted() {
    this.getLatestProducts()

     document.title = 'home' + ' | sammy'
  },
  methods: {
    getLatestProducts() {
      axios
      .get('/api/v1/latest-products/')
      .then(response => {
        this.lastestProducts = response.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>



