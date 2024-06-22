<template>
  <a class="scroll-button" id="click">
    <button @click="scrollToTop">
      <span class="glyphicon glyphicon-chevron-up"></span>
    </button>
    <button @click="scrollToBottom">
      <span class="glyphicon glyphicon-chevron-down"></span>
    </button>
  </a>
</template>

<script>
export default {
  name: "TopMoveBtn",
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    scrollToBottom() {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    },
  },
}
</script>

<style scoped>
.scroll-button {
  position: fixed;
  right: 5%;
  bottom: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-button button {
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

@media (max-width: 768px) {
  /* 모바일 사이즈부터는 숨김 */
  .scroll-button {
    display: none;
  }
}

.scroll-button button:hover {
  background-color: #f2f2f2;
}

.scroll-button .glyphicon {
  color: gray;
  font-size: 20px;
}
</style>
