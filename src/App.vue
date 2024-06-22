<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'div'">
        <router-view />
    </component>
  </div>
</template>

<script>
import cookieCont from "@/constants/cookieCont";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import userHelper from "@/store/modules/user/helper";
import commonHelper from "@/store/modules/common/helper";
import {mapGetters, mapMutations} from "vuex";
import FindUserAlertRequestDto from "@/dto/user/request/FindUserAlertRequestDto";

export default {
  name: "App",
  created() {
      this.isLogin()
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    isAutoLogin () {
      return !this.$cookies.isKey(cookieCont.AUTH_COOKIE_NAME) && this.$cookies.isKey(cookieCont.AUTH_REFRESH_COOKIE_NAME)
    },
    isNoneUserInfo() {
      return this.$cookies.isKey(cookieCont.AUTH_COOKIE_NAME) && !this.getUserInfo
    }
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    async isLogin() {
      if (this.isAutoLogin) { // 자동 로그인 상태 (인증 토큰 소멸 && refresh 토큰 있음)
        const res = await service.authReissue()
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          await commonUtils.successLogin(res.data.accessToken)
          await this.getAlarm()
        } else {
          this.$cookies.remove(cookieCont.AUTH_REFRESH_COOKIE_NAME)
          alert('로그아웃 되었습니다.')
        }
      } else if (this.isNoneUserInfo) { // 로그인 상태 (인증 토큰 있음)
        const res = await service.findInfoUser(this.$cookies.get(cookieCont.AUTH_COOKIE_NAME))
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          this.setUserInfo(res.data.user)
          await this.getAlarm()
        }
      }
    },
    async getAlarm() {
      const param = new FindUserAlertRequestDto(0, 5, '')
      const res = await service.findUserAlerts(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.updateAlerts(res.data.list)
      }
    }
  }
};
</script>

<style>


</style>
