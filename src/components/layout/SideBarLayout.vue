<template>
  <div class="logo"></div>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <BookOutlined />
      <span>Book</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts" setup>
import {
  BookOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const selectedKeys = ref<string[]>(['1']);
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>