<template>
  <div class="content">

    <!-- 로그인 - 회원 -->
    <div class="login-area login-member">
      <div class="member-title pt0">
        <h2>로그인</h2>
        <h3>회원가입시 다양한 혜택과 서비스를 이용하실 수 있습니다.</h3>
      </div>
      <div class="la-content">
        <ul>
          <li>
            <input type="text" name="" title="" placeholder="아이디를 입력하세요." class="input-box w100p h60" v-model="loginId" maxlength="20" />
          </li>
          <li>
            <input type="password" name="" title="" placeholder="비밀번호를 입력하세요." class="input-box w100p h60" v-model="password" maxlength="12" @keyup.enter="login"/>
          </li>
        </ul>
        <div>
          <div class="check-box">
            <input type="checkbox" name="opt" id="chk1" v-model="saveLoginIdFlag"/>
            <label for="chk1">아이디 저장</label>
          </div>
          <div class="check-box">
            <input type="checkbox" name="opt" id="chk2" v-model="autoLoginFlag"/>
            <label for="chk2">자동 로그인</label>
          </div>
        </div>
        <p><a class="btn-default-b bg-black w100p" @click="login">로그인</a></p>
        <dl>
          <dt><a @click="go('/search/id')">아이디찾기</a></dt>
          <dd>|</dd>
          <dt><a @click="go('/search/pw')">비밀번호찾기</a></dt>
          <dd>|</dd>
          <dt><a @click="go('/join/agree')">회원가입</a></dt>
        </dl>
      </div>
      <div class="la-bottom">
        <dl>
          <dt></dt>
          <dd>또는 다른 서비스 계정으로 로그인</dd>
          <dt></dt>
        </dl>
        <ul>
          <li><a to="#"><img src="../../../assets/images/icn_sns_kakao.svg" alt="" title="" @click="snsLogin('kakao')"/></a></li>
          <li><a to="#"><img src="../../../assets/images/icn_sns_google.svg" alt="" title="" @click="snsLogin('google')"/></a></li>
          <li><a to="#"><img src="../../../assets/images/icn_sns_naver.svg" alt="" tile="" @click="snsLogin('naver')"/></a></li>
<!--          <li><a to="#"><img src="../../assets/images/icn_sns_facebook.svg" alt="" title=""/></a></li>-->
<!--          <li><a to="#"><img src="../../assets/images/icn_sns_twitter.svg" alt="" title=""/></a></li>-->
        </ul>
        <p>
          SNS계정으로 간편하게 가입하여 서비스를 이용하실 수 있습니다.
        </p>
      </div>
    </div>
    <!-- 로그인 - 회원 끝 -->
  </div>
</template>

<script>
import LoginDto from "@/dto/login/LoginDto.js";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import cookieCont from "@/constants/cookieCont";
import {mapGetters, mapMutations} from "vuex";
import commonhelper from "@/store/modules/common/helper";
import verifyUtils from "@/utils/verifyUtils";
import userHelper from "@/store/modules/user/helper";
import FindUserAlertRequestDto from "@/dto/user/request/FindUserAlertRequestDto";

export default {
  name: "MemberLogin",
  data () {
    return  {
      loginId: '',
      password: '',
      saveLoginIdFlag: false,
      autoLoginFlag: false
    }
  },
  computed: {
    ...mapGetters(commonhelper.name, commonhelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
  },
  mounted() {
    this.findAutoLogin() // 자동 로그인통해 로그인 처리시 메인으로 이동
    this.findSaveLoginId() // 아이디 저장 여부 쿠키 조회
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    go(url) {
      this.$router.push(url)
    },
    async login() { // 로그인
      if (!verifyUtils.login(this.loginId, this.password)) return
      const param = new LoginDto(this.loginId, this.password)
      const res = await service.normalLogin(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.saveLoginId() // 쿠키 로그인 아이디 저장
        commonUtils.successLogin(res.data.accessToken)
        this.setRefreshToken(res.data.refreshToken)
        await this.getAlarm()
        await this.$router.replace('/')
      }
    },
    saveLoginId() { // 아이디 저장
      if (this.saveLoginIdFlag) {
        this.$cookies.set(cookieCont.SAVE_LOGIN_ID_NAME, btoa(this.loginId))
      } else {
        this.$cookies.remove(cookieCont.SAVE_LOGIN_ID_NAME)
      }
    },
    setRefreshToken(refreshToken) { // 리프레쉬 토큰 저장
        if (this.autoLoginFlag) {
          this.$cookies.set(cookieCont.AUTH_REFRESH_COOKIE_NAME, refreshToken, '7d')
        }
    },
    findSaveLoginId() { // 아이디 저장 여부 조회
      if (this.$cookies.isKey(cookieCont.SAVE_LOGIN_ID_NAME)) {
        this.loginId = atob(this.$cookies.get(cookieCont.SAVE_LOGIN_ID_NAME))
        this.saveLoginIdFlag = true
      }
    },
    findAutoLogin() { // 자동 로그인 저장 여부 조회
      if (this.getIsLogin) {
        this.$router.replace('/')
      }
    },
    snsLogin(sns) {
      if (sns == 'kakao') service.kakaoLogin();
      else if (sns == 'google') service.googleLogin();
      else if (sns == 'naver') service.naverLogin()
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
