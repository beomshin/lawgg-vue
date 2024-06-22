<template>
  <div class="header-side-mobile" id="headerSideMobile">
    <div class="hsm-close"><i class="uil uil-times" @click="headerSideCloseMobile"></i></div>
    <div class="hsm-search">
      <div class="input-search-line-mobile">
        <p><i class="uil uil-search"></i></p>
        <div><input type="text" name="" title="keywords" placeholder="검색어를 입력하세요." v-model="keyword" v-on:keyup.enter="headerSearchKeyword" /></div>
      </div>
    </div>
    <div class="hsm-menu">
      <a @click="move('/position')" style="cursor: pointer"><i class="uil uil-comment"></i> 포지션 게시판</a>
      <a @click="move('/trial')" style="cursor: pointer"><i class="uil uil-notes"></i> 트라이얼</a>
      <a @click="move('/law-firm')" style="cursor: pointer"><i class="uil uil-book-open"></i> 로펌</a>
      <a @click="move('/normal')" style="cursor: pointer"><i class="uil uil-book-alt"></i> 자유 게시판</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileDrawer",
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    headerSideCloseMobile () {
      this.$emit('headerSideCloseMobile')
    },
    headerSearchKeyword() {
      this.$emit('headerSearchKeyword', this.keyword)
      this.headerSideCloseMobile()
      this.keyword = ''
    },
    move(url) {
      if (this.$route.path == url) return
      this.headerSideCloseMobile()
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>
