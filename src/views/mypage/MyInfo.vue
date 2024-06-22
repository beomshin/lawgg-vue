<template>
  <div class="content">
    <dl class="mypage-layout">
      <my-page-header/>
      <dd>
        <!-- 마이페이지 - 타이틀 -->
        <div class="mypage-title">
          <h2>개인정보수정</h2>
          <h3>로우지지 회원가입시 다양한 혜택과 서비스를 이용하실 수 있습니다.</h3>
        </div>
        <!-- 마이페이지 - 타이틀 끝 -->

        <my-page-info-password v-if="getSnsType == 0 && !authFlag" @successAuth="successAuth"/>

        <!-- 개인정보수정 -->
        <my-page-info-modify v-if="getSnsType != 0 || authFlag"/>
        <!-- 개인정보수정 끝 -->
      </dd>
    </dl>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import MyPageHeader from "@/components/mypage/common/MyPageHeader";
import MyPageInfoPassword from "@/components/mypage/myinfo/MyPageInfoPassword";
import MyPageInfoModify from "@/components/mypage/myinfo/MyPageInfoModify";


export default {
  name: "MypageMyInfo",
  components: {MyPageInfoModify, MyPageInfoPassword, MyPageHeader},
  data() {
    return {
      authFlag: false
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    getSnsType() {
      return this.getUserInfo?.snsType || '0'
    }
  },
  activated() {
    if (!this.getIsLogin) {
      alert('로그인 해주세요.')
      this.$router.replace('/login')
      return
    }
  },
  deactivated() {
    this.clear()
  },
  methods: {
    ...mapMutations(commonHelper.name, commonHelper.mutations),
    ...mapMutations(userHelper.name, userHelper.mutations),
    successAuth() {
      this.authFlag = true
    },
    clear() {
      this.authFlag = false
    }
  }
};
</script>
