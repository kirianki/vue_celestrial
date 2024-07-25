<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{categories.name}}</h2>
            </div>

            <div class="columns is-5" v-bind:key="id">
                <div class="columns is-3">
                    <productbox
                    v-for="product in categories.products"
                    :key="product.id"
                    :product="product"
                    />
                </div>
                    
            </div>

        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast';
import productbox from '@/components/productbox.vue';

export default {
    components:{
        productbox
    },
    name: 'Category',
    data() {
        return {
            categories: {
                products:[]
            }
        }
    },
    mounted() {
        this.getCategory();
    },
    watch:{
        $route(to, from) {
            if (to.name === 'Category'){
                this.getCategory();
            }
        }

    },
    methods: {
        getCategory() {
            const category_slug = this.$route.params.category_slug
            axios
            .get(`/api/v1/categories/${category_slug}/`)
            .then(response => {
                this.categories = response.data;

                //document.title = this.category.name + ' | sammy'
            })
            .catch(error => {
                console.log(error)

                toast({
                    message: 'Something went wrong. Please try again later.',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right'
                })
            })
        }
    }



}


</script>
