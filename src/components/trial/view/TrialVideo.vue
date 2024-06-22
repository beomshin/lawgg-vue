<template>
  <div class="bv-movie" v-if="url">
    <iframe width="100%" height="640" :src="url" title="트라이얼 영상" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  name: "TrialVideo",
  props: ['url']
}
</script>

<style scoped>

</style>
