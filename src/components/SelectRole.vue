<template>
    <div class="button-container">
      <button @click="navigateToRole1">{{ buttonText1 }}</button>
      <button @click="navigateToRole2">{{ buttonText2 }}</button>
    </div>

  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'; // Vue Routerをインポート
  const router = useRouter();
  const buttonText1 = 'Role 1';
  const buttonText2 = 'Role 2';
  
  const navigateToRole1 = () => {
    router.push('/role1-1'); // Role 1のページに遷移
  };
  
  const navigateToRole2 = () => {
    router.push('/role2'); // Role 2のページに遷移
  };
  </script>
  
  <style scoped>
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
  