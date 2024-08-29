
<template>
  <div>
    <h1>ユーザー登録</h1>

    <!-- エラーメッセージを表示 -->
    <div v-if="errors.length">
      <ul>
        <li v-for="(error, index) in errors" :key="index" style="color: red;">
          {{ error }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="registerUser">
      <div>
        <label for="email">メールアドレス:</label>
        <input id="email" type="email" v-model="user.email" required>
      </div>
      <div>
        <label for="password">パスワード:</label>
        <input id="password" type="password" v-model="user.password" required>
      </div>

      <div>
        <label for="gender">性別:</label>
        <select id="gender" v-model="user.gender">
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label for="age">年齢:</label>
        <input id="age" type="number" v-model="user.age" placeholder="20">
      </div>

      <div>
        <label for="prefecture">都道府県:</label>
        <input id="prefecture" type="text" v-model="user.prefecture" placeholder="東京都">
      </div>

      <div>
        <label for="city">市区町村:</label>
        <input id="city" type="text" v-model="user.city" placeholder="新宿区">
      </div>

      <div>
        <button type="submit">登録</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    // `user` と `errors` を `ref` で定義
    const user = ref({
      email: '',
      password: '',

      gender: '',
      age: null,
      prefecture: '',
      city: ''

    });
    const errors = ref([]);

    const registerUser = async () => {
      errors.value = []; // 以前のエラーをクリア
      console.log('送信するユーザーデータ:', user.value);
      try {
        const response = await axios.post('http://localhost:3000/users', {
          user: user.value
        });
        console.log('登録成功:', response);

        // 登録後、ユーザー情報をVuexに保存
        store.dispatch('login', response.data.user);

        // 検索ページにリダイレクト
        router.push('/register/success');
      } catch (error) {
        if (error.response && error.response.data.errors) {
          errors.value = error.response.data.errors; // エラーメッセージを格納
        } else {
          console.error('登録エラー:', error);
        }
      }
    };

    return {
      user,
      errors,
      registerUser,
    };
  }
};
</script>
