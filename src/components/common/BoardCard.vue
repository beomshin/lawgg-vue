<template>
  <ul class="bl-default">
    <li>
      <Label :postType="item.postType"/>
      <template v-if="isNormalBoard(item.postType)">
        {{id}}
      </template>
    </li>
    <li style="cursor: pointer" @click="goDetail">
      <Label :postType="item.postType"/>
      <template v-if="item.profile">
        <em><img :src="item.profile" width="100%" height="100%" alt="" title="" /></em>
      </template>
      <a >{{item.title}}</a>
      <i class="uil uil-comment-lines"></i> <span>({{item.commentCount}})</span>
      <img v-if="isWithTime(item.writeDt)" src="../../assets/images/icn_new02.png" height="17" alt="" title="" />
    </li>
    <li><font>작성자 : </font> {{truncateString(item.writer,6)}}</li>
    <li><font>작성일 : </font> {{formatDate(item.writeDt)}}</li>
    <li><font>추천 : </font> {{item.recommendCount}}</li>
    <li><font>조회 : </font> {{item.view}}</li>
  </ul>
</template>

<script>
import commonUtils from "@/utils/commonUtils";
import Label from "@/components/common/Label";

export default {
  name: "BoardCard",
  components: {Label},
  props: ['item', 'id'],
  data() {
    return {
      N_Image: '../../assets/images/icn_new02.png',
      defaultImage: 'https://i.pinimg.com/564x/87/d6/80/87d68022d2bbae70b4601a5dbde3860d.jpg'
    }
  },
  methods: {
    formatDate(dateStr) {
      return commonUtils.formatDate(dateStr); // 오늘 일자는 시간, 이전은 날짜 처리
    },
    isWithTime(dateString) {
      return commonUtils.isWithTime(dateString, 60 * 60 * 1000); // 한시간 이내
    },
    isNormalBoard(postType) {
      return postType == 0 || postType == 1
    },
    goDetail() {
      this.$emit('goDetail')
    },
    truncateString(string, maxLength) {
      if (string.length <= maxLength) {
        return string;
      } else {
        return string.substring(0, maxLength) + "...";
      }
    }
  }
}
</script>

<style scoped>

</style>
