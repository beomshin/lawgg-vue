<template>
  <div class="content">

    <!-- 타이틀 -->
    <Title :page="1"/>

    <!-- 상세내용 -->
    <trial-content :trial.sync="trial" @reportTrial="reportTrial"/>

    <!-- 베너 -->
<!--    <Banner/>-->

    <!-- 댓글 -->
    <trial-comment :comments="comments" :trialId.sync="trial.trialId" :rootId.sync="trial.trialCommentId" @findComments="findComments"/>

    <report-modal @report="report"/>
  </div>
</template>

<script>
import TrialComment from "@/components/trial/view/TrialComment";
import TrialContent from "@/components/trial/view/TrialContent";
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import service from "@/http/service";
import FindUserDetailTrialRequestDto from "@/dto/trial/request/trial/FindUserDetailTrialRequestDto";
import commonUtils from "@/utils/commonUtils";
import FindAnonymousDetailTrialRequestDto from "@/dto/trial/request/trial/FindAnonymousDetailTrialRequestDto";
import FindAnonymousAllCommentTrial from "@/dto/trial/request/comment/FindAnonymousAllCommentTrial";
import FindUserAllCommentTrial from "@/dto/trial/request/comment/FindUserAllCommentTrial";
// import Banner from "@/components/common/Banner";
import Title from "@/components/common/Title";
import commonCont from "@/constants/commonCont";
import ReportTrialRequestDto from "@/dto/trial/request/trial/ReportTrialRequestDto";
import ReportModal from "@/components/common/ReportModal";
export default {
  name: "TrialView",
  components: {ReportModal, Title, TrialContent, TrialComment},
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
  },
  data() {
    return {
      id: 0,
      trial: {},
      comments: []
    }
  },
  async activated() {
    this.id = this.$route.query.id
    this.searchTrial()
  },
  deactivated() {
    this.clear()
  },
  methods: {
    searchTrial() {
      if (!this.getIsLogin) this.searchTrialAnonymous()
      else this.searchTrialUser()
    },
    findComments() {
      if (!this.getIsLogin) this.searchCommentAnonymous()
      else this.searchCommentUser()
    },
    async searchCommentUser() { // 트라이얼 유저 댓글 조회
      const param = new FindUserAllCommentTrial(this.id)
      const res = await service.findUserAllCommentTrial(param)
      if(commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.comments = res.data.comments
      }
    },
    async searchCommentAnonymous() { // 익명 유저 댓글 조회
      const param = new FindAnonymousAllCommentTrial(this.id)
      const res = await service.findAnonymousAllCommentTrial(param)
      if(commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.comments = res.data.comments
      }
    },
    async searchTrialUser() { // 트라이얼 유저 조회
      const param = new FindUserDetailTrialRequestDto(this.id)
      const res = await service.findUserDetailTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.trial = res.data.trial
        await this.searchCommentUser()
      } else {
        window.history.back()
      }
    },
    async searchTrialAnonymous() { // 트라이얼 익명 조회
      const param =new FindAnonymousDetailTrialRequestDto(this.id)
      const res = await service.findAnonymousDetailTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.trial = res.data.trial
        await this.searchCommentAnonymous()
      } else {
        window.history.back()
      }
    },
    async reportTrial() {
      this.$modal.show('reportModal')
    },
    async report(content) {
      const param = new ReportTrialRequestDto(this.trial.trialId, content)
      const res = await service.reportTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        alert('신고 성공하였습니다.')
      }
    },
    clear() {
      this.id = commonCont.ZERO
      this.trial = commonCont.EMPTY_OBJ
    }
  }
};
</script>
