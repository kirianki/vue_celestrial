<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log in</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log in</button>
                        </div>
                    </div>

                    <hr>

                    Or <router-link to="/sigh-up">click here</router-link> to sign up!
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LogIn',
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },
  mounted() {
    document.title = 'Log In | Djackets';
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common['Authorization'] = ''; // Clear authorization header

      localStorage.removeItem('token'); // Remove existing token from local storage

      const formData = {
        username: this.username,
        password: this.password,
      };

      try {
        const response = await axios.post('/api/v1/token/login/', formData);
        const token = response.data.auth_token;

        // Update authentication state in Vuex store
        this.$store.commit('setIsAuthenticated', true);
        this.$store.commit('setToken', token); // Store token in Vuex

        // Set authorization header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;

        localStorage.setItem('token', token); // Store token in local storage for persistence

        const toPath = this.$route.query.to || '/cart';
        this.$router.push(toPath);
      } catch (error) {
        this.errors = []; // Clear previous errors
        if (error.response) {
          for (const property in error.response.data) {
            this.errors.push(`${property}: ${error.response.data[property]}`);
          }
        } else {
          this.errors.push('Something went wrong. Please try again.');
          console.log(JSON.stringify(error)); // Log the error for debugging
        }
      }
    },
  },
};
</script>


