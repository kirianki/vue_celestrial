<template>
        <div class="box" v-bind:key="id">
          <figure class="image mb-4">
            <img :src="product.get_thumbnail">
          </figure>
          <h3 class="is-size-4">{{product.name}}</h3>
          <p class="is-size-6 has-text-grey">KSH{{product.price}}</p>
          <router-link :to="{ path: product.get_absolute_url }" class="button is-dark mt-4">View Details</router-link>
        </div>  
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
    }

</script>
<style scoped>
.image{
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
/* Adjust the number of columns and spacing as needed */
.columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Adjust horizontal alignment */
  margin: -10px; /* Negate margin for seamless rendering */
  padding: 10px; /* Add spacing between columns (optional) */
}

.box {
  margin: 10px; /* Add margin for spacing between boxes */
  width: calc(30% - 20px); /* Adjust width for desired number of columns */
}

/* Optional styling for "View details" link */
span {
  color: blue; /* Change color to indicate a link */
  cursor: pointer; /* Set cursor style for hover effect */
}

</style>