// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import OtherList from '@/view/book/OtherList.vue';
import BookList from '@/view/book/BookList.vue';
import TestList from '@/view/book/TestList.vue';
import BookDetail from '@/view/book/BookDetail.vue';

const routes = [
  {
    path: '/OtherList',
    name: 'OtherList',
    component: OtherList
  },
  {
    path: '/Book',
    name: 'Book',
    component: BookList,
    children: [ // 添加子路由
      {
        path: ':id', // 定义动态路由参数，用于传递书籍的ID
        name: 'BookDetail',
        component: BookDetail,
        props: true // 这允许将路由参数作为组件的属性传递给 BookDetail 组件
      }
    ]
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
