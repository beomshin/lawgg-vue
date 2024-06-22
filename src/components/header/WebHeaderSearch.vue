<template>
  <div class="header-search">
    <div class="input-search-line">
      <p><i class="uit uit-search"></i></p>
      <div><input type="text" title="keywords" placeholder="검색어를 입력하세요." v-model="keyword" v-on:keyup.enter="headerSearchKeyword"/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebHeaderSearch",
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    headerSearchKeyword() {
      this.$emit('headerSearchKeyword', this.keyword)
      this.keyword = ''
    }
  }
}
</script>

<style scoped>

</style>
