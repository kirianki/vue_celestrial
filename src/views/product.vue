<template>
    <div class="page-product">
        <div class="column is-multiline">
            <div class="column is-9" style="float: left;">
              <figure>
                <img v-bind:src="product.get_image">
              </figure>
              <h1 class="title">{{product.name}}</h1>
              <p>{{product.description}}</p>
            </div>
            <div class="column is-3" style="float: left;">
              <h2 class="subtitle">Information</h2>
              <p><strong>Price</strong>  ksh{{product.price}}</p>
          
              <div class="field has-addons mt-6">
                <div class="control">
                  <input class="input" type="number" v-model="quantity" min="1">
                </div>
                <div class="control">
                  <a class="button is-dark" @click="addToCart">Add to cart</a>
                </div>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
    </div>

</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'


export default{
    name: 'product',
    data(){
        return{
            product: {},
            quantity: 1
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true)

            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug

            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data

                    document.title = this.product.name + ' | sammy'
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        addToCart(){
            console.log('addToCart')
            if (isNaN(this.quantity) || this.quantity < 1){
                this.quantity = 1
            }
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.dispatch('addToCart', item)

            toast({
                message: 'Product added to cart',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
        }
    }
}
</script>