<template>
  <div class="board-list w100p">
    <ol class="bl-message">
      <li>번호</li>
      <li>제목</li>
      <li>작성일</li>
    </ol>
    <template v-for="(item, index) in alerts">
      <ul class="bl-message" :key="index" >
        <li>{{index + (page * pageNum) + 1}}.</li>
        <li style="cursor: pointer" @click="goAlarm(item)">
          <a>{{item.title}}</a>
          <img v-if="isWithTime(item.regDt)" src="../../../assets/images/icn_new02.png" height="17" alt="" title="" />
        </li>
        <li><font>수신일 : </font> {{formatDate(item.regDt)}}</li>
      </ul>
    </template>
  </div>
</template>

<script>
import commonUtils from "@/utils/commonUtils";
import service from "@/http/service";
import UpdateUserAlertRequestDto from "@/dto/user/request/UpdateUserAlertRequestDto";
import {mapMutations} from "vuex";
import userHelper from "@/store/modules/user/helper";

export default {
  name: "AlertList",
  props: ['alerts', 'page', 'pageNum'],
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    formatDate(dateStr) {
      return commonUtils.formatDate(dateStr);
    },
    isWithTime(dateString) {
      return commonUtils.isWithTime(dateString, 60 * 60 * 1000); // 한시간 이내
    },
    goAlarm(item) {
      if (item.readFlag == 0) {
        this.updateReadAlertFind(item.id)
        service.updateAlert(new UpdateUserAlertRequestDto(item.id))
      }

      if (item.type == 0) {
        this.goBoardDetail(item.boardId)
      } else if (item.type == 1) {
        this.goTrialDetail(item.trialId)
      }
    },
    goTrialDetail(id) {
      if (this.$route.path == `/trial/view` && this.$route.query.id == id) return
      this.$router.push({
        path: '/trial/view',
        query: {
          id: id
        }
      })
    },
    goBoardDetail(id) {
      if (this.$route.path == `/position/view` && this.$route.query.id == id) return
      this.$router.push({
        path: '/position/view',
        query: {
          id: id
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
