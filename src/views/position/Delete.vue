<template>
  <div class="content">
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
        <p><a class="btn-default-b bg-black  w100p" @click="deleteBoard">삭제하기</a></p>
        <p><a class="btn-default-b bg-gray-light w100p" @click="back" >뒤로가기</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteUserBoardRequestDto from "@/dto/board/request/board/DeleteUserBoardRequestDto";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import DeleteAnonymousBoardRequestDto from "@/dto/board/request/board/DeleteAnonymousBoardRequestDto";
import {mapMutations} from "vuex";
import userHelper from "@/store/modules/user/helper";
import commonCont from "@/constants/commonCont";
import verifyUtils from "@/utils/verifyUtils";

export default {
  name: "Delete",
  data() {
    return {
      password: '',
      id: '',
      type: ''
    }
  },
  activated() {
    this.password = commonCont.EMPTY
    this.id = this.$route.query.id
    this.type = this.$route.query.type
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    back() {
      window.history.back()
    },
    deleteBoard() {
      if (!verifyUtils.password(this.password)) return
      let result = confirm('게시판을 삭제하시겠습니까?')
      if (!result) return;
      if (this.isUserBoard()) this.deleteUserBoard()
      else this.deleteAnonymousBoard()
    },
    async deleteUserBoard() {
      const param = new DeleteUserBoardRequestDto(this.id, this.password)
      const res = await service.deleteUserBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        window.history.back()
        this.updateBoardCount(-1)
        alert('게시판 삭제를 성공했습니다.')
      }
    },
    async deleteAnonymousBoard() {
      const param = new DeleteAnonymousBoardRequestDto(this.id, this.password)
      const res = await service.deleteAnonymousBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        window.history.back()
        alert('게시판 삭제를 성공했습니다.')
      }
    },
    isUserBoard() {
      return this.type == 1
    }
  }
};
</script>
