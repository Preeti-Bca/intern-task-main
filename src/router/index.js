import { createRouter, createWebHistory } from 'vue-router';
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';
import DashboardEntry from '../components/DashboardEntry.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import ResetPassword from '../components/ResetPassword.vue';

const routes = [
  { path: '/signup', component: SignupForm },
  { path: '/login', component: LoginForm },
  { path: '/dashboard', component: DashboardEntry },
  { path: '/', redirect: '/signup' }, // Default route to signup
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password', component: ResetPassword, name: 'ResetPassword' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
