<template>
  <div class="paging-list">
    <a v-if="!isFirst" @click="movePage(perv)"  style="cursor: pointer"><i class="uil uil-angle-left-b"></i></a>
    <template v-for="(n, index) in endPage">
      <a
          :key="index"
          style="cursor: pointer"
          :class="{'active' : pageNumber(n) == page }"
          @click="movePage(pageNumber(n))">
        {{n + startPage}}
      </a>
    </template>
    <a v-if="!isLast" @click="movePage(next)"  style="cursor: pointer"><i class="uil uil-angle-right-b"></i></a>
  </div>
</template>

<script>
export default {
  name: "PagingList",
  props: ['page', 'totalPage', 'pageNum'],
  computed: {
    curPageBar() { // 현재 페이지 바 번호
      return Math.floor(this.page / this.pageBarCount);
    },
    startPage() { // 시작 번호
      return this.curPageBar * this.pageBarCount
    },
    endPage() { // 종료 번호
      const pages = this.totalPage - (this.curPageBar * this.pageBarCount);
      return pages >= this.pageBarCount ? this.pageBarCount : pages
    },
    isFirst() { // 첫번째 페이지바
      return this.curPageBar == 0
    },
    isLast() { // 마지막 페이지 바
      return (this.curPageBar + 1) * this.pageBarCount >= this.totalPage
    },
    perv() { // 이전 페이지바 이동
      return this.startPage - 1
    },
    next() { // 다음 페이지바 이동
      return this.startPage + this.pageBarCount
    },
    pageBarCount() {
      return window.innerWidth <= 480 ? 5 : 10
    }
  },
  methods: {
    movePage(page) { // 페이지 번호 이동
      if (this.page == page) return;
      this.$emit('movePage', page)
    },
    pageNumber(n) { // 서버 요청 페이지번호 계산
      return n + this.startPage - 1
    },
  }
}
</script>

<style scoped>

</style>
