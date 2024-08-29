<template>
  <div>
    <div class="header">
      <div v-if="isAuthenticated">
        <p>Welcome, {{ currentUser.email }} {{ currentUser.age }} {{ currentUser.gender }}</p>
        <button @click="logout">Logout</button>
      </div>

      <div v-else>
        <button @click="$router.push('/users/sign_in')">Login</button>
      </div>

      <h2>Busshiを探す</h2>
      <input v-model="keyword" placeholder="商品を検索" />
      <button @click="searchProducts">検索</button>
    </div>

    <ul v-if="products.length > 0" class="product-list">
      <li v-for="product in products" :key="product.itemCode" class="product-item">
        <img :src="product.mediumImageUrls[0]" alt="商品画像" class="product-image" />
        <p>{{ product.itemName }}</p>
        <p>価格: {{ product.itemPrice }}円</p>
        <p>レビュー: {{ product.reviewAverage }}/5</p>
        <a :href="product.itemUrl" target="_blank">
          <button class="product-button">商品ページへ</button>
        </a>

        <div class="desire-level-buttons">
          <button @click="saveDesireLevel(product, 3)" class="desire-button">今すぐほしい！！</button>
          <button @click="saveDesireLevel(product, 2)" class="desire-button">欲しいかも</button>
          <button @click="saveDesireLevel(product, 1)" class="desire-button">あったら嬉しい</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      keyword: '',
      products: []
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  mounted() {
    console.log('現在のユーザー:', this.currentUser); // ユーザー情報が正しく表示されるはずです
    console.log('認証状態:', this.isAuthenticated); // 認証状態が正しいか確認
  },
  methods: {
    async searchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products/search', {
          params: {
            keyword: this.keyword
          }
        });
        console.log(response.data);  // レスポンスを確認
        this.products = response.data;
      } catch (error) {
        console.error('APIリクエストに失敗しました:', error);
      }
    },

    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/products/search');
    },

    async saveDesireLevel(product, level) {
      console.log('現在のユーザー:', this.currentUser); // 追加：ユーザー情報をログに表示
      console.log('保存する商品データ:', product); // 商品データをログに表示

      if (!this.currentUser) {
        console.error('ユーザーがログインしていません。');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/user_products', {
      user_product: {
        user_id: this.currentUser.id,
        product_name: product.itemName,
        item_url: product.itemUrl,
        image_url: product.mediumImageUrls[0],
        price: product.itemPrice,
        review_score: product.reviewAverage,
        desire_level: level,
        gender: this.currentUser.gender,
        age: this.currentUser.age,
        prefecture: this.currentUser.prefecture,
        city: this.currentUser.city
      }
});

    console.log('欲しいBusshiが保存されました:', response.data);
    alert('欲しいBusshiが保存されました');
  } catch (error) {
    console.error('Error saving desire level:', error.response ? error.response.data : error.message);
    alert('データ保存に失敗しました');
  }
}
  }
};
</script>

<style scoped>
/* ヘッダー部分を画面上部に固定し、コンテンツ部分の余白を調整 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 430px;
}

ul.product-list {
  list-style-type: none;
  padding: 0;
  padding-top: 120px; /* ヘッダーの高さ分だけ余白を取る */
  margin:0 auto;
}

li.product-item {
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  margin-bottom: 10px;
}

.product-button {
  padding: 6px 15px;
  font-size: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 3px;
}

.product-button:hover {
  background-color: #0056b3;
}

.desire-button {
  padding: 6px 15px;
  font-size: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

.desire-button:hover {
  background-color: #218838;
}

.rank-style {
  font-size: 24px;
  font-weight: bold;
  color: red;
}
</style>