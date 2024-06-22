<template>
  <div class="board-list w100p">
    <ol class="bl-message">
      <li>번호</li>
      <li>제목</li>
      <li>발신자</li>
      <li>작성일</li>
    </ol>
    <template v-for="(item, index) in messages">
      <ul class="bl-message" :key="index">
        <li>{{index + (page * pageNum) + 1}}.</li>
        <li style="cursor: pointer"  @click="showMessage(item.messageId, item.content, item.senderNickName, item.title)">
          <a>{{item.title}}</a>
          <img v-if="isWithTime(item.regDt)" src="../../../assets/images/icn_new02.png" height="17" alt="" title="" />
        </li>
        <li><font>발신자 : </font> {{item.senderNickName}}</li>
        <li><font>수신일 : </font> {{formatDate(item.regDt)}}</li>
      </ul>
    </template>
  </div>
</template>

<script>
import commonUtils from "@/utils/commonUtils";

export default {
  name: "MessageList",
  props: ['messages', 'page', 'pageNum'],
  methods: {
    formatDate(dateStr) {
      return commonUtils.formatDate(dateStr);
    },
    isWithTime(dateString) {
      return commonUtils.isWithTime(dateString, 60 * 60 * 1000); // 한시간 이내
    },
    showMessage(id, content, nickName, title) {
      this.$emit('showMessage', {id, content: content.replace(/(?:\r\n|\r|\n)/g, '<br />'), nickName, title})
      this.$modal.show('modalMessageView')
    }
  }
}
</script>

<style scoped>

</style>
