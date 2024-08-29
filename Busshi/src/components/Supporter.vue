<template>
    <div>
      <h1>User Products</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.product_name }} - {{ product.price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: []
      };
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      fetchProducts() {
        axios.get('http://localhost:3000/user_products')
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the products!", error);
          });
      }
    }
  };
  </script>
  