import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue')
      },
      {
        path: '/catalog',
        name: 'catalog',
        component: () => import('pages/CatalogPage.vue')
      },
      {
        path: '/catalog/:id',
        name: 'product',
        component: () => import('pages/ProductsPage.vue')
      },
      {
        path: '/team',
        name: 'team',
        component: () => import('pages/TeamPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
