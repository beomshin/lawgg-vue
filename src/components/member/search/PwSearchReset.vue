<template>
  <div class="idpw-search">
    <div class="member-title pt0">
      <h2>비밀번호 재설정</h2>
      <h3>
        로우지지의 새로운 비밀번호를 입력해주세요.<br />
        띄어쓰기 없는 영문소문자, 숫자 포함 8~20자로 입력해주세요.
      </h3>
    </div>
    <div class="is-content">
      <ul>
        <li>
          <input type="password" name="" title="" placeholder="새 비밀번호" class="input-box w100p h60" v-model="password" maxlength="20"/>
        </li>
        <li>
          <input type="password" name="" title="" placeholder="새 비밀번호 확인" class="input-box w100p h60" v-model="rePassword" maxlength="=20"/>
        </li>
      </ul>
      <p @click="updatePassword"><a class="btn-default-b bg-black w100p">비밀번호 변경</a></p>
      <dl>
        <dt><a @click="go('/login')">로그인</a></dt>
        <dd>|</dd>
        <dt><a @click="go('/search/pw')">아이디찾기</a></dt>
        <dd>|</dd>
        <dt><a @click="go('/join/agree')">회원가입</a></dt>
      </dl>
    </div>
  </div>
</template>

<script>
import service from "@/http/service";
import UpdatePwUserRequestDto from "@/dto/user/request/UpdatePwUserRequestDto";
import commonUtils from "@/utils/commonUtils";
import verifyUtils from "@/utils/verifyUtils";

export default {
  name: "PwSearchReset",
  props: ['loginId', 'email'],
  data() {
    return {
      password: '',
      rePassword: '',
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    async updatePassword() {
      if (!verifyUtils.password2(this.password, this.rePassword)) return
      const param = new UpdatePwUserRequestDto(this.loginId, this.password)
      const res = await service.updatePwUser(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        window.history.back()
        alert('비밀번호 변경에 성공했습니다')
        window.location.replace('/lawgg')
      }
    },
  }
};
</script>
