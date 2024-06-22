<template>
  <div class="content">


    <!-- 회원관련 - 타이틀 -->
    <member-title :page="2"/>
    <!-- 회원관련 - 타이틀 끝 -->

    <!-- 가입완료 -->
    <div class="join-end">
      <div>
        <h2>로우지지 홈페이지에 가입하신 것을 축하드립니다.</h2>
        <h3>
          회원가입을 축하드립니다.<br />
          다양한 정보와 푸짐한 혜택으로 보답하겠습니다.
        </h3>
        <div>
          <a class="btn-default-a bg-pink w250" @click="go('/login')">로그인 페이지로 이동</a>
          &nbsp;
          <a class="btn-default-a bg-black w250" @click="go('/')">메인 페이지로 이동</a>
        </div>
      </div>
    </div>
    <!-- 가입완료 끝 -->


  </div>
</template>

<script>
import MemberTitle from "@/components/member/join/MemberTitle";
export default {
  name: "MemberJoinEnd",
  components: {MemberTitle},
  methods: {
    go(url) {
      this.$router.push(url)
    }
  }
};
</script>
