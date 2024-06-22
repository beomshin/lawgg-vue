<template>
  <div class="sub-menu">
    <a style="cursor: pointer" :class="{'active' : type == 5}" @click="updateType(5)">ALL</a>
    <a style="cursor: pointer" :class="{'active' : type == 0}" @click="updateType(0)">Top</a>
    <a style="cursor: pointer" :class="{'active' : type == 1}" @click="updateType(1)">JG</a>
    <a style="cursor: pointer" :class="{'active' : type == 2}" @click="updateType(2)">Mid</a>
    <a style="cursor: pointer" :class="{'active' : type == 3}" @click="updateType(3)">Bot</a>
    <a style="cursor: pointer" :class="{'active' : type == 4}" @click="updateType(4)">Spt</a>
  </div>
</template>

<script>
export default {
  name: "PositionSubMenu",
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