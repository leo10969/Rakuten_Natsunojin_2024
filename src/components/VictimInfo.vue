<template>
  <div class="user-form-container">
    <h2>User Information</h2>

    <!-- フォームで囲む -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>

      <div class="form-group">
        <label>Gender:</label>
        <button type="button" @click="openModal('gender')">Select Gender</button>
        <p v-if="gender">Selected: {{ gender }}</p>
      </div>

      <div class="form-group">
        <label>Age:</label>
        <button type="button" @click="openModal('age')">Select Age</button>
        <p v-if="age">Selected: {{ age }}</p>
      </div>

      <div class="form-group">
        <label>Region:</label>
        <button type="button" @click="openModal('region')">Select Region</button>
        <p v-if="region">Selected: {{ region }}</p>
      </div>

      <!-- Submit ボタン -->
      <button type="submit">Submit</button>
    </form>

    <!-- モーダルウィンドウ -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Select {{ modalType }}</h3>
        <div v-if="modalType === 'gender'">
          <label><input type="radio" value="Male" v-model="gender" @change="closeModal" /> Male</label>
          <label><input type="radio" value="Female" v-model="gender" @change="closeModal" /> Female</label>
          <label><input type="radio" value="Other" v-model="gender" @change="closeModal" /> Other</label>
        </div>
        <div v-if="modalType === 'age'">
          <label><input type="radio" value="20-30" v-model="age" @change="closeModal" /> 20-30</label>
          <label><input type="radio" value="30-40" v-model="age" @change="closeModal" /> 30-40</label>
          <label><input type="radio" value="40-50" v-model="age" @change="closeModal" /> 40-50</label>
          <label><input type="radio" value="50-60" v-model="age" @change="closeModal" /> 50-60</label>
          <label><input type="radio" value="60-70" v-model="age" @change="closeModal" /> 60-70</label>
          <label><input type="radio" value="70-100" v-model="age" @change="closeModal" /> 70-100</label>
        </div>
        <div v-if="modalType === 'region'">
          <label v-for="prefecture in prefectures" :key="prefecture">
            <input type="radio" :value="prefecture" v-model="region" @change="closeModal" />
            {{ prefecture }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Vue Routerをインポート

// モーダルの表示制御
const isModalOpen = ref(false);
const modalType = ref('');

// フォームのデータ
const name = ref('');
const email = ref('');
const phone = ref('');
const gender = ref('');
const age = ref('');
const region = ref('');

// 47都道府県のリスト
const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

// Vue Routerを使用
const router = useRouter();

// モーダルを開く関数
const openModal = (type) => {
  modalType.value = type;
  isModalOpen.value = true;
};

// モーダルを閉じる関数
const closeModal = () => {
  isModalOpen.value = false;
};

// フォーム送信処理
const submitForm = () => {
  // フォームデータをJSONファイルとしてダウンロード
  const formData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    gender: gender.value,
    age: age.value,
    region: region.value
  };

  const jsonContent = JSON.stringify(formData);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'userData.json';
  link.click();

  // 次のページにルーティング
  router.push('/role1-2'); // 'next-page' は実際のルートに置き換えてください
};
</script>

<style scoped>
.user-form-container {
  width: 300px;
  margin: 0 auto;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.close {
  cursor: pointer;
  float: right;
  font-size: 24px;
}
</style>
