<template>
  <div class="idpw-search">
    <div class="member-title pt0">
      <h2>비밀번호 입력</h2>
      <h3>SNS 계정은 마이페이지에서 비밀번호를 설정 후 입력해주세요.</h3>
    </div>
    <div class="is-content">
      <ul>
        <li>
          <input type="password" name="" title="" placeholder="패스워드 입력" class="input-box w100p h60" v-model="password" />
        </li>
      </ul>
      <p><a class="btn-default-b bg-black  w100p" @click="login">확인</a></p>
      <p><a class="btn-default-b bg-gray-light w100p" @click="back" >뒤로가기</a></p>
    </div>
  </div>
</template>

<script>
import service from "@/http/service";
import LoginAnonymousBoardRequestDto from "@/dto/board/request/board/LoginAnonymousBoardRequestDto";
import commonUtils from "@/utils/commonUtils";

export default {
  name: "PositionPasswordEdit",
  props: ['id'],
  data() {
    return {
      password: ''
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    login() { // 비로그인 로그인 검사
      service.loginAnonymousBoard(new LoginAnonymousBoardRequestDto(this.id, this.password)).then(res => {
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          this.$emit('searchAnonymousBoard', this.password)
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
