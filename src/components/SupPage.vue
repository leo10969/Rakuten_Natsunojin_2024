<template>
    <div>
      <h1>Supporter Page</h1>
      <p>This is the supporter page content.</p>
    </div>
    <div class="button-container">
      <button @click="itemButtonText">{{ buttonText1 }}</button>
    </div>
  </template>
  
<script setup>
const itemButtonText = 'Item Page';
</script>
  