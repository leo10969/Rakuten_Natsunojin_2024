import { createRouter, createWebHistory } from 'vue-router';
import SelectRole from './components/SelectRole.vue'; // ホームページのコンポーネント
import VictimPage from './components/VictimPage.vue'; // Role 1のページ
import SupPage from './components/SupPage.vue'; // Role 2のページ
import VictimInfo from './components/VictimInfo.vue';

const routes = [
  { path: '/', component: SelectRole },
  {path: '/role1-1', component: VictimInfo},
  { path: '/role1-2', component: VictimPage },
  { path: '/role2', component: SupPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
