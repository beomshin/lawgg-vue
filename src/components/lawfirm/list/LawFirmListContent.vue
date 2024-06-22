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
    <template v-for="(item, index) in list">
      <board-card :key="index" :item="item" :id.sync="type == 0 ? item.boardId : item.trialId" @goDetail="goDetail(type == 0 ? 'position/view' : 'trial/view', type == 0 ? item.boardId : item.trialId)"/>
    </template>
  </div>
</template>

<script>
import BoardCard from "@/components/common/BoardCard";

export default {
  name: "LawFirmListContent",
  components: {BoardCard},
  props: ['list', 'type'],
  methods: {
    goDetail(path, id) {
      this.$router.push({ path: path, query: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
