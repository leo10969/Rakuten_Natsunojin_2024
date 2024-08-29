<template>
  <div class="form-container">
    <h1>ユーザー登録</h1>

    <!-- エラーメッセージを表示 -->
    <div v-if="errors.length" class="error-messages">
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">メールアドレス<span class="required">必須</span></label>
        <input id="email" type="email" v-model="user.email" placeholder="example@mail.com" required>
      </div>

      <div class="form-group">
        <label for="password">パスワード（※6文字以上） <span class="required">必須</span></label>
        <input id="password" type="password" v-model="user.password" placeholder="パスワード" required>
      </div>

      <div class="form-group">
        <label for="gender">性別 <span class="required">必須</span></label>
        <select id="gender" v-model="user.gender">
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div class="form-group">
        <label for="age">年齢 <span class="required">必須</span></label>
        <input id="age" type="number" v-model="user.age" placeholder="20">
      </div>

      <div class="form-group">
        <label for="prefecture">都道府県 <span class="required">必須</span></label>
        <input id="prefecture" type="text" v-model="user.prefecture" placeholder="東京都">
      </div>

      <div class="form-group">
        <label for="city">市区町村 <span class="required">必須</span></label>
        <input id="city" type="text" v-model="user.city" placeholder="新宿区">
      </div>

      <div class="form-group">
        <button type="submit" class="submit-button">登録</button>
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

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"],
input[type="number"],
input[type="text"],
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-color: #5b9bd5;
  outline: none;
}

.required {
  color: #d9534f;
  font-size: 12px;
  margin-left: 5px;
  vertical-align: middle;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #5b9bd5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #007bff;
}

.error-messages {
  color: #d9534f;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
}
</style>