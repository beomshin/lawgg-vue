<template>
  <img v-if="ext == 'jpg'" src="../../assets/images/fileIcn/jpg.gif" alt="" title="" />
  <img v-else-if="ext == 'png'" src="../../assets/images/fileIcn/png.gif" alt="" title="" />
  <img v-else-if="ext == 'hwp'" src="../../assets/images/fileIcn/hwp.gif" alt="" title="" />
  <img v-else-if="ext == 'xls'" src="../../assets/images/fileIcn/xls.gif" alt="" title="" />
  <img v-else-if="ext == 'mp4'" src="../../assets/images/fileIcn/jpg.gif" alt="" title="" />
  <img v-else-if="ext == 'avi'" src="../../assets/images/fileIcn/png.gif" alt="" title="" />
  <img v-else-if="ext == 'wmv'" src="../../assets/images/fileIcn/hwp.gif" alt="" title="" />
  <img v-else-if="ext == 'mpg'" src="../../assets/images/fileIcn/xls.gif" alt="" title="" />
  <img v-else-if="ext == 'mkv'" src="../../assets/images/fileIcn/xls.gif" alt="" title="" />
  <img v-else-if="ext == 'rofl'" src="../../assets/images/fileIcn/jpg.gif" alt="" title="" />
  <img v-else-if="ext == 'webm'" src="../../assets/images/fileIcn/png.gif" alt="" title="" />
</template>

<script>
export default {
  name: "FileImage",
  props: ['ext']
}
</script>

<style scoped>

</style>
