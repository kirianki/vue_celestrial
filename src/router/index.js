import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import HomeView from '../views/HomeView.vue'
import product from '../views/product.vue'
import category from '../views/category.vue'
import Category from '../views/category.vue'
import search from '../views/search.vue'
import Cart from '../views/Cart.vue'
import SighUp from '../views/SighUp.vue'
import Login from '../views/Login.vue'
import MyAccount from '../views/MyAccount.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/sigh-up',
    name: 'SighUp',
    component: SighUp
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: { requiresAuth: true } // Add meta field to require authentication
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/log-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'product',
    component: product
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: Category
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next({ name: 'Login', query: { to: to.fullPath } });
  } else {
    next();
  }
})

export default router
