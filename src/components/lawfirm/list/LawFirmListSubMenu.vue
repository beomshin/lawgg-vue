<template>
  <div class="sub-menu">
    <a style="cursor: pointer" :class="{'active' : type == 0}" @click="updateType(0)">포지션</a>
    <a style="cursor: pointer" :class="{'active' : type == 1}" @click="updateType(1)">트라이얼</a>
  </div>

</template>

<script>
export default {
  name: "LawFirmListSubMenu",
  props: ['type'],
  methods: {
    updateType(type) {
      if (this.type == type) return
      this.$emit('updateType', type)
    }
  }
}
</script>

<style scoped>

</style>