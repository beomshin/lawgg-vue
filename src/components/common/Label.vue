<template>
  <label v-if="postType == 2" class="label-default bg-purple w50">추천</label>
  <label v-else-if="postType == 3" class="label-default bg-green w50">베스트</label>
  <label v-else-if="postType == 98" class="label-default bg-teal w50">이벤트</label>
  <label v-else-if="postType == 99" class="label-default bg-red w50">공지</label>
</template>

<script>
export default {
  name: "Label",
  props: ['postType']
}
</script>

<style scoped>

</style>
