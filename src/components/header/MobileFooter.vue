<template>
  <div class="footer-mobile-menu">
    <ul>
      <li @click="move('/position')">
        <p><i class="uil uil-comment"></i></p>
        <h2>포지션게시판</h2>
      </li>
      <li @click="move('/trial')">
        <p><i class="uil uil-notes"></i></p>
        <h2>트라이얼</h2>
      </li>
      <li @click="move('/law-firm')">
        <p><i class="uil uil-book-open"></i></p>
        <h2>로펌</h2>
      </li>
      <li @click="move('/normal')">
        <p><i class="uil uil-book-alt"></i></p>
        <h2>자유게시판</h2>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "MobileFooter",
  methods: {
    move(url) {
      if (this.$route.path == url) return
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>
