<template>
  <div class="signin-container">
    <h1>サインイン</h1>

    <!-- エラーメッセージを表示 -->
    <div v-if="errors.length" class="error-messages">
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="signInUser" class="signin-form">
      <div class="input-group">
        <label for="email">メールアドレス:</label>
        <input id="email" type="email" v-model="email" placeholder="example@mail.com" required>
      </div>
      <div class="input-group">
        <label for="password">パスワード:</label>
        <input id="password" type="password" v-model="password" placeholder="パスワード" required>
      </div>
      <button type="submit" class="signin-button">サインイン</button>
    </form>
  </div>
</template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    setup() {
      const router = useRouter();
      const email = ref('');
      const password = ref('');
      const errors = ref([]);
  
      const signInUser = async () => {
        errors.value = [];
        try {
          const response = await axios.post('http://localhost:3000/users/sign_in', {
            user: {
              email: email.value,
              password: password.value
            }
          });
          console.log('サインイン成功:', response.data);
          router.push('/products/search'); // 商品検索ページに遷移
        } catch (error) {
          if (error.response && error.response.data.error) {
            errors.value.push(error.response.data.error);
          } else {
            console.error('サインインエラー:', error);
            errors.value.push('メールアドレスまたはパスワードが正しくありません。');
          }
        }
      };
  
      return { email, password, errors, signInUser };
    }
  };
  </script>
  

<style scoped>
.signin-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.error-messages {
  color: red;
  margin-bottom: 20px;
}

.signin-form .input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.signin-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signin-button:hover {
  background-color: #0056b3;
}
</style>