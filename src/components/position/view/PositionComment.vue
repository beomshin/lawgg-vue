<template>
  <div class="board-comment">
    <h2><i class="uil uil-comment-message"></i> 총 댓글 <span>{{comments.length}}</span>개</h2>
    <div v-if="!isLogin">
      <input type="text" name="" title="" value="" placeholder="아이디를 입력하세요." class="input-box w200" maxlength="20" v-model="loginId"/>
      &nbsp;
      <input type="password" name="" title="" value="" placeholder="비밀번호를 입력하세요." class="input-box w200" maxlength="12" v-model="password" />
    </div>
    <dl>
      <dt>
        <textarea cols="" rows="" class="w100p h100" placeholder="댓글을 입력하세요." v-model="content"></textarea>
      </dt>
      <dd @click="enroll(rootId, 1)"><a>댓글등록</a></dd>
    </dl>
    <ul >
      <template v-for="(comment, index) in comments">
        <position-comment-card
            :key="index"
            :comment="comment"
            :index="index"
            :no.sync="no"
            :type.sync="type"
            @deleteUserComment="deleteUserComment"
            @deleteAnonymousComment="deleteAnonymousComment"
            @enrollComment="enrollComment"
            @openComment="openComment"
        />
      </template>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import EnrollUserCommentBoardRequestDto from "@/dto/board/request/comment/EnrollUserCommentBoardRequestDto";
import EnrollAnonymousCommentBoardRequestDto from "@/dto/board/request/comment/EnrollAnonymousCommentBoardRequestDto";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import DeleteUserCommentBoardRequestDto from "@/dto/board/request/comment/DeleteUserCommentBoardRequestDto";
import deleteAnonymousCommentBoardRequestDto from "@/dto/board/request/comment/DeleteAnonymousCommentBoardRequestDto";
import PositionCommentCard from "@/components/position/view/PositionCommentCard";
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";

export default {
  name: "PositionComment",
  components: {PositionCommentCard},
  props: ['comments', 'boardId', 'rootId'],
  data() {
    return {
      loginId: '',
      password: '',
      content: '',
      emoticon: null,
      defaultImage: 'https://i.pinimg.com/564x/6f/15/91/6f1591450f3e75ce481c2e15d95adfce.jpg',
      no: -1,
      type: 0
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
    openComment(args) {
      if (this.type == args.type) {
        this.no = args.no == this.no ? commonCont.DISABLE : args.no
      } else {
        this.type = args.type
        this.no = args.no
      }
    },
    enroll(parentId, depth) {
      if (!verifyUtils.comment(this.isLogin, this.loginId, this.password, this.content)) return
      this.enrollComment({
        parentId: parentId,
        content: this.content,
        depth: depth,
        loginId: this.loginId,
        password: this.password
      })
    },
    enrollComment(args) {
      if(this.getIsLogin) this.enrollCommentUser(args.parentId, args.content, args.depth, args.boardCommentId)
      else this.enrollCommentAnonymous(args.parentId, args.loginId, args.password, args.content, args.depth, args.boardCommentId)
    },
    async enrollCommentUser(parentId, content, depth, boardCommentId) {
      const param = new EnrollUserCommentBoardRequestDto(this.boardId, parentId, content, this.emoticon, depth, boardCommentId);
      const res = await service.enrollUserCommentBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.clear()
        this.updateCommentCount(1)
        window.location.reload()
      }
    },
    async enrollCommentAnonymous(parentId, loginId, password, content, depth, boardCommentId) {
      const param = new EnrollAnonymousCommentBoardRequestDto(this.boardId, parentId, loginId, password, content, this.emoticon, depth, boardCommentId);
      const res = await service.enrollAnonymousCommentBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.clear()
        window.location.reload()
      }
    },
    async deleteAnonymousComment(args) {
      const param = new deleteAnonymousCommentBoardRequestDto(args.id, args.password);
      const res = await service.deleteAnonymousCommentBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.clearComment()
        alert('댓글을 삭제했습니다.')
        window.location.reload()
      }
    },
    async deleteUserComment(id) {
      const param = new DeleteUserCommentBoardRequestDto(id, null)
      const res = await service.deleteUserCommentBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.updateCommentCount(-1)
        alert('댓글을 삭제했습니다.')
        window.location.reload()
      }
    },
    clear() {
      this.loginId = commonCont.EMPTY
      this.password = commonCont.EMPTY
      this.content = commonCont.EMPTY
      this.no = commonCont.DISABLE
    },
    clearComment() {
      this.no = commonCont.DISABLE
    }
  }
}
</script>

<style scoped>

</style>
