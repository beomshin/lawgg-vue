<template>
  <div class="content">
    <div class="idpw-search">
      <div class="member-title pt0">
        <h2>비밀번호 입력</h2>
        <h3><span style="color: red">SNS 계정은</span> 마이페이지에서 비밀번호를 설정 후 입력해주세요.</h3>
      </div>
      <div class="is-content">
        <ul>
          <li>
            <input type="password" name="" title="" placeholder="패스워드 입력" class="input-box w100p h60" v-model="password" />
          </li>
        </ul>
        <p><a class="btn-default-b bg-black  w100p" @click="deleteTrial">삭제하기</a></p>
        <p><a class="btn-default-b bg-gray-light w100p" @click="back" >뒤로가기</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/http/service";
import DeleteUserTrialRequestDto from "@/dto/trial/request/trial/DeleteUserTrialRequestDto";
import commonUtils from "@/utils/commonUtils";
import {mapMutations} from "vuex";
import userHelper from "@/store/modules/user/helper";
import commonCont from "@/constants/commonCont";
import verifyUtils from "@/utils/verifyUtils";

export default {
  name: "TrialDelete",
  data() {
    return {
      password: '',
      id: '',
      type: ''
    }
  },
  activated() {
    this.id = this.$route.query.id
  },
  deactivated() {
    this.password = commonCont.EMPTY
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    back() {
      window.history.back()
    },
    async deleteTrial() {
      if (!verifyUtils.password(this.password)) return
      let result = confirm('트라이얼을 삭제하시겠습니까?')
      if (!result) return;

      const param = new DeleteUserTrialRequestDto(this.id, this.password)
      const res = await service.deleteUserTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)){
        this.updateTrialCount(-1)
        window.history.back()
        alert('트라이얼 삭제에 성공했습니다.');
      }
    }
  }
};
</script>
