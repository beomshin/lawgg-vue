<template>
  <div class="member-title">
    <h2>회원가입</h2>
    <h3>로우지지 회원가입시 다양한 혜택과 서비스를 이용하실 수 있습니다.</h3>
    <div>
      <p></p>
      <ul>
        <li :class="{'active' : page == 0}">
          <p><i class="uil uil-check"></i></p>
          <div>약관동의</div>
        </li>
        <li :class="{'active' : page == 1}">
          <p><i class="uil uil-check"></i></p>
          <div>정보입력</div>
        </li>
        <li :class="{'active' : page == 2}">
          <p><i class="uil uil-check"></i></p>
          <div>가입완료</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberTitle",
  props: ['page']
}
</script>

<style scoped>

</style>