<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong>celestrial demo</strong></router-link>
        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMoileMenu = !showMoileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar-menu" class="navbar-menu" v-bind:class="{'is-active':showMoileMenu}">
        <div class="navbar-start">
          <div class="navbar-item">
            <form action="/search" method="get">
              <div class="field has-addons">
                <div class="control">
                  <input class="input" type="text" name="query" placeholder="Search">
                </div>
                <div class="control">
                  <button class="button is-success">
                    <span class="icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </button>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="navbar-end">
          <router-link to="/summer" class="navbar-item">Category 1</router-link>
          <router-link to="/winter" class="navbar-item">Category 2</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light">My account</router-link>
              </template>
              <template v-else>
                <router-link to="/log-in" class="button is-light">Log in</router-link>
              </template>
              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>Cart({{cartTotalLength}}) </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>



    <section class="section">
      <router-view></router-view>
    </section>
    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2024</p>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data(){
    return {
      showMoileMenu: false,
      cart: {
        items: []
      }
    }
  },
  beforeCreate(){
    this.$store.commit('initializestore')
  },
  mounted(){
    this.cart = this.$store.state.cart,
    this.isLoading = this.$store.state.Isloading
  },
  computed: {
    cartTotalLength(){
      let totalLength = 0
      for(let i = 0; i < this.cart.items.length; i++){
        totalLength += this.cart.items[i].quantity
        }
        return totalLength
      }
    },
    ...mapState({
      isAuthenticated: state => state.isAuthenticated
    })
    
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


.lds-dual-ring:after {
  content: "";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

.is-loadin-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 100%;
  }
}
</style>