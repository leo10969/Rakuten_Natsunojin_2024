import { createRouter, createWebHistory } from 'vue-router';
import SelectRole from './components/SelectRole.vue'; // ホームページのコンポーネント
import VictimPage from './components/VictimPage.vue'; // Role 1のページ
import SupPage from './components/SupPage.vue'; // Role 2のページ

const routes = [
  { path: '/', component: SelectRole },
  { path: '/role1', component: VictimPage },
  { path: '/role2', component: SupPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
