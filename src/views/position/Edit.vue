<template>
  <div class="content">
    <template v-if="isAuth == 1">
      <position-password-edit :id.sync="id" @searchAnonymousBoard="searchAnonymousBoard"/>
    </template>

    <template v-else-if="isAuth == 2">
      <!-- 타이틀 -->
      <Title :page="0"/>

      <!-- 등록/수정 -->
      <position-content-edit :board.sync="board" :id.sync="id"/>
    </template>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import LoginUserBoardRequestDto from "@/dto/board/request/board/LoginUserBoardRequestDto";
import findUserDetailBoardRequestDto from "@/dto/board/request/board/FindUserDetailBoardRequestDto";
import FindAnonymousDetailBoardRequestDto from "@/dto/board/request/board/FindAnonymousDetailBoardRequestDto";
import PositionPasswordEdit from "@/components/position/edit/PositionPasswordEdit";
import PositionContentEdit from "@/components/position/edit/PositionContentEdit";
import Title from "@/components/common/Title";
import commonCont from "@/constants/commonCont";

export default {
  name: "PositionEdit",
  components: {Title, PositionContentEdit, PositionPasswordEdit},
  data() {
    return {
      id: '',
      isAuth: 0,
      type: '',
      board: {},
    }
  },
  activated() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.initLogin()
  },
  deactivated() {
    this.clear()
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
  },
  methods: {
    back() {
      window.history.back()
    },
    initLogin() {
      if (this.type == 0) { // 비로그인
        this.isAuth = commonCont.PASSWORD_PAGE
      } else if (this.type == 1) { // 로그인
        this.isAuth = commonCont.EDIT_PAGE
        this.loginUserBoard()
      }
    },
    async loginUserBoard() { // 유저 검사
      const param = new LoginUserBoardRequestDto(this.id, null)
      const res = await service.loginUserBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        await this.searchUserBoard()
      } else {
        window.history.back()
        alert('잘못된 접근입니다.')
      }
    },
    async searchUserBoard() { // 게시판 로그인 유저 조회
      const param  = new findUserDetailBoardRequestDto(this.id)
      const res = await service.findUserDetailBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.board = res.data.board
        this.board.password = commonCont.PASSWORD
        this.isNormal()
      } else {
        window.history.back()
      }
    },
    async searchAnonymousBoard(password) { // 게시판 비로그인 유저 조회
      const param = new FindAnonymousDetailBoardRequestDto(this.id)
      const res = await service.findAnonymousDetailBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.board = res.data.board
        this.board.password = password
        this.isEnd()
      } else {
        window.history.back()
      }
    },
    isNormal() {
      if (this.isHotBoard() || this.isNotice()) {
        window.history.back()
        alert(`${this.isTitle()} 게시판은 수정이 불가합니다.`)
      }
    },
    isHotBoard() { // 핫 게시판
      return this.board.postType == 2 || this.board.postType == 3
    },
    isNotice() { // 공지, 이벤트 게시판
      return this.board.postType == 99 || this.board.postType == 98
    },
    isTitle() { // 게시판 타입 타이틀
      switch (this.board.postType)  {
        case 2: return '베스트';
        case 3: return '추천'
        case 98: return '이벤트'
        case 99: return '공지'
      }
    },
    isEnd() { // 페이지 엔딩 플래그
      this.isAuth = 2
    },
    clear() { // 전체 클리어
      this.id = commonCont.EMPTY
      this.type = commonCont.EMPTY
      this.isAuth = commonCont.ZERO
      this.board = commonCont.EMPTY_OBJ
    },
  },

};
</script>
