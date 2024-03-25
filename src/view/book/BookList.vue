<template>
  <div>
    <router-view></router-view>
    <a-row gutter="16">
      <a-col v-for="book in books" :key="book.bookId" :span="8" class="book-col">
        <router-link :to="{ name: 'BookDetail', params: { id: book.bookId } }" class="book-link">
          <a-card hoverable class="book-card">
            <template #cover>
              <div class="cover-container">
                <img :src="book.coverUrl" alt="Book Cover" class="book-cover" />
              </div>
            </template>
            <a-card-meta :title="book.title" :description="`作者: ${book.author}`">
            </a-card-meta>
            <a-divider></a-divider> <!-- 添加分割线 -->
            <p class="info">最后阅读日期: {{ formatDate(book.recentReadingTime) }}</p>
            <p class="info">已阅读时长: {{ formatDuration(book.totalReadingDurationMinutes) }}</p>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default ({
  setup() {
    const router = useRouter();
    const books = ref([]);

    // 在组件挂载后发起异步请求获取数据
    onMounted(() => {
      fetchBooks();
    });

    // 从后端获取图书数据
    const fetchBooks = () => {
      fetch('http://localhost:8492/api/books')
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
.book-col {
  margin-bottom: 20px; /* 设置底部间距 */
}
.cover-container {
  height: 200px; /* 设置图片容器的固定高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.book-cover {
  max-height: 100%; /* 设置图片的最大高度为父容器的高度 */
  max-width: 100%; /* 设置图片的最大宽度为父容器的宽度 */
  object-fit: contain; /* 保持图片比例，不拉伸变形 */
}
.book-card {
  height: 100%; /* 设置卡片的高度为父容器的高度 */
}
</style>
