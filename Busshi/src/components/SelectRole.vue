<template>
  <div class="AppName">
    <img src="@/assets/Weixin Image_20240829090829.png" alt="AppName" />
  </div>
  <div class="button-container">
    <div @click="navigateToRole1" class="icon victim-icon">
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Victims</span>
    </div>
    <div @click="navigateToRole2" class="icon support-icon">
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Supporters</span>
    </div>
  </div>
  <div class="register-container">
    <button @click="navigateToRole3">{{ buttonText3 }}</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const buttonText3 = '登録';

const navigateToRole1 = () => {
  router.push('/users/sign_in');
};

const navigateToRole2 = () => {
  router.push('/role2');
};

const navigateToRole3 = () => {
  router.push('/register');
};
</script>

<style scoped>
.AppName {
  display: flex;
  font-size: 2rem;
  text-align: center;
  margin-top: 0vh; /* ビューポートの高さの割合でマージンを設定 */
  font-weight: bold;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: vh; /* 上部に余白を設定 */
}

.icon {
  width: 80%; /* 幅を画面に対する割合で設定 */
  height: 20vh; /* 高さをビューポート高さの割合で設定 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #29155f;
  font-size: 2rem; /* フォントサイズを大きくして視認性を向上 */
  font-weight: bold;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 0px;
  cursor: pointer;
}

.victim-icon {
  background-image: url('@/assets/p1-victimbutton1.png');
}

.support-icon {
  background-image: url('@/assets/p1-supportbutton.png');
}

.register-container {
  display: flex;
  justify-content: center;
  margin-top: 5vh; /* 上部に余白を設定 */
}

button {
  padding: 15px 30px;
  font-size: 1.5rem; /* フォントサイズを大きくして視認性を向上 */
  background-color: #333;
  color: white;
  border: none;
  border-radius: 10px; /* 角を丸くして柔らかい印象に */
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555; /* ホバー時の背景色を変更 */
}
</style>
