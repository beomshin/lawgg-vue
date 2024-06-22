<template>
  <div class="board-view">
    <dl class="bv-header">
      <dt>
        <h2>{{item.title}}</h2>
        <div>
          <i class="uit uit-user"></i> 작성자 : {{item.writer}} <span v-if="item.writerType == 0">&nbsp; ({{item.ip}})</span>
          &nbsp; · &nbsp;
          <i class="uit uit-clock"></i> {{item.writeDt}}
          &nbsp; · &nbsp;
          <i class="uit uit-eye"></i> 조회수 : {{item.view}}
          &nbsp; · &nbsp;
          <i class="uit uit-heart-sign"></i> 추천 : {{item.recommendCount}}
        </div>
      </dt>
      <dd>
        <button @click="recommendBoard" class="btn-default-s bg-pink"><i class="uit uit-thumbs-up"></i> 추천하기</button>
        &nbsp;
        <button @click="reportBoard" class="btn-default-s bg-black"><i class="uit uit-megaphone"></i> 신고하기</button>
      </dd>
    </dl>
    <div class="bv-content">
      <p v-html="adjustMediaSize(content)" />
    </div>
    <dl class="bv-btn">
      <dt>
        <a v-if="canUse && !isHotBoard" @click="editBoard" class="btn-default-m bg-black">수정</a>
        &nbsp;
        <a v-if="canUse" @click="deleteBoard" class="btn-default-m bg-black">삭제</a>
      </dt>
      <dd>
        <a @click="back" class="btn-default-m bg-black">뒤로가기</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";

export default {
  name: "PositionContent",
  props: ['item', 'id'],
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    isNotice() { // 공지, 이벤트 게시판
      return this.item.postType == 99 || this.item.postType == 98
    },
    isHotBoard() { // 핫 게시판
      return this.item.postType == 2 || this.item.postType == 3
    },
    isCanUser() {
      return !this.isNotice && this.getIsLogin && this.item.created == 1 // 공지 x, 핫게시판 x, 로그인 o, 글쓴이 o
    },
    isCanAnonymous() {
      return !this.isNotice && !this.getIsLogin && this.item.writerType == 0 // 공지 x , 로그인 x, 비회원 글 o
    },
    canUse() { // 수정, 삭제 가능 여부 체크
      if (this.isCanUser || this.isCanAnonymous) return true
      else return false
    },
    content() {
      if (!this.item.content) return
      return this.item.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  },
  methods: {
    recommendBoard() {
      if (!this.getIsLogin) { this.goLogin(); return }
      this.$emit('recommendBoard')
    },
    reportBoard() {
      this.$emit('reportBoard')
    },
    editBoard() {
      let query = { id: String(this.id), type: this.item.writerType}
      if (this.item.writerType  == 0){ // 비회원 게시글 수정
        this.$router.push({ path: 'edit', query: query})
      } else if (this.item.created  == 1) { // 회원 게시글 & 게시글 작성자 수정
        this.$router.push({ path: 'edit', query: query})
      }
    },
    deleteBoard() {
      let query = { id: String(this.id), type: this.item.writerType }
      if (this.item.writerType == 0) {
        this.$router.replace({ path: 'delete', query: query})
      } else if (this.item.created == 1) {
        if (this.isHotBoard) { // 베스트, 추천 게시글은 비밀번호 입력
          this.$router.replace({ path: 'delete', query: query})
        } else { // 일반 글은 바로 삭제
          let result = confirm('게시판을 삭제하시겠습니까?')
          if (!result) return;
          this.$emit('deleteBoard')
        }
      }
    },
    back() {
      window.history.back()
    },
    goLogin() {
      alert('로그인을 해주세요')
      this.$router.push('/login')
    },
    adjustMediaSize(content) {
      if (!content) return
      // 모바일 여부를 판단하는 로직
      const isMobile = window.innerWidth <= 767;

      if (content) {
        const adjustedContent = content.replace(/<iframe.*?<\/iframe>/g, (match) => {
          if (isMobile) {
            return match.replace(/width="(\d+)"/, 'width="100%"')
                .replace(/height="(\d+)"/, 'height="300px"');
          } else {
            return match;
          }
        });

        // 이미지 태그 크기 조정
        const imgAdjustedContent = adjustedContent.replace(/<img.*?>/g, (match) => {
          if (isMobile) {
            return match.replace(/style=".*?"/, 'style="width: 100%;"');
          } else {
            return match;
          }
        });

        return imgAdjustedContent;
      }
      // iframe 태그 크기 조정

      return content;
    }
  }
}
</script>

<style scoped>

</style>
