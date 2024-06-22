<template>
  <div class="main-content">

    <!-- 비주얼 영역 -->
    <MainVisual :hot.sync="hot"/>
    <!-- 비주얼 영역 끝 -->

    <!-- 트라이얼 -->
    <MainTrial :trials.sync="trials"/>
    <!-- 트라이얼 끝 -->

    <!-- 포지션 게시판 -->
    <MainPosition :top.sync="top" :jungle.sync="jungle" :mid.sync="mid" :bot.sync="bot" :spt.sync="spt"/>
    <!-- 포지션 게시판 끝 -->

    <!-- 핫 이슈 -->
    <MainIssue/>
    <!-- 핫 이슈 끝 -->

    <!-- 베너 -->
<!--    <Banner/>-->
		<!-- 베너 끝 -->

  </div>
</template>

<script>
import MainVisual from "@/components/home/MainVisual";
import MainTrial from "@/components/home/MainTrial";
import MainPosition from "@/components/home/MainPosition";
import MainIssue from "@/components/home/MainIssue";
// import Banner from "@/components/common/Banner";
import service from "@/http/service";


export default {
  name: "Home",
  components: {
    // Banner,
    MainIssue,
    MainPosition,
    MainTrial,
    MainVisual,
  },
  data() {
    return {
      trials: [],
      top: [],
      jungle: [],
      mid: [],
      bot: [],
      spt: [],
      hot:{}
    }
  },
  mounted() {
    service.home().then(res => {
      this.trials = res.data.trials
      this.top = res.data.top
      this.jungle = res.data.jungle
      this.mid = res.data.mid
      this.bot = res.data.bot
      this.spt = res.data.spt
    })
    service.hot().then(res => {
      this.hot = res.data
    })
  }
};
</script>
