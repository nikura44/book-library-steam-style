// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import OtherList from '@/view/book/OtherList.vue';
import BookList from '@/view/book/BookList.vue';
import TestList from '@/view/book/TestList.vue';

const routes = [
  {
    path: '/OtherList',
    name: 'OtherList',
    component: OtherList
  },
  {
    path: '/Book',
    name: 'Book',
    component: BookList
  },
  {
    path: '/',
    name: 'TestList',
    component: TestList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
