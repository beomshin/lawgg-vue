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
import service from "../../http/service";
// import Banner from "@/components/common/Banner";
// import service from "@/http/service";


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
  created() {
    service.main().then(res => {
      console.log(res.data)
      this.initMainPage(res.data)
    })
  },
  methods: {
    initMainPage(data) {
      if (!data) {
        alert('메인 페이지 로딩에 실패하였습니다. 잠시후 다시 시도해주세요.')
        return
      }

      this.trials = data.trials // 트라이얼 리스트
      data.boards.forEach(e => {
        switch (e.lineType) {
          case 0: this.top.push(e); break;// 탑
          case 1: this.jungle.push(e); break; // 정글
          case 2: this.mid.push(e); break; // 미드
          case 3: this.bot.push(e); break; // 원딜
          case 4: this.spt.push(e); break; // 서폿
        }
      })
      this.hot = data.hotTrial
    }
  }
};
</script>
