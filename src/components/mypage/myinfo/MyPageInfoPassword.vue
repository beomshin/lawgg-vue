<template>
  <div class="mypage-info-modify">
    <dl>
      <dt>비밀번호 확인 <span>*</span></dt>
      <dd><input name="" type="password" class="input-box w100p" placeholder="비밀번호를 입력해주세요." maxlength="12" v-model="password" @keyup.enter="verifyPassword"/></dd>
    </dl>
    <div>
      <a @click="verifyPassword" class="btn-default-b bg-pink w49p">비밀번호인증</a>
      &nbsp;
      <a  @click="back" class="btn-default-b bg-black w49p">취소</a>
    </div>
  </div>
</template>

<script>
import service from "@/http/service";
import CheckPwUserRequestDto from "@/dto/user/request/CheckPwUserRequestDto";
import commonUtils from "@/utils/commonUtils";

export default {
  name: "MyPageInfoPassword",
  data() {
    return {
      password: ''
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    async verifyPassword() {
      const param = new CheckPwUserRequestDto(this.password)
      const res = await service.checkPwUser(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.$emit('successAuth')
        this.authFlag = true
      }
    },
  }
}
</script>

<style scoped>

</style>
