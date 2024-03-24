<template>
  <a-row gutter="16">
    <a-col v-for="book in books" :key="book.bookId" :span="8">
      <a-card hoverable>
        <template #cover>
          <img :src="book.coverUrl" alt="Book Cover" />
        </template>
        <template #actions>
          <setting-outlined />
          <edit-outlined />
          <ellipsis-outlined />
        </template>
        <a-card-meta :title="book.title" :description="`作者: ${book.author}`">
        </a-card-meta>
        <a-divider></a-divider> <!-- 添加分割线 -->
        <p class="info">最后阅读日期: {{ formatDate(book.recentReadingTime) }}</p>
        <p class="info">已阅读时长: {{ formatDuration(book.totalReadingDurationMinutes) }}</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const books = ref([]);

    // 在组件挂载后发起异步请求获取数据
    onMounted(() => {
      fetchBooks();
    });

    // 从后端获取图书数据
    const fetchBooks = () => {
      fetch('http://localhost:8492/api/books') // 注意这里修改为实际的后端接口地址
        .then(response => response.json())
        .then(data => {
          // 将获取到的数据赋值给 books
          books.value = data;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    };

    // 格式化日期
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString();
    };

    // 格式化时长
    const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}.${Math.round(remainingMinutes / 60 * 10)} hours`; // 修改此处
    };

    return {
      books,
      formatDate,
      formatDuration,
    };
  },
});
</script>

<style scoped>
.info {
  font-size: 14px;
  color: #888;
}
</style>
