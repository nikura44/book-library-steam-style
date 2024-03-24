<template>
    <a-row gutter="16">
      <a-col v-for="card in cards" :key="card.id" :span="8">
        <a-card hoverable>
          <template #cover>
            <img :src="card.coverImageUrl" alt="example" />
          </template>
          <template #actions>
            <setting-outlined />
            <edit-outlined />
            <ellipsis-outlined />
          </template>
          <a-card-meta :title="card.title" :description="card.description">
            <template #avatar>
              <a-avatar :src="card.avatarUrl" />
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
  
  export default defineComponent({
    setup() {
      const cards = ref([]);
  
      // 在组件挂载后发起异步请求获取数据
      onMounted(() => {
        fetch('https://example.com/api/cards')
          .then(response => response.json())
          .then(data => {
            // 将获取到的数据赋值给 cards
            cards.value = data;
          })
          .catch(error => {
            console.error('Error fetching cards:', error);
          });
      });
  
      return {
        cards,
      };
    },
  });
  </script>
  