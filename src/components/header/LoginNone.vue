<template>
  <div class="header-login-join">
    <button class="btn-line-gray-m w80 mr5" @click="move('/login')"><i class="uit uit-padlock"></i> 로그인</button>
    <button class="btn-default-m bg-black w100" @click="move('/join/agree')"><i class="uit uit-user"></i> 회원가입</button>
  </div>
</template>

<script>
export default {
  name: "LoginNone",
  methods: {
    move(url) {
      if (this.$route.path == url) return
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>
