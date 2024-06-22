<template>
  <dl class="board-sort-option">
    <dt>
      <button :class="{'active' : topic == 0}" @click="updateTopic(0)"><i class="uit uit-check-square"></i> 전체</button>
      <button :class="{'active' : topic == 1}" @click="updateTopic(1)"><i class="uit uit-check-square"></i> {{type == 0 ? '핫포지션' : '실시간'}}</button>
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
            <a class="btn-default-a bg-black"  @click="move"><i class="uit uit-edit-alt"></i> 글쓰기</a>
          </p>
        </dd>
      </fieldset>
    </div>
  </dl>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";

export default {
  name: "LawFirmListSortOption",
  props: ['topic', 'type', 'isMyLawFirmFlag'],
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
  },
  methods: {
    updateTopic(topic) {
      if (this.topic == topic) return;
      this.$emit('updateTopic', topic)
    },
    updateKeyword() {
      this.$emit('updateKeyword')
    },
    writer() {
      this.$router.push({ path: 'position/write',  query: { type: this.type} })
    },
    move() {
      if (!this.isLawFirmUser()) return
      if (this.type == 0) this.$router.push('position/write')
      else if (this.type == 1) this.$router.push('trial/write')
    },
    isLawFirmUser() {
      if (!this.getIsLogin || this.isMyLawFirmFlag == 0) {
        alert('로펌 회원만 이용할 수 있습니다.')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>
