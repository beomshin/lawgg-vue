<template>
  <div class="content">

    <!-- 비밀번호 찾기  -->
    <PwSearchAuth v-if="step == 0" @callPhoneAuth="callPhoneAuth"/>
    <PwSearchReset v-else-if="step == 1" :loginId.sync="loginId"/>

  </div>
</template>

<script>
import PwSearchAuth from "@/components/member/search/PwSearchAuth";
import PwSearchReset from "@/components/member/search/PwSearchReset";
import service from "@/http/service";
import CheckIdUserRequestDto from "@/dto/user/request/CheckIdUserRequestDto";
import commonUtils from "@/utils/commonUtils";
export default {
  name: "MemberPwSearch",
  components: {PwSearchReset, PwSearchAuth},
  data() {
    return {
      step: 0,
      email: '',
      loginId: ''
    }
  },
  methods: {
    callPhoneAuth(loginId) {
      let IMP = window.IMP;
      let _this = this
      IMP.init("imp41351603");
      IMP.certification({ // param
        m_redirect_url : "/search/id",
        popup : false,
      }, function (rsp) { // callback
        if (rsp.success) {
          service.checkIdUser(new CheckIdUserRequestDto(loginId, rsp))
              .then(res => {
                if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
                  _this.step = 1
                  _this.loginId = loginId
                } else {
                  alert('본인 인증을 실패하였습니다.')
                }
              })
              .catch(() => {
                alert('본인 인증을 실패하였습니다.')
              })
        } else {
          alert('본인 인증을 실패하였습니다.')
        }
      });
    }
  }
};
</script>
