<template>
  <div>
    <h2>图书详情</h2>
    <div v-if="book">
      <p>图书ID: {{ this.$route.params.id }}</p>
      <p>书名: {{ book.title }}</p>
      <p>作者: {{ book.author }}</p>
      <p>总页数: {{ book.total_pages }}</p>
      <p class="info">最后阅读日期: {{ formatDate(book.recentReadingTime) }}</p>
      <p class="info">已阅读时长: {{ formatDuration(book.totalReadingDurationMinutes) }}</p>
      <!-- 直接在页面上显示输入框，用户输入阅读时长 -->
      <input v-model.number="readingDuration" type="number" placeholder="请输入阅读时长（分钟）">
      <button @click="recordReading" class="confirm-button">确定</button>
    </div>
    <router-link to="/book" class="back-button">返回</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: null,
      readingDuration: null // 输入的阅读时长
    };
  },
  created() {
    const bookId = this.$route.params.id;
    this.fetchBookDetails(bookId);
  },
  methods: {
    fetchBookDetails(bookId) {
      fetch(`http://localhost:8492/api/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
          this.book = data;
        })
        .catch(error => {
          console.error('Error fetching book details:', error);
        });
    },

    // 格式化日期
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },

    // 格式化时长
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}小时 ${remainingMinutes}分钟`;
    },

    // 记录阅读时长
    recordReading() {
      const bookId = this.$route.params.id;
      const data = {
        bookId: this.$route.params.id,
        totalReadingDurationMinutes: this.book.totalReadingDurationMinutes + parseInt(this.readingDuration),
      };
      fetch(`http://localhost:8492/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(updatedBook => {
        // 更新页面上的书籍信息
        this.book = updatedBook;
        // 重置输入框
        this.readingDuration = null;
      })
      .catch(error => {
        console.error('Error recording reading:', error);
      });
    }
  }
};
</script>

<style scoped>
/* 返回按钮样式 */
.back-button {
  margin-top: 20px;
  /* 上边距 */
  display: inline-block;
  /* 行内块级元素 */
  padding: 10px 20px;
  /* 内边距 */
  background-color: #007bff;
  /* 背景色 */
  color: #fff;
  /* 文字颜色 */
  text-decoration: none;
  /* 文本装饰 */
  border-radius: 5px;
  /* 边框圆角 */
  cursor: pointer;
  /* 鼠标样式 */
  transition: background-color 0.3s ease;
  /* 过渡效果 */
}

/* 鼠标悬停时的样式 */
.back-button:hover {
  background-color: #0056b3;
  /* 悬停时的背景色 */
}

/* 输入框样式 */
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* 确定按钮样式 */
.confirm-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 确定按钮悬停时的样式 */
.confirm-button:hover {
  background-color: #0056b3;
}
</style>
