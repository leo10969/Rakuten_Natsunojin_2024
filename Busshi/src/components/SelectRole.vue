<template>
  <div class="AppName">
      RakurtenBusshi
  </div>
  <div class="button-container">
    <button @click="navigateToRole1">{{ buttonText1 }}</button>
    <button @click="navigateToRole2">{{ buttonText2 }}</button>
    <button @click="navigateToRole3">{{ buttonText3 }}</button>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router'; // Vue Routerをインポート
const router = useRouter();
const buttonText1 = 'victim';
const buttonText2 = 'supporter';
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
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}
.button-container {
  display: flex;
  justify-content: space-around;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
