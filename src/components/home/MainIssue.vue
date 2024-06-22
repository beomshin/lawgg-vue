<template>
  <div class="main-issue">
    <dl>
      <dt>
        <img src="@/assets/images/main_issue_img.jpg" width="100%" alt="" title="" />
      </dt>
      <dd>
        <h2><span>HOT</span> ISSUE</h2>
        <h3>로우지지에서 리그오브레전드에 대한 핫이슈!를 소개합니다.</h3>
        <ul>
          <li @clkick="go" style="cursor: pointer"><a >패치 정보 페이지를 구성중입니다.</a></li>
<!--          <li @clkick="go"><a >게임플레이에 대한 단상 : 13.7</a> <img src="../../assets/images/icn_new02.png" height="17" alt="" title="" /></li>-->
<!--          <li @clkick="go"><a >리그오브레전드 13.1 패치 상점소식</a> <img src="../../assets/images/icn_new02.png" height="17" alt="" title="" /></li>-->
<!--          <li @clkick="go"><a >[라이엇 스토어] 2023 LCK SPRING 결승 진출전 & 결승전 라이엇 스토어 운영 안내</a> <img src="../../assets/images/icn_new02.png" height="17" alt="" title="" /></li>-->
<!--          <li @clkick="go"><a >13.7 전략적 팀 전투 패치 노트</a></li>-->
<!--          <li @clkick="go"><a >리그오브레전드 13.1 패치 상점소식</a></li>-->
        </ul>
<!--        <p><button class="btn-line-gray-m w100" @click="go">More <i class="uil uil-arrow-right"></i></button></p>-->
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "MainIssue",
  methods: {
    go() {
      this.$router.push('/normal')
    }
  }
}
</script>

<style scoped>

</style>
