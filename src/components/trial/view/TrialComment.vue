<template>
  <div class="board-comment">
    <h2><i class="uil uil-comment-message"></i> 총 댓글 <span>{{comments.length}}</span>개</h2>
    <dl>
      <dt>
        <textarea cols="" rows="" class="w100p h100" v-model="content"></textarea>
      </dt>
      <dd @click="enrollComment(rootId, 1)"><a>댓글등록</a></dd>
    </dl>
    <ul >
      <template v-for="(comment, index) in comments">
        <trial-comment-card
            :key="index"
            :comment="comment"
            :index="index"
            :no.sync="no"
            @openComment="openComment"
            @deleteComment="deleteComment"
            @enrollSubComment="enrollSubComment"
        />
      </template>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import EnrollCommentTrialRequestDto from "@/dto/trial/request/comment/EnrollCommentTrialRequestDto";
import DeleteCommentTrialRequestDto from "@/dto/trial/request/comment/DeleteCommentTrialRequestDto";
import TrialCommentCard from "@/components/trial/view/TrialCommentCard";
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";

export default {
  name: "TrialComment",
  components: {TrialCommentCard},
  props: ['comments', 'trialId', 'rootId'],
  data() {
    return {
      content: '',
      defaultImage: 'https://i.pinimg.com/564x/6f/15/91/6f1591450f3e75ce481c2e15d95adfce.jpg',
      no: -1
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    isLogin() {
      return this.getIsLogin
    },
  },
  deactivated() {
    this.clear()
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    enrollComment(parentId, depth) {
      if (!verifyUtils.comment2(this.isLogin, this.content)) return
      this.enrollCommentUser(parentId, this.content, depth, null)
    },
    enrollSubComment(args) {
      this.enrollCommentUser(args.parentId, args.content, args.depth, args.trialCommentId)
    },
    async enrollCommentUser(parentId, content, depth, trialCommentId) {
      const param = new EnrollCommentTrialRequestDto(this.trialId, parentId, content, this.emoticon, depth, trialCommentId);
      const res = await service.enrollCommentTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.clear()
        this.updateCommentCount(1)
        this.$emit('findComments')
      }
    },
    async deleteComment(id) {
        const param = new DeleteCommentTrialRequestDto(id, null)
        const res = await service.deleteCommentTrial(param)
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          this.updateCommentCount(-1)
          this.$emit('findComments')
        }
    },
    openComment(no) {
      this.no = no == this.no ? commonCont.DISABLE : no
    },
    clear() {
      this.content = commonCont.EMPTY
      this.no = commonCont.DISABLE
    }
  }
}
</script>

<style scoped>

</style>
