<template>
  <div class="board-list w100p">
    <ol class="bl-board">
      <li>번호</li>
      <li>제목</li>
      <li>작성일</li>
      <li>추천</li>
      <li>조회</li>
    </ol>
    <template v-for="(item, index) in list">
      <ul class="bl-board" :key="index">
        <li>{{index + (page * pageNum) + 1}}.</li>
        <li style="cursor: pointer" @click="go(item.type, item.id)">
          <a><strong>{{isSubTitle(item.type)}}</strong>{{item.title}} <span style="color: #6993ff">{{isStatus(item.type, item.status)}}</span></a>
          <i class="uil uil-comment-lines"></i> <span>({{item.commentCount.toLocaleString()}})</span>
          <img v-if="isWithTime(item.writeDt)" src="../../../assets/images/icn_new02.png" height="17" alt="" title="" />
        </li>
        <li><font>작성일 : </font> {{formatDate(item.writeDt)}}</li>
        <li><font>추천 : </font> {{item.recommendCount.toLocaleString()}}</li>
        <li><font>조회 : </font> {{item.view.toLocaleString()}}</li>
      </ul>
    </template>
  </div>
</template>

<script>
import commonUtils from "@/utils/commonUtils";

export default {
  name: "MyBoardList",
  props: ['list', 'page', 'pageNum'],
  methods: {
    formatDate(dateStr) {
      return commonUtils.formatDate(dateStr);
    },
    isWithTime(dateString) {
      return commonUtils.isWithTime(dateString, 60 * 60 * 1000); // 한시간 이내
    },
    go(type, id) {
      this.$router.push({ path: type == 0 ? `position/view` : `trial/view`, query: { id: id } })
    },
    isSubTitle(type) {
      if (type == 0) {
        return "[포지션] ";
      } else {
        return "[트라이얼] ";
      }
    },
    isStatus(type, status) {
      if (type == 1 && status == 3) {
        return "(업로드 중)";
      } else if (type == 1 && status == 4) {
        return "(업로드 실패)";
      }
    }
  }
}
</script>

<style scoped>

</style>
