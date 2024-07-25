import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://django-celestrial-1.onrender.com'

createApp(App).use(store).use(router, axios).mount('#app')
