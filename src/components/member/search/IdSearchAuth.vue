<template>
  <div class="idpw-search">
    <div class="member-title pt0">
      <h2>아이디찾기</h2>
      <h3>본인 인증을 진행 해주세요.</h3>
    </div>
    <div class="is-content">
      <p><a class="btn-default-b bg-black w100p" @click="callPhoneAuth">휴대폰 본인 인증</a></p>
      <dl>
        <dt><a @click="go('/login')">로그인</a></dt>
        <dd>|</dd>
        <dt><a @click="go('/search/pw')">비밀번호찾기</a></dt>
        <dd>|</dd>
        <dt><a @click="go('/join/agree')">회원가입</a></dt>
      </dl>
    </div>
  </div>
</template>

<script>

export default {
  name: "IdSearchAuth",
  data() {
    return {

    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    callPhoneAuth() {
      this.$emit('callPhoneAuth')
    }
  }
}
</script>

<style scoped>

</style>
