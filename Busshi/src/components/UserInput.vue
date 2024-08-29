<template>
  <div class="form-container">
    <h1>ユーザー登録</h1>

    <!-- エラーメッセージを表示 -->
    <div v-if="errors.length">
      <ul>
        <li v-for="(error, index) in errors" :key="index" class="error-message">
          {{ error }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-group">
        <label for="email">メールアドレス <span class="required">必須</span></label>
        <input id="email" type="email" v-model="user.email" placeholder="example@mail.com" required>
      </div>
      <div class="form-group">
        <label for="password">パスワード（※6文字以上） <span class="required">必須</span></label>
        <input id="password" type="password" v-model="user.password" placeholder="パスワード" required>
      </div>
      <div class="form-group">
        <button type="submit" class="submit-button">登録</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        errors: [] // ここで空の配列として初期化します
      };
    },
    methods: {
      async registerUser() {
        this.errors = []; // 以前のエラーをクリア
        console.log('送信するユーザーデータ:', this.user);
        try {
          const response = await axios.post('http://localhost:3000/users', {
            user: this.user
          });
          console.log('登録成功:', response);
          this.$router.push('/register/success'); // 登録成功時に遷移. この行を追加
        } catch (error) {
          if (error.response && error.response.data.errors) {
            this.errors = error.response.data.errors; // エラーメッセージを格納
          } else {
            console.error('登録エラー:', error);
          }
        }
      },
    }
  };
  </script>

<style scoped>
.form-container {
  max-width: 400px;
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
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="email"]:focus,
input[type="password"]:focus {
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
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color:#007bff;
}

.error-message {
  color: #d9534f;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
  
