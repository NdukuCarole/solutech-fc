import { createRouter, createWebHistory } from 'vue-router';
import AuthRoutes from '@/modules/auth/authRoutes';
import DashboardRoutes from '@/modules/dashboard/dashboardRoutes';
import graphRoutes from '@/modules/graph/graphRoutes';
import bookRoutes from '@/modules/books/bookRoutes';

const routes = [
  ...AuthRoutes,
  ...DashboardRoutes,
  ...graphRoutes,
  ...bookRoutes
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
