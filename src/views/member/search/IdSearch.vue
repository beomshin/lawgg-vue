<template>
  <div class="content">
      <IdSearchAuth v-if="step == 0" @callPhoneAuth="callPhoneAuth"/>
      <IdSearchResult v-else-if="step == 1" :ids.sync="ids"/>
  </div>
</template>

<script>
import IdSearchAuth from "@/components/member/search/IdSearchAuth";
import IdSearchResult from "@/components/member/search/IdSearchResult";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import FindIdUserRequestDto from "@/dto/user/request/FindIdUserRequestDto";
import commonCont from "@/constants/commonCont";
export default {
  name: "MemberIdSearch",
  components: {IdSearchResult, IdSearchAuth},
  data() {
    return {
      step: 0,
      email: '',
      ids: []
    }
  },
  methods: {
    callPhoneAuth() {
      let IMP = window.IMP;
      const _this = this
      IMP.init("imp41351603");
      IMP.certification({ // param
        m_redirect_url : "/search/id",
        popup : false,
      }, function (rsp) { // callback
        if (rsp.success) {
          this.ids = commonCont.EMPTY_ARR
          service.findIdUser(new FindIdUserRequestDto(rsp))
              .then(res => {
                if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
                  if (res.data.ids.length > 0) {
                    _this.step = 1
                    _this.ids = res.data.ids
                  } else {
                    window.history.back()
                    alert('등록된 계정이 없습니다.')
                  }
                }
              })
              .catch(() => {
                alert('본인 인증을 실패하였습니다.')
              })
        } else {
          alert('본인 인증을 실패하였습니다.')
        }
      });
    },
  }
};
</script>
