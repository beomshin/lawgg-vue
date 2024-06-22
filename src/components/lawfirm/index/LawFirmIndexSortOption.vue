<template>
  <dl class="board-sort-option">
    <dt>
      <div><i class="uil uil-notebooks"></i>&nbsp; 총 <strong>{{totalElements.toLocaleString()}}</strong> 개의 로펌 / 현재페이지 [{{page}}/{{totalPage}}]</div>
    </dt>
    <div name="searchForm" >
      <fieldset>
        <legend>게시물 검색</legend>
        <dd class="sso-two">
          <div>
            <slot name="pageNum"/>
            <slot name="keyword"/>
            <button class="btn-default-a bg-black" @click="updateKeyword"><i class="uit uit-search"></i> 검색</button>
          </div>
        </dd>
      </fieldset>
    </div>
  </dl>
</template>

<script>
export default {
  name: "LawFirmIndexSortOption",
  props: ['totalElements', 'page', 'totalPage'],
  methods: {
    updateKeyword() {
      this.$emit('updateKeyword')
    },
  }
}
</script>

<style scoped>

</style>