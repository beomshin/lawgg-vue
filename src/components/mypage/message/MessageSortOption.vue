<template>
  <dl class="board-sort-option w100p">
    <dt>
      <div><i class="uil uil-notebooks"></i>&nbsp; 총 <strong>{{totalElements.toLocaleString()}}</strong> 개의 쪽지</div>
    </dt>
    <dd class="sso-two">
      <div>
        <slot name="pageNum"/>
        <slot name="keyword"/>
        <button class="btn-default-a bg-black" @click="updateKeyword"><i class="uit uit-search"></i> 검색</button>
      </div>
      <p>
        <button @click="openMessage" class="btn-default-a bg-black"><i class="uit uit-edit-alt"></i> 쪽지작성</button>
      </p>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "MessageSortOption",
  props: ['totalElements'],
  methods: {
    updateKeyword() {
      this.$emit('updateKeyword')
    },
    openMessage() {
      this.$emit('openMessage')
      this.$modal.show('modalMessageWrite')
    }
  }
}
</script>

<style scoped>

</style>
