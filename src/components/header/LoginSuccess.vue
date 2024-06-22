<template>
  <div class="header-info">
    <div @click="openMessage">
      <i class="uit uit-bell"></i>
      <span v-if="!isAllRead"></span>
    </div>
    <p @click="openMyinfo" >{{getName}}</p>
  </div>
  <!-- 알림/내정보 끝 -->
</template>

<script>

import {mapGetters} from "vuex";
import userHelper from "@/store/modules/user/helper";

export default {
  name: "LoginSuccess",
  computed: {
    ...mapGetters(userHelper.name, userHelper.getters),
    isAllRead() {
      return !this.getAlert.find(it => {return it.readFlag == 0})
    },
    getName() {
      return this.getUserInfo && this.getUserInfo.name ? this.getUserInfo.name.substring(0, 1) : 'My'
    }
  },
  methods: {
    openMessage() {
      this.$emit('openMessage')
    },
    openMyinfo() {
      this.$emit('openMyinfo')
    }
  }

}
</script>

<style scoped>

</style>
