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
    <template v-for="(trial, index) in trialList">
      <board-card :item="trial" :id="trial.trialId" :key="index" @goDetail="goDetail(trial.trialId)" />
    </template>
  </div>
</template>

<script>
import BoardCard from "@/components/common/BoardCard";

export default {
  name: "TrialBoardList",
  components: {BoardCard},
  props: ['trialList'],
  methods: {
    goDetail(trialId) {
      this.$router.push({ path: 'trial/view',  query: { id: trialId } })
    }
  }
}
</script>

<style scoped>

</style>
