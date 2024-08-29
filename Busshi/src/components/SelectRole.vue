<template>
  <div class="AppName">
    RakutenBusshi
  </div>
  <div class="button-container">
    <div @click="navigateToRole1" class="icon">
      <img src="@/assets/p1-victimbutton1.png" alt="victim" />
    </div>
    <div @click="navigateToRole2" class="icon">
      <img src="@/assets/p1-supportbutton.png" alt="supporter" />
    </div>
  </div>
  <div class="register-container">
    <button @click="navigateToRole3">{{ buttonText3 }}</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // Vue Routerをインポート
const router = useRouter();

const buttonText3 = '登録';

const navigateToRole1 = () => {
  router.push('/users/sign_in'); // victimのページに遷移
};

const navigateToRole2 = () => {
  router.push('/role2'); // supporterのページに遷移
};

const navigateToRole3 = () => {
  router.push('/register'); // 登録のページに遷移
};
</script>

<style scoped>
.AppName {
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.icon {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  cursor: pointer;
}

.register-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  font-size: 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
