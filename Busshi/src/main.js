import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  // Vuex ストアのインポート

const app = createApp(App);  // アプリケーションインスタンスを作成
app.use(store);              // Vuex ストアをアプリケーションに登録
app.use(router);             // Vue Router をアプリケーションに登録
app.mount('#app');           // アプリケーションをマウント
