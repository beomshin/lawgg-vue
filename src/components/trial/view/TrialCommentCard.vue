<template>
  <li :class="{'bc-cmt' : comment.depth == 2}">
    <dl>
      <dt>
        <dl>
          <dt><span><img :src="getProfile(comment.profile)" width="100%" alt="" title="" /></span></dt>
          <dd>
            <h2>{{comment.writer}} (#{{comment.trialCommentId}})</h2>
            <p>
              {{commentContent}}
            </p>
            <p>
              <i class="uit uit-clock"></i> {{comment.regDt}}
            </p>
          </dd>
        </dl>
      </dt>
      <dd>
        <a v-if="isNormal && isLogin"  @click="openComment" class="btn-line-gray-s">답글</a>&nbsp;
        <a v-if="isNormal && canUse" @click="deleteComment" class="btn-line-gray-s">삭제</a> &nbsp;
      </dd>
    </dl>
    <template v-if="no == index">
      <dl class="bc-cmt-add-text">
        <dt >
          <textarea cols="" rows="" placeholder="댓글을 입력해주세요." class="w100p h30" maxlength="100" v-model="content">></textarea>
        </dt>
        <dd @click="enrollSubComment"><a>댓글등록</a></dd>
      </dl>
    </template>
  </li>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import commonCont from "@/constants/commonCont";
import verifyUtils from "@/utils/verifyUtils";

export default {
  name: "TrialCommentCard",
  props: ['comment', 'index', 'no'],
  data() {
    return {
      defaultImage: 'https://i.pinimg.com/564x/6f/15/91/6f1591450f3e75ce481c2e15d95adfce.jpg',
      content: '',
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
    isLogin() {
      return this.getIsLogin
    },
    canUse() { // 수정, 삭제 가능 여부 체크
      if (this.isLogin && this.comment.created == 1) return true // 회원 게시글 && 생성 유저
      else if (!this.isLogin && this.comment.anonymous == 1) return true // 비회원 게시글  && 비회원
      return false
    },
  },
  methods: {
    getProfile(profile) {
      return profile ? profile : this.defaultImage
    },
    openComment() {
      this.content = commonCont.EMPTY
      this.$emit('openComment', this.index)
    },
    deleteComment() {
      if (this.isLogin) {
        let result = confirm('댓글을 삭제하시겠습니까?')
        if (!result) return;
        this.$emit('deleteComment', this.comment.trialCommentId)
      }
    },
    enrollSubComment() {
      if (!verifyUtils.comment2(this.isLogin, this.content)) return
      this.$emit('enrollSubComment', {
        content: `└(#${this.comment.trialCommentId}) ` + this.content,
        parentId: this.comment.depth == 1 ? this.comment.trialCommentId : this.comment.parentId,
        depth: 2,
        trialCommentId: this.comment.trialCommentId
      })
    }
  }

}
</script>

<style scoped>

</style>
