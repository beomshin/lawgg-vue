<template>
  <dropdown-menu :isOpen="isOpenMessage" @closed="isOpenMessage == false" :overlay="false"  class="header-message-dropdown">
    <div slot="body" class="header-message">
      <dl>
        <dt>새알림</dt>
        <dd>
          <a style="cursor: pointer" @click="readAll">
            <i class="uil uil-comment-alt"></i>
            <span v-if="!isAllRead"></span>
            <em>전부읽음</em>
          </a>
        </dd>
      </dl>
      <ul v-if="this.getAlert.length > 0">
        <template v-for="(item, index) in this.getAlert">
          <li :key="index" @click="goAlarm(item, index)">
            <dl>
              <dt>
                <h2>{{item.title}}</h2>
                <h3>{{item.content}}</h3>
              </dt>
              <dd>
                <h2><i class="uis uis-clock" style="color:#c1c1c1;"></i> {{calculateRelativeTime(item.regDt)}}</h2>
                <p v-if="item.readFlag == 0"></p>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
      <p>
        <a @click="goAlert" style="cursor: pointer">{{this.getAlert.length > 0 ? '전체보기' : '알림함가기'}}</a>
      </p>
    </div>
  </dropdown-menu>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";
import userHelper from "@/store/modules/user/helper";
import service from "@/http/service";
import UpdateUserAlertRequestDto from "@/dto/user/request/UpdateUserAlertRequestDto";

export default {
  name: "DropDownAlarm",
  props: ['isOpenMessage'],
  data() {
    return {
      doubleSubmit: false
    }
  },
  computed: {
    ...mapGetters(userHelper.name, userHelper.getters),
    isAllRead() {
      return !this.getAlert.find(it => {return it.readFlag == 0})
    }
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    calculateRelativeTime(dateString) {
      const now = new Date();
      const date = new Date(dateString);

      // 현재 시간과 입력된 시간의 차이 계산 (밀리초 단위)
      const diff = now - date;
      const diffMinutes = Math.floor(diff / (1000 * 60)); // 분 단위
      const diffHours = Math.floor(diff / (1000 * 60 * 60)); // 시간 단위
      const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24)); // 일 단위
      const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)); // 월 단위

      if (diffMinutes < 10) {
        return "방금 전";
      } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
      } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
      } else if (diffDays < 7) {
        return `${diffDays}일 전`;
      } else if (diffMonths < 12) {
        return `${diffMonths}달 전`;
      } else {
        return '오래 전'
      }
    },
    goAlarm(item, index) {
      if (item.readFlag == 0) {
        this.updateReadAlert(index)
        service.updateAlert(new UpdateUserAlertRequestDto(item.alertId))
      }
      this.$emit('openMessage')
      if (item.type == 0) {
        this.goBoardDetail(item.boardId)
      } else if (item.type == 1) {
        this.goTrialDetail(item.trialId)
      }
    },
    async readAll() {
      if (this.doubleSubmit) return
      this.doubleSubmit = true
      this.$emit('openMessage')
      if (!this.isAllRead) {
        this.updateReadAlertAll()
        await service.updateAlertAll()
      }
      this.doubleSubmit = false
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
    goAlert() {
      this.$emit('openMessage')
      if(this.$route.path == `/my/alert`) return
      this.$router.push({
        path: '/my/alert'
      })
    }
  }
}
</script>

<style scoped>

</style>
