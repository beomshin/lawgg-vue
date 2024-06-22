<template>
  <dt>
    <!-- 내정보 -->
    <div class="mypage-info">
      <div class="mi-info">
        <p>
          <img :src="getProfile" id="test4" width="100%" alt="" title=""  />
          <input hidden type="file" id="imageFile" @change="handleFileChange">
          <button @click="openImageFile">편집</button>
        </p>
        <div>
          <h2><i class="uil uil-user"></i> {{getNickName}} (포인트 : {{getPoint}} p)</h2>
          <h3><i class="uil uil-calendar-alt"></i> 가입일 ({{getRegDt}})</h3>
          <h4><button class="btn-default-m bg-black w100p" @click="logout">로그아웃</button></h4>
        </div>
      </div>
      <div class="mi-menu">
        <a @click="go('/my/info')" :class="{'active' : curActive('/my/info')}" style="cursor: pointer">- 개인정보수정</a>
        <a @click="go('/my/alert')" :class="{'active' : curActive('/my/alert')}" style="cursor: pointer">- 알림함</a>
        <a @click="go('/my/message')" :class="{'active' : curActive('/my/message')}" style="cursor: pointer">- 쪽지함</a>
        <a @click="go('/my/board')" :class="{'active' : curActive('/my/board')}" style="cursor: pointer">- 글목록</a>
      </div>
    </div>
    <!-- 내정보 끝 -->
  </dt>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import commonUtils from "@/utils/commonUtils";
import service from "@/http/service";
import UpdateUserProfileRequestDto from "@/dto/user/request/UpdateUserProfileRequestDto";
import cookieCont from "@/constants/cookieCont";

const MAX_SIZE = 3 * 1024 * 1024 // 최대 파일 크기 3MB

export default {
  name: "MyPageHeader",
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
    go(url) {
      if (this.$route.path == url) return
      this.$emit('go')
      this.$router.push(url)
    },
    curActive(url) {
      return this.$route.path == url
    },
    openImageFile() {
      document.getElementById('imageFile').click()
    },
    handleFileChange(e) { // 파일 등록
      let result = confirm('프로필을 수정하시겠습니까?')
      if (!result) {
        e.target.value = ''; // 동일한 파일 업로드를 위해 초기화
        return;
      }
      let file = e.target.files[0]
      if (!file) return;
      this.filePath = e.target.value
      e.target.value = ''; // 동일한 파일 업로드를 위해 초기화
      const ext = commonUtils.getExt(file.name)
      if (file.size > MAX_SIZE) { // 사이즈 검사
        alert('파일 크기가 3MB를 초과했습니다.')
        return
      } else if (!ext) return; // 확장자 검사
      file.ext = ext
      this.updateUserInfo(file)
    },
    setProfile(file) {
        let reader = new FileReader()
        reader.onload = (e) => {
          let img = document.getElementById("test4")
          img.setAttribute("src", e.target.result)
        }
        reader.readAsDataURL(file)
    },
    updateUserInfo(file) {
      service.updateUserProfile(new UpdateUserProfileRequestDto(file)).then(res => {
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          this.setProfile(file)
          this.updateProfile(res.data.profile)
          alert('프로필 변경을 성공하였습니다.')
        }
      }).catch(() => { alert('프로필 변경을 실패하였습니다.')})
    },
    logout() {
      this.$cookies.remove(cookieCont.AUTH_COOKIE_NAME)
      this.$cookies.remove(cookieCont.AUTH_REFRESH_COOKIE_NAME)
      this.successLogout()
      this.setUserInfo(undefined)
      if (this.$route.path != '/') this.$router.replace('/')
    },
  }
}
</script>

<style scoped>
 #imageFile {
   display: none;
 }
</style>
