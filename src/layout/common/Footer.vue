<template>
  <div>
    <!-- 하단영역 -->
    <div class="footer">
      <dl>
        <dt>
          <p>
            <a style="cursor: pointer" @click="$modal.show('modalServiceInfo')">서비스소개</a>
            <a @click="$modal.show('modalTerms')" style="cursor: pointer">이용약관</a>
            <a @click="$modal.show('modalPersonalTerms')" style="cursor: pointer">개인정보처리방침</a>
          </p>
          <div>
<!--            로우지지 &nbsp; | &nbsp; 대표이사 : 조서우 &nbsp; | &nbsp; 고객센터 : 070-7954-9511 (평일 09:00~18:00 / 점심시간 12:00~13:00 / 주말 및 공휴일 휴무)<br />-->
<!--            사업자등록번호 : 763-10-02277 &nbsp; | &nbsp; 주소 : 경기도 김포시 율마로 438번길 51 &nbsp; | &nbsp; 이메일 : lawgg0511@naver.com<br />-->
            Copyright ⓒ Law GG. All rights reserved..
          </div>
        </dt>
        <dd>
<!--          <a href="#"><i class="uil uil-facebook"></i></a>-->
<!--          <a href="#"><i class="uil uil-instagram"></i></a>-->
<!--          <a href="#"><i class="uil uil-youtube"></i></a>-->
<!--          <a href="#"><i class="uil uil-twitter-alt"></i></a>-->
        </dd>
      </dl>
    </div>
    <!-- 하단영역 끝 -->
    <service-info-modal/>
    <member-term-modal/>
    <personal-term-modal/>
  </div>
</template>

<script>
import MemberTermModal from "@/components/member/join/MemberTermModal";
import PersonalTermModal from "@/components/common/PersonalTermModal";
import ServiceInfoModal from "@/components/common/ServiceInfoModal";
export default {
  name: "Footer",
  components: {ServiceInfoModal, PersonalTermModal, MemberTermModal},
};
</script>
