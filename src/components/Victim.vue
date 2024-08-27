<template>
    <div>
      <h1>楽天商品検索</h1>
      <input v-model="keyword" placeholder="商品を検索" />
      <button @click="searchProducts">検索</button>
      
      <div v-if="products.length > 0">
        <h2>検索結果</h2>
        <ul>
          <li v-for="product in products" :key="product.itemCode">
            <img :src="product.mediumImageUrls[0].imageUrl" alt="商品画像" />
            <p>{{ product.itemName }}</p>
            <p>価格: {{ product.itemPrice }}円</p>
            <a :href="product.itemUrl" target="_blank">商品ページへ</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const keyword = ref('');
  const products = ref([]);
  
  const searchProducts = async () => {
    const appId = '1092732167076695212';  // 楽天APIキーをここに挿入
    const apiUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706';
  
    try {
      const response = await axios.get(apiUrl, {
        params: {
          applicationId: appId,
          keyword: keyword.value,
          hits: 10,  // 検索結果の件数を指定
        }
      });
      products.value = response.data.Items.map(item => item.Item);
    } catch (error) {
      console.error('APIエラー:', error);
    }
  };
  
  </script>