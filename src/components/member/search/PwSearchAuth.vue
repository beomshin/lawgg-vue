<template>
  <div class="idpw-search">
    <div class="member-title pt0">
      <h2>비밀번호 찾기</h2>
      <h3>로그인 아이디를 입력 후 본인인증을 진행 해주세요.</h3>
    </div>
    <div class="is-content">
      <ul>
        <li>
          <input type="text" name="" title="" placeholder="아이디" class="input-box w100p h60" v-model="loginId" maxlength="20"/>
        </li>
      </ul>
      <p><a class="btn-default-b bg-black w100p" @click="callPhoneAuth" >비밀번호 찾기</a></p>
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
import commonCont from "@/constants/commonCont";

export default {
  name: "PwSearchAuth",
  data() {
    return {
      loginId: ''
    }
  },
  mounted() {
    this.loginId = this.$route.query.id
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    clear() {
      this.loginId = commonCont.EMPTY
    },
    callPhoneAuth() {
      if (!this.loginId || this.loginId.length == 0) {
        alert('아이디를 입력해주세요.')
        return
      }
      this.$emit('callPhoneAuth', this.loginId)
      this.clear()
    }
  }

}
</script>

<style scoped>

</style>
