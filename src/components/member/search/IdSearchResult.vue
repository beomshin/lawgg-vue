<template>
  <div class="idpw-search">
    <div class="member-title pt0">
      <h2>아이디찾기</h2>
      <h3>아래의 항목은 유저님의 아이디 찾기 결과 입니다.</h3>
    </div>
    <div class="is-content">
      <ol>
        <template v-for="(id, index) in ids">
          <li :key="index">
            <div class="radio-box">
              <input type="radio" name="pwRadio" :id="'pwRadio' + index" @click="setId(id.loginId, index)" :disabled="id.status == 9"/>
              <label :for="'pwRadio' + index" >
                {{id.loginId}} - {{comment(id.regDt, id.status)}}
              </label>
            </div>
          </li>
        </template>
      </ol>
      <p><a class="btn-default-b bg-black w100p" @click="goPassword">비밀번호 재설정</a></p>
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
  name: "IdSearchResult",
  props: ['ids'],
  data() {
    return {
      loginId: '',
      no: -1
    }
  },
  methods: {
    go(url) {
      this.$router.push(url)
    },
    setId(loginId, index) {
      this.loginId = loginId
      this.no = index
    },
    comment(regDt, status) {
      return status == 1 ? `(가입일 : ${regDt})` : `탈퇴계정`
    },
    goPassword() {
      if (this.no == -1) {
        alert('아이디를 선택해주세요')
        return
      }
      this.$router.replace({ path: '/search/pw', query: { id: this.loginId } })
    }
  }
};
</script>
