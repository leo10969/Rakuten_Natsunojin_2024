<template>
  <div>
    <h1>User Products</h1>

    <!-- フィルタリングフォーム -->
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

      <div>
        <button type="submit">フィルターを適用</button>
      </div>
    </form>

    <!-- フィルタリング結果の表示 -->
    <ul>
      <li v-for="(count, name) in filteredProductCounts" :key="name">
        {{ name }}: {{ count }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      filters: {
        gender: '',
        age: null,
        prefecture: '',
        city: ''
      }
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('/user_products')
        .then(response => {
          this.products = Array.isArray(response.data) ? response.data : response.data?.data;
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
        });
    },
    applyFilters() {
      // フィルター適用時の追加処理が必要であればここに記述
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return (!this.filters.gender || product.gender === this.filters.gender) &&
               (!this.filters.age || product.age == this.filters.age) &&
               (!this.filters.prefecture || product.prefecture.includes(this.filters.prefecture)) &&
               (!this.filters.city || product.city.includes(this.filters.city));
      });
    },
    filteredProductCounts() {
      const counts = {};
      this.filteredProducts.forEach(product => {
        const name = product.product_name;
        if (counts[name]) {
          counts[name]++;
        } else {
          counts[name] = 1;
        }
      });
      return counts;
    }
  }
};
</script>
