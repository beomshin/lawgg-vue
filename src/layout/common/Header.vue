<template>
  <div>


    <!-- 상단영역 -->
    <div class="header">
      <dl>
        <dt>
          <!-- 로고/메뉴 -->
          <div class="header-logo-menu">
            <p>
              <i class="uit uit-bars"  style="cursor: pointer" v-on:click="headerSideOpenMobile"></i>
              <router-link to="/"><img src="../../assets/images/logo.svg" width="50" alt="" title="" /></router-link>
            </p>
            <ul>
              <li>
                <router-link to="/position">포지션게시판</router-link>
              </li>
              <li>
                <router-link to="/trial">트라이얼</router-link>
              </li>
              <li>
                <router-link to="/law-firm">로펌</router-link>
              </li>
<!--              <li>-->
<!--                <router-link to="/lck">LCK</router-link>-->
<!--              </li>-->
              <li>
                <router-link to="/normal">자유게시판</router-link>
              </li>
            </ul>
          </div>
          <!-- 로고/메뉴 끝 -->
        </dt>
        <dd>
          <!-- 검색창 -->
          <WebHeaderSearch @headerSearchKeyword="headerSearchKeyword" />
          <!-- 검색창 끝 -->


          <!-- 로그인 안했을 때 -->
          <!-- 로그인/회원가입 -->
          <LoginNon v-if="!getIsLogin"/>
          <!-- 로그인/회원가입 끝 -->
          <!-- 로그인 안했을 때 끝 -->


          <!-- 로그인 했을 때 -->
          <!-- 알림/내정보 -->
          <LoginSuccess
              v-else-if="getIsLogin"
              @openMessage="openMessage"
              @openMyinfo="openMyinfo"
          />
          <!-- 알림/내정보 끝 -->

          <!-- 모바일 - 좌측영역 -->
          <MobileDrawer
            @headerSideCloseMobile="headerSideCloseMobile"
            @headerSearchKeyword="headerSearchKeyword"
          />
          <div class="header-side-bg-mobile" id="headerSideBgMobile" v-on:click="headerSideCloseMobile">&nbsp;</div>
          <!-- 모바일 - 좌측영역 끝 -->
          <!-- 로그인 했을 때 끝 -->


          <!-- 알림 -->
          <DropDownAlarm
            :isOpenMessage.sync="isOpenMessage"
            @openMessage="openMessage"
          />
          <!-- 알림 끝 -->


          <!-- 내정보 -->
          <DropDwonMyInfo
            :isOpenMyinfo.sync="isOpenMyinfo"
            @openMyinfo="openMyinfo"
          />
          <!-- 내정보 끝 -->
        </dd>
      </dl>
    </div>
    <!-- 상단영역 끝 -->


    <!-- 하단 모바일 메뉴 -->
    <MobileFooter/>
    <!-- 하단 모바일 메뉴 끝 -->


  </div>
</template>

<script>
import LoginNon from "@/components/header/LoginNone";
import LoginSuccess from "@/components/header/LoginSuccess";
import {mapGetters} from 'vuex'
import MobileDrawer from "@/components/header/MobileDrawer";
import MobileFooter from "@/components/header/MobileFooter";
import DropDownAlarm from "@/components/header/DropDownAlarm";
import DropDwonMyInfo from "@/components/header/DropDwonMyInfo";
import commonHeadler from '@/store/modules/common/helper'
import WebHeaderSearch from "@/components/header/WebHeaderSearch";

export default {
  name: "Header",
  components: {WebHeaderSearch, DropDwonMyInfo, DropDownAlarm, MobileFooter, MobileDrawer, LoginSuccess, LoginNon},
  data() {
    return {
      keyword: '',
      isOpenMessage: false,
      isOpenMyinfo: false
    }
  },
  computed: {
    ...mapGetters(commonHeadler.name, commonHeadler.getters)
  },
  methods: {
    headerSideOpenMobile: function () {
      //document.getElementById("headerMobileSideMobile").style.display = "block";
      document.getElementById("headerSideMobile").style.left = "0";
      document.getElementById("headerSideBgMobile").style.display = "block";
      document.body.style.overflow = "hidden";
    },
    headerSideCloseMobile: function () {
      //document.getElementById("headerMobileSideMobile").style.display = "none";
      document.getElementById("headerSideMobile").style.left = "-305px";
      document.getElementById("headerSideBgMobile").style.display = "none";
      document.body.style.overflow = "visible";
    },
    headerSearchKeyword(keyword) {
      this.$router.push(`/trial?keyword=${keyword}`)
    },
    openMessage() {
      this.isOpenMessage = !this.isOpenMessage
    },
    openMyinfo() {
      this.isOpenMyinfo = !this.isOpenMyinfo
    },
  },
};
</script>
