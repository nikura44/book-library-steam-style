<template>
  <div>
    <div class="logo"></div>
    <a-menu v-model:selectedKeys="current" mode="inline" :items="items" theme="dark" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MenuProps } from 'ant-design-vue';

const current = ref<string[]>([]);
const router = useRouter();

const items = ref<MenuProps['items']>([
  {
    key: 'OtherList',
    label: 'OtherList',
    title: 'OtherList',
    onClick: () => {
      current.value = ['OtherList'];
      router.push('/OtherList');
    },
  },
  {
    key: 'Book',
    label: 'Book',
    title: 'Book',
    onClick: () => {
      current.value = ['Book'];
      router.push('/Book');
    },
  }
]);
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
