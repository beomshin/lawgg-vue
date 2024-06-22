<template>
  <div class="wrap">
    <Header/>
      <keep-alive>
        <component :is="this.$route.meta.title" />
      </keep-alive>
    <Footer/>
  </div>
</template>

<script>

import Header from "@/layout/common/Header";
import Footer from "@/layout/common/Footer";
import MypageMyInfo from '@/views/mypage/MyInfo'
import MypageMessage from '@/views/mypage/Message'
import MypageMyBoard from '@/views/mypage/MyBoard'
import MyPositionView from "@/views/position/View";
import MyPositionPasswordDelete from "@/views/position/Delete";
import MyPositionEdit from "@/views/position/Edit";
import MyTrialView from "@/views/trial/View";
import MyTrialDelete from "@/views/trial/Delete";
import MypageAlert from '@/views/mypage/Alert'


export default {
  name: "LayoutDefault",
  components: {
    Footer,
    Header,
    MypageMyInfo,
    MypageMessage,
    MypageMyBoard,
    MyPositionView,
    MyPositionPasswordDelete,
    MyPositionEdit,
    MyTrialView,
    MyTrialDelete,
    MypageAlert
  },
  activated() {
    alert('mounted')
  }
};
</script>
