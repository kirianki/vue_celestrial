import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  getters: {
    cartItems: state => state.cart.items,
    isAuthenticated: state => state.isAuthenticated,
    isLoading: state => state.isLoading,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.find(i => i.product.id === item.product.id)
      
      if (exists) {
        exists.quantity = parseInt(exists.quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setIsAuthenticated(state, status) {
      state.isAuthenticated = status
    },
    setToken(state, token) {
      state.token = token
    },
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item)
    },
    login({ commit }, loginData) {
      // Implement your login logic here, e.g., API call
      // Upon successful login, commit the mutation
      commit('setIsAuthenticated', true)
      commit('setToken', loginData.token) // Assuming loginData has 'token'
    },
    logout({ commit }) {
      // Implement your logout logic here, e.g., API call, clearing local storage
      commit('setIsAuthenticated', false)
      commit('setToken', '') // Clear the token
    },
  },
  modules: {
  }
})
