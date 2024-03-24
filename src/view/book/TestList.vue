<template>
    <a-row :gutter="16"> <!-- 修改这里 -->
      <a-col v-for="card in cards" :key="card.id" :span="8">
        <a-card hoverable>
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
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        cards: [
          {
            id: 1,
            coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title: 'Card title 1',
            description: 'This is the description for card 1',
            avatarUrl: 'https://joeschmoe.io/api/v1/random',
          },
          {
            id: 2,
            coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            title: 'Card title 2',
            description: 'This is the description for card 2',
            avatarUrl: 'https://joeschmoe.io/api/v1/random',
          },
          // 添加更多的假数据
        ],
      };
    },
  });
  </script>
  