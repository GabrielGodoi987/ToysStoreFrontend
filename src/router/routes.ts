import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: '',
        name: 'home-page',
        component: () => import('pages/HomePage.vue'),
      },
    ],
  },
  {
    path: '/management',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'catalog',
        name: 'catalog',
        component: () => import('pages/CatalogPage.vue'),
      },
      {
        path: 'catalog/:id',
        name: 'product',
        component: () => import('pages/ProductsPage.vue'),
      },
      {
        path: 'toy/:id',
        name: 'toy',
        component: () => import('pages/ToyPage.vue'),
      },
      {
        path: 'admin/toys',
        name: 'admin-toys',
        component: () => import('pages/Cruds/ProductPage.vue'),
      },
      {
        path: 'admin/categories',
        name: 'admin-categories',
        component: () => import('pages/Cruds/CategoryPage.vue'),
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('pages/TeamPage.vue'),
      },
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
