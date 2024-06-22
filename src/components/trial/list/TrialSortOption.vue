<template>
  <dl class="board-sort-option">
    <dt>
      <button :class="{'active' : topic == 0}" @click="updateTopic(0)"><i class="uit uit-check-square"></i> 전체</button>
      <button :class="{'active' : topic == 1}" @click="updateTopic(1)"><i class="uit uit-check-square"></i> 실시간</button>
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
          <p>
            <a @click="writer"  class="btn-default-a bg-black"><i class="uit uit-edit-alt"></i> 글쓰기</a>
          </p>
        </dd>
      </fieldset>
    </div>
  </dl>
</template>

<script>
export default {
  name: "TrialSortOption",
  props: ['topic'],
  methods: {
    updateTopic(topic) {
      if (this.topic == topic) return;
      this.$emit('updateTopic', topic)
    },
    updateKeyword() {
      this.$emit('updateKeyword')
    },
    writer() {
      this.$router.push({ path: 'trial/write' })
    }
  }

}
</script>

<style scoped>

</style>
