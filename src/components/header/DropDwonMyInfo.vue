<template>
  <dropdown-menu :isOpen="isOpenMyinfo" @closed="isOpenMyinfo == false" :overlay="false"  class="header-myinfo-dropdown">
    <div slot="body" class="header-myinfo">
      <dl>
        <dt><span :style="`background:url(${getProfile}); background-size:cover;`" @click="go('/my/info')" style="cursor: pointer"></span></dt>
        <dd>
          <h2>{{getNickName}} 님</h2>
          <h3>포인트 : {{getPoint}} p</h3>
          <div>가입일 : {{getRegDt}}</div>
        </dd>
      </dl>
      <div>
        <h2>내 활동내역</h2>
        <ul>
          <li><i class="uil uil-diamond"></i> {{getTierName}} <span>{{getTierLevel}}</span></li>
          <li><i class="uil uil-book-open"></i>
            <template v-if="getLawFirmName">
              <span>{{getLawFirmName}}</span> 로펌
            </template>
            <template v-else>
              로펌 <span>미가입</span>
            </template>
          </li>
          <li><i class="uil uil-clipboard"></i> 게시글 <span>{{getBoardCount}}</span></li>
          <li><i class="uil uil-clipboard"></i> 트라이얼 <span>{{getTrialCount}}</span></li>
          <li><i class="uil uil-comment"></i> 댓글 <span>{{getCommentCount}}</span></li>
        </ul>
      </div>
      <div>
        <h2>마이페이지</h2>
        <div>
          <a @click="go('/my/info')" style="cursor: pointer"><i class="uil uil-user-circle" ></i> 회원정보수정</a>
          <a @click="go('/my/alert')" style="cursor: pointer"><i class="uil uil-bell"></i> 알림함</a>
          <a @click="go('/my/board')" style="cursor: pointer"><i class="uil uil-clipboard-notes"></i> 글목록</a>
          <a @click="go('/my/message')" style="cursor: pointer"><i class="uil uil-bell"></i> 쪽지함</a>
        </div>
      </div>
      <p><a class="btn-default-m bg-black w100p" @click="logout">로그아웃</a></p>
    </div>
  </dropdown-menu>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import cookieCont from "@/constants/cookieCont";
import userHelper from "@/store/modules/user/helper";

export default {
  name: "DropDwonMyInfo",
  props: ['isOpenMyinfo'],
  data() {
    return {
      defaultProfile: 'https://i.pinimg.com/564x/d4/22/11/d42211cf93c61dc4d231f036c9c711c5.jpg'
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    getProfile() {
      return this.getUserInfo?.profile || this.defaultProfile
    },
    getLoginId() {
      return this.getUserInfo?.loginId || ''
    },
    getNickName() {
      return this.getUserInfo?.nickName || ''
    },
    getRegDt() {
      return this.getUserInfo?.regDt || ''
    },
    getTierName() {
      return this.getUserInfo?.tierName || ''
    },
    getTierLevel() {
      return this.getUserInfo?.tireLevel || ''
    },
    getLawFirmName() {
      return this.getUserInfo?.lawFirmNam || undefined
    },
    getBoardCount() {
      return this.getUserInfo?.boardCount || '0'
    },
    getTrialCount() {
      return this.getUserInfo?.trialCount || '0'
    },
    getCommentCount() {
      return this.getUserInfo?.commentCount || '0'
    },
    getEmail() {
      return this.getUserInfo?.email || ''
    },
    getPoint() {
      return this.getUserInfo?.point
    }
  },
  methods: {
    ...mapMutations(commonHelper.name, commonHelper.mutations),
    ...mapMutations(userHelper.name, userHelper.mutations),
    logout() {
      this.$emit('openMyinfo')
      this.$cookies.remove(cookieCont.AUTH_COOKIE_NAME)
      this.$cookies.remove(cookieCont.AUTH_REFRESH_COOKIE_NAME)
      this.successLogout()
      this.setUserInfo(undefined)
      if (this.$route.path != '/') this.$router.replace('/')
    },
    go(url) {
      this.$emit('openMyinfo')
      if (this.$route.path == url) return
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>
