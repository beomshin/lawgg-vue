<template>
  <div class="content">


    <!-- 타이틀 -->
    <Title :page="0"/>

    <!-- 상세내용 -->
    <position-content :item.sync="board" :id.sync="id" @recommendBoard="recommendBoard" @reportBoard="reportBoard" @deleteBoard="deleteBoard"/>

    <!-- 베너 -->
<!--    <Banner/>-->

    <!-- 댓글 -->
    <position-comment :comments.sync="comments" :boardId.sync="board.boardId" :rootId.sync="board.boardCommentId" @findComments="findComments"/>

    <report-modal @report="report"/>

  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import service from "@/http/service";
import FindAnonymousDetailBoardRequestDto from "@/dto/board/request/board/FindAnonymousDetailBoardRequestDto";
import findUserDetailBoardRequestDto from "@/dto/board/request/board/FindUserDetailBoardRequestDto";
import commonUtils from "@/utils/commonUtils";
import FindAnonymousAllCommentBoardRequestDto from "@/dto/board/request/comment/FindAnonymousAllCommentBoardRequestDto";
import FindUserAllCommentBoardRequestDto from "@/dto/board/request/comment/FindUserAllCommentBoardRequestDto";
import PositionComment from "@/components/position/view/PositionComment";
import RecommendBoardRequestDto from "@/dto/board/request/board/RecommendBoardRequestDto";
import ReportBoardRequestDto from "@/dto/board/request/board/ReportBoardRequestDto";
import DeleteUserBoardRequestDto from "@/dto/board/request/board/DeleteUserBoardRequestDto";
import userHelper from "@/store/modules/user/helper";
// import Banner from "@/components/common/Banner";
import PositionContent from "@/components/position/view/PositionContent";
import Title from "@/components/common/Title";
import commonCont from "@/constants/commonCont";
import ReportModal from "@/components/common/ReportModal";

export default {
  name: "PositionView",
  components: {ReportModal, Title, PositionContent, PositionComment},
  data() {
    return {
      id: 0,
      board: {},
      comments: []
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
  },
  activated() {
    this.id = this.$route.query.id
    this.findBoard() // 게시글 조회
  },
  deactivated() {
    this.clear()
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    findComments() { // 댓글 조회
      if (this.getIsLogin) this.searchCommentUser(this.id); // 게시판 로그인 댓글 조회
      else this.searchCommentAnonymous(this.id) // 게시판 비로그인 댓글 조회
    },
    findBoard() { // board 조회
      if (this.getIsLogin) this.searchUser(this.id) // 게시판 로그인 유저 조회
      else this.searchAnonymous(this.id) // 게시판 비로그인 유저 조회
    },
    async recommendBoard() { // 게시글 추천하기
      const param = new RecommendBoardRequestDto(this.id)
      const res = await service.recommendBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.board.recommendCount += 1 // 추천수 증가
        alert('추천 성공하였습니다.')
      }
    },
    async reportBoard() { // 게시글 신고하기
      this.$modal.show('reportModal')
    },
    async report(content) {
      const param = new ReportBoardRequestDto(this.id, content)
      const res = await service.reportBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        alert('신고 성공하였습니다.')
      }
    },
    async searchUser(id) { // 게시판 로그인 조회
      const param = new findUserDetailBoardRequestDto(id);
      const res = await service.findUserDetailBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.board = res.data.board
        this.findComments() // 댓글 조회
      } else {
        window.history.back()
      }
    },
    async searchAnonymous(id) { // 게시판 비로그인 조회
      const param = new FindAnonymousDetailBoardRequestDto(id)
      const res = await service.findAnonymousDetailBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.board = res.data.board
        this.findComments() // 댓글 조회
      } else {
        window.history.back()
      }
    },
    async searchCommentUser(id) { // 게시글 댓글 로그인 조회
      const param = new FindUserAllCommentBoardRequestDto(id)
      const res = await service.findUserAllCommentBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.comments = res.data.comments
      }
    },
    async searchCommentAnonymous(id) { // 게시글 댓글 비로그인 조회
      const param = new FindAnonymousAllCommentBoardRequestDto(id)
      const res = await service.findAnonymousAllCommentBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.comments = res.data.comments
      }
    },
    async deleteBoard() { // 유저 게시판 삭제
      const request = new DeleteUserBoardRequestDto(this.id, null)
      const res = await service.deleteUserBoard(request)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.updateBoardCount(-1)
        window.history.back()
        alert('게시판 삭제를 성공했습니다.')
      }
    },
    clear() {
      this.id = commonCont.EMPTY
      this.board = commonCont.EMPTY_OBJ
      this.comments = commonCont.EMPTY_ARR
    }
  }
};
</script>
