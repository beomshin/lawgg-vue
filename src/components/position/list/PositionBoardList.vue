<template>
  <div class="board-list">
    <ol class="bl-default">
      <li>번호</li>
      <li>제목</li>
      <li>작성자</li>
      <li>작성일</li>
      <li>추천</li>
      <li>조회</li>
    </ol>
    <template v-for="(board, index) in boardList">
      <board-card :item="board" :id="board.boardId" :key="index" @goDetail="goDetail(board.boardId)" />
    </template>
  </div>
</template>

<script>
import BoardCard from "@/components/common/BoardCard";

export default {
  name: "PositionBoardList",
  components: {BoardCard},
  props: ['boardList'],
  methods: {
    goDetail(boardId) {
      this.$router.push({ path: 'position/view', query: { id: boardId } })
    }
  }
}
</script>

<style scoped>

</style>
