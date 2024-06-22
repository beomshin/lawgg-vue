<template>
  <li :class="{'bc-cmt' : comment.depth == 2}" >
    <dl>
      <dt>
        <dl>
          <template v-if="getProfile">
            <dt><span><img :src="getProfile" width="100%" alt="" title="" /></span></dt>
          </template>
          <dd>
            <h2>{{comment.writer}} (#{{comment.boardCommentId}})</h2>
            <p v-html="commentContent">
            </p>
            <p>
              <i class="uit uit-clock"></i> {{comment.regDt}}
            </p>
          </dd>
        </dl>
      </dt>
      <dd>
        <a class="btn-line-gray-s" v-if="isNormal" @click="openSubComment">답글</a>&nbsp;
        <a v-if="isNormal && canUse" @click="openDeleteComment" class="btn-line-gray-s">삭제</a> &nbsp;
      </dd>
    </dl>

    <template v-if="no == index && type == 1">
      <div class="bc-cmt-add-account bc-cmt-delete" v-if="!isLogin">
        <input type="password" name="" title="" value="" placeholder="비밀번호를 입력하세요." maxlength="12" class="input-box w200" v-model="password">
        <dd @click="deleteAnonymousComment" ><a >확인</a></dd>
      </div>
    </template>

    <template v-if="no == index && type == 0">
      <div class="bc-cmt-add-account" v-if="!isLogin">
        <input type="text" name="" title="" value="" placeholder="아이디를 입력하세요." class="input-box w200" maxlength="20" v-model="loginId"/>
        &nbsp;
        <input type="password" name="" title="" value="" placeholder="비밀번호를 입력하세요." class="input-box w200" maxlength="12" v-model="password"/>
      </div>
      <dl class="bc-cmt-add-text">
        <dt >
          <textarea cols="" rows="" placeholder="댓글을 입력해주세요." class="w100p h30" maxlength="100" v-model="content"></textarea>
        </dt>
        <dd @click="enrollComment"><a>댓글등록</a></dd>
      </dl>
    </template>

  </li>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";

export default {
  name: "PositionCommentCard",
  props: ['comment', 'index', 'no', 'type'],
  data() {
    return {
      defaultImage: 'https://i.pinimg.com/564x/6f/15/91/6f1591450f3e75ce481c2e15d95adfce.jpg',
      loginId: '',
      content: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    isNormal() {
      return this.comment.status == 1
    },
    commentContent() {
      return this.isNormal ? this.comment.content : '삭제된 메세지입니다.'
    },
    getProfile() {
      // return this.comment.profile ? this.comment.profile : this.defaultImage
      return this.comment.profile ? this.comment.profile : null
    },
    canUse() { // 수정, 삭제 가능 여부 체크
      if (this.isLogin && this.comment.created == 1) return true // 회원 게시글 && 생성 유저
      else if (!this.isLogin && this.comment.anonymous == 1) return true // 비회원 게시글  && 비회원
      return false
    },
    isLogin() {
      return this.getIsLogin
    },
  },
  methods: {
    openSubComment() {
      this.loginId = commonCont.EMPTY
      this.password = commonCont.EMPTY
      this.content = commonCont.EMPTY
      this.$emit('openComment', {no: this.index, type: 0})
    },
    openDeleteComment() {
      if (this.isLogin) {
        let result = confirm('댓글을 삭제하시겠습니까?')
        if (!result) return;
        this.$emit('deleteUserComment', this.comment.boardCommentId)
      } else {
        this.password = commonCont.EMPTY
        this.$emit('openComment', {no: this.index, type: 1})
      }
    },
    deleteAnonymousComment() {
      let result = confirm('댓글을 삭제하시겠습니까?')
      if (!result) return;
      this.$emit('deleteAnonymousComment', {
        id: this.comment.boardCommentId,
        password: this.password
      })
    },
    enrollComment() {
      if (!verifyUtils.comment(this.isLogin, this.loginId, this.password, this.content)) return
      this.$emit('enrollComment', {
        loginId: this.loginId,
        password: this.password,
        content: `└(#${this.comment.boardCommentId}) ` + this.content,
        parentId: this.comment.depth == 1 ? this.comment.boardCommentId : this.comment.parentId,
        depth: 2,
        boardCommentId: this.comment.boardCommentId
      })
    },
  }
}
</script>

<style scoped>

</style>
