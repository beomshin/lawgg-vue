<template>
  <div class="banner-area01" ref="banner">
    <img src="../../assets/images/banner_img01.png" alt="" title="" />
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods:  {
    scrollBanner() {
      this.$refs.banner.scrollIntoView()
    }
  }
}
</script>

<style scoped>

</style>
