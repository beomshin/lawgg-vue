<template>
  <div class="content">


    <!-- 회원관련 - 타이틀 -->
    <member-title :page="1"/>
    <!-- 회원관련 - 타이틀 끝 -->

    <!-- 회원가입 -->
    <div class="join-input">
      <ul>
        <li>
          <div>
            <input type="text" name="" title="" placeholder="아이디" class="input-box w100p h60" v-model="loginId" maxlength="20" :disabled="confirmLoginId"/>
            <button class="btn-default-b bg-black" v-if="confirmLoginId" @click="resetId">변경하기</button>
            <button class="btn-default-b bg-black" @click="verifyId(loginId)" v-else-if="!confirmLoginId">중복확인</button>
          </div>
          <h3><i class="uil uil-exclamation-triangle color-pink"></i> 6~20자의 영문/숫자 입력</h3>
        </li>
        <li>
          <div><input type="password" name="" title="" placeholder="비밀번호" class="input-box w100p h60" v-model="password" maxlength="20"/></div>
          <h3><i class="uil uil-exclamation-triangle color-pink"></i> 8~12자의 영문/숫자/특수문자 입력</h3>
        </li>
        <li>
          <div><input type="password" name="" title="" placeholder="비밀번호 확인" class="input-box w100p h60" v-model="rePassword" maxlength="20"/></div>
          <h3 v-if="password != rePassword" style="color: red"> 비밀번호가 일치하지않습니다.</h3>
        </li>
        <li>
          <div>
            <input type="text" name="" title="" placeholder="닉네임" class="input-box w100p h60" v-model="nickName" maxlength="12" :disabled="confirmNickname"/>
            <button class="btn-default-b bg-black" v-if="confirmNickname" @click="resetNickname">변경하기</button>
            <button class="btn-default-b bg-black" @click="verifyNickname(nickName)" v-else-if="!confirmNickname">중복확인</button>
          </div>
          <h3><i class="uil uil-exclamation-triangle color-pink"></i> 2~12자의 영문/숫자/한글/특수문자 입력</h3>
        </li>
        <li>
          <h2>개인정보 유효기간</h2>
          <div class="mt15 mb15">
            <div class="radio-box">
              <input type="radio" name="pwRadio" id="pwRadio1" checked @click="setPersonalPeriod(99)"/>
              <label for="pwRadio1">탈퇴시까지</label>
            </div>
            <div class="radio-box pl30">
              <input type="radio" name="pwRadio" id="pwRadio2"  @click="setPersonalPeriod(1)"/>
              <label for="pwRadio2">1년</label>
            </div>
            <div class="radio-box pl30">
              <input type="radio" name="pwRadio" id="pwRadio3"  @click="setPersonalPeriod(3)"/>
              <label for="pwRadio3">3년</label>
            </div>
            <div class="radio-box pl30">
              <input type="radio" name="pwRadio" id="pwRadio4"  @click="setPersonalPeriod(5)"/>
              <label for="pwRadio4">5년</label>
            </div>
          </div>
          <h3><i class="uil uil-exclamation-triangle color-pink"></i> 개인정보 유효기간 경과 이후 파기 또는 분리저장, 관리합니다.</h3>
        </li>
      </ul>
      <div>
        <a class="btn-default-b bg-pink w49p" @click="register">회원가입</a>&nbsp;
        <a class="btn-default-b bg-black w49p" @click="back">취소</a>
      </div>
    </div>
    <!-- 회원가입 끝 -->


  </div>
</template>

<script>
import MemberTitle from "@/components/member/join/MemberTitle";
import CheckIdSignRequestDto from "@/dto/sign/request/CheckIdSignRequestDto";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import SignUserRequestDto from "@/dto/sign/request/SignUserRequestDto.js";
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";
import CheckNicknameRequestDto from "@/dto/sign/request/CheckNicknameRequestDto";

export default {
  name: "MemberJoinRegister",
  components: {MemberTitle},
  data() {
    return  {
      loginId: '',
      email: '',
      password: '',
      rePassword: '',
      nickName: '',
      code: '',
      personalPeriod: '99',
      confirmLoginId: false,
      confirmNickname: false,
      countDownContext: '',
      txId: '',
      verifyPhoneAuth: false,
      portOneInfo: null
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    setPersonalPeriod(period) {
      this.personalPeriod = period
    },
    resetId() {
      this.loginId = commonCont.EMPTY
      this.confirmLoginId = false
    },
    resetNickname() {
      this.nickName = commonCont.EMPTY
      this.confirmNickname = false
    },
    async verifyId(id) {
      if (!verifyUtils.id(id)) return
      const param = new CheckIdSignRequestDto(id)
      const res = await service.checkIdSign(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        alert('사용 가능한 아이디 입니다.')
        this.confirmLoginId = true
      }
    },
    async verifyNickname(nickName) {
      if (!verifyUtils.nickName(nickName)) return
      const param = new CheckNicknameRequestDto(nickName)
      const res = await service.checkNickname(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        alert('사용 가능한 닉네임 입니다.')
        this.confirmNickname = true
      }
    },
    async register() {
      if (!verifyUtils.register(this.confirmLoginId, this.confirmNickname, this.password, this.rePassword, this.nickName)) return
      const param = new SignUserRequestDto(this.loginId, this.password, this.nickName, this.personalPeriod)
      const res = await service.userSign(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        await this.$router.replace('/join/end')
      }
    },
  }
};
</script>
