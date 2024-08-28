<template>
  <div class="message">
      登録しました！
  </div>
  <div class="button-container">
    <button @click="navigateToRole1">{{ buttonText1 }}</button>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router'; // Vue Routerをインポート
const router = useRouter();
const buttonText1 = '商品を探す';


const navigateToRole1 = () => {
  router.push('/products/search'); // victimのページに遷移
};


</script>

<style scoped>
.message {
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
