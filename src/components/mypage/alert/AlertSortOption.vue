<template>
  <dl class="board-sort-option w100p">
    <dt>
      <div><i class="uil uil-notebooks"></i>&nbsp; 총 <strong>{{totalElements.toLocaleString()}}</strong> 개의 알림</div>
    </dt>
    <dd class="sso-two">
      <div>
        <slot name="pageNum"/>
        <slot name="keyword"/>
        <button class="btn-default-a bg-black" @click="updateKeyword"><i class="uit uit-search"></i> 검색</button>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "AlertSortOption",
  props: ['totalElements'],
  methods: {
    updateKeyword() {
      this.$emit('updateKeyword')
    },
  }
}
</script>

<style scoped>

</style>
