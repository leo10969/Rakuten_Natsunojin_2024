<template>
  <div>
    <!-- フィルタリングフォームを画面上部に固定 -->
    <div class="filter-form">
      <form @submit.prevent="applyFilters">
        <div>
          <label for="gender">性別:</label>
          <select id="gender" v-model="filters.gender">
            <option value="">全て</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div>
          <label for="age">年齢:</label>
          <input id="age" type="number" v-model="filters.age" placeholder="20">
        </div>

        <div>
          <label for="prefecture">都道府県:</label>
          <input id="prefecture" type="text" v-model="filters.prefecture" placeholder="東京都">
        </div>

        <div>
          <label for="city">市区町村:</label>
          <input id="city" type="text" v-model="filters.city" placeholder="新宿区">
        </div>
      </form>
    </div>

    <!-- コンテナ全体を横並びにするためのラッパー -->
    <div class="content-container">
      <!-- フィルタリング結果の表示 -->
      <ul class="product-list">
        <li v-for="(item, index) in sortedProductCounts" :key="item.name" class="product-item">
          <p :style="rankStyle">{{ index + 1 }} 位</p>
          <img :src="item.image_url" alt="Product Image" class="product-image" />
          <p>{{ item.count }} 回お気に入りに入りました．</p>
          <p>{{ item.name }}</p>
          <a :href="item.item_url" target="_blank">
            <button class="product-button">商品ページを見る</button>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      filters: {
        gender: "",
        age: null,
        prefecture: "",
        city: "",
      },
      rankStyle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "red",
      },
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:3000/user_products")
        .then((response) => {
          this.products = Array.isArray(response.data)
            ? response.data
            : response.data?.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the products!", error);
        });
    },
    applyFilters() {
      // フィルター適用時の追加処理が必要であればここに記述
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          (!this.filters.gender || product.gender === this.filters.gender) &&
          (!this.filters.age || product.age == this.filters.age) &&
          (!this.filters.prefecture ||
            product.prefecture.includes(this.filters.prefecture)) &&
          (!this.filters.city || product.city.includes(this.filters.city))
        );
      });
    },
    filteredProductCounts() {
      const counts = {};
      const productDetails = {};

      this.filteredProducts.forEach((product) => {
        const name = product.product_name;
        if (counts[name]) {
          counts[name]++;
        } else {
          counts[name] = 1;
          productDetails[name] = {
            image_url: product.image_url,
            item_url: product.item_url,
            name: product.product_name,
          };
        }
      });

      return Object.keys(counts)
        .map((name) => ({
          name,
          count: counts[name],
          image_url: productDetails[name].image_url,
          item_url: productDetails[name].item_url,
        }))
        .sort((a, b) => b.count - a.count);
    },
    sortedProductCounts() {
      return this.filteredProductCounts;
    },
  },
};
</script>

<style>
/* フィルタリングフォームを上部に固定 */
.filter-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* コンテンツコンテナのスタイル */
.content-container {
  display: flex;
  justify-content: center;
  margin-top: 150px; /* フィルタリングフォームの高さを考慮して余白を設定 */
}

/* フィルタリング結果のリストのスタイル */
.product-list {
  width: 430px; /* 横幅を430pxに設定 */
  list-style-type: none;
  padding: 0;
}

.product-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa; /* 背景色を追加 */
  border-radius: 8px; /* 角を丸くして見やすくする */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 軽い影を追加して浮き上がらせる */
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
}

.product-button:hover {
  background-color: #0056b3;
}
</style>
