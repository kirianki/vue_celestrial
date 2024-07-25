<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">
                </h1>
                <h2 class="is-size-5 has-text-grey">Search term:"{{query}}"</h2>
            </div>

        
                <productbox
                v-for="product in products"
                :key="product.id"
                :product="product"
                />
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import productbox from '@/components/productbox.vue';


export default {
    name: 'search',
    components: {
        productbox
        },
    data() {
        return {
            products: [],
            query:''
        }
        },
    mounted() {
        document.title = 'seach | sammy'

        let url = window.location.search.substring(1)
        let params = new URLSearchParams(url)
        if (params.get('query')){
            this.query = params.get('query')
            this.performSearch()
        }
        
    },
    methods:{
        performSearch() {
            axios
            .post('api/v1/products/search/',{'query':this.query})
            .then(response => {
                this.products = response.data
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

}
</script>