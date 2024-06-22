<template>
  <div class="mypage-info-modify" >
    <dl>
      <dt>본인인증 <span>*</span></dt>
      <template v-if="getAuthFlag == 0" >
        <dd><button class="btn-default-a bg-black" @click="callAuth">본인인증</button></dd>
        <h3 style="padding: 3px; margin-left: 10px;"><i class="uil uil-exclamation-triangle color-pink"></i> 19세 이상만 본인인증이 가능합니다.</h3>
      </template>
      <template v-if="getAuthFlag == 1">
        <dd>인증완료</dd>
      </template>
    </dl>
    <dl>
      <dt>아이디 <span>*</span></dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" :value="getLoginId" disabled/></dd>
    </dl>
    <dl>
      <dt>내 로펌 <span>*</span></dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" :value="getLawFirmName" disabled /></dd>
    </dl>
    <dl>
      <dt>내포인트 <span>*</span></dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" :value="getPoint" disabled/></dd>
    </dl>
    <dl>
      <dt>이름 </dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" :value="getName" disabled/></dd>
    </dl>
    <dl>
      <dt>성별 </dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" :value="getGender" disabled/></dd>
    </dl>
    <dl>
      <dt>생년월일 </dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" :value="getBirth" disabled /></dd>
    </dl>
    <dl>
      <dt>비밀번호 <span>*</span></dt>
      <dd><input name="" type="password" class="input-box w100p" placeholder="변경할 비밀번호를 입력해주세요." maxlength="12" v-model="newPassword"/></dd>
      <h3 style="padding: 3px; margin-left: 10px; padding: 3px;"><i class="uil uil-exclamation-triangle color-pink"></i> 8~12자의 영문/숫자/특수문자 입력</h3>
    </dl>
    <dl>
      <dt>비밀번호 확인 <span>*</span></dt>
      <dd><input name="" type="password" class="input-box w100p" placeholder="변경할 비밀번호를 입력해주세요." maxlength="12" v-model="reNewPassword"/></dd>
      <h3 v-if="newPassword != reNewPassword" style="color: red; padding: 3px; margin-left: 10px;"> 비밀번호가 일치하지않습니다.</h3>
    </dl>
    <dl>
      <dt>닉네임 <span>*</span></dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="변경할 닉네임을 입력해주세요." v-model="nickName" maxlength="12"/></dd>
      <h3 style="padding: 3px; margin-left: 10px;"><i class="uil uil-exclamation-triangle color-pink"></i> 2~12자의 영문/숫자/한글/특수문자 입력</h3>
    </dl>
    <dl>
      <dt>이메일 </dt>
      <dd><input name="" type="text" class="input-box w100p" placeholder="" maxlength="64" v-model="email"/></dd>
      <h3 style="padding: 3px; margin-left: 10px; padding: 3px;"><i class="uil uil-exclamation-triangle color-pink"></i> @ 문자 포함하여 입력</h3>
    </dl>
    <div>
      <a @click="update" class="btn-default-b bg-pink w49p">정보수정</a>
      &nbsp;
      <a  @click="go('/')" class="btn-default-b bg-black w49p">취소</a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import service from "@/http/service";
import UpdateInfoUserRequestDto from "@/dto/user/request/UpdateInfoUserRequestDto";
import commonUtils from "@/utils/commonUtils";
import verifyUtils from "@/utils/verifyUtils";
import userHelper from "@/store/modules/user/helper";
import commonCont from "@/constants/commonCont";

export default {
  name: "MyPageInfoModify",
  data() {
    return {
      nickName: '',
      newPassword: '',
      reNewPassword: '',
      email: ''
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    getLoginId() {
      let snsType = this.getUserInfo?.snsType || '0'
      if (snsType == '0') return this.getUserInfo?.loginId || ''
      else return 'SNS계정'
    },
    getLawFirmName() {
      return this.getUserInfo?.lawFirmName || '미가입'
    },
    getEmail() {
      return this.getUserInfo?.email || ''
    },
    getAuthFlag() {
      return this.getUserInfo?.authFlag
    },
    getNickName() {
      return this.getUserInfo?.nickName
    },
    getGender() {
      return this.getUserInfo?.gender || '미인증'
    },
    getName() {
      return this.getUserInfo?.name || '미인증'
    },
    getBirth() {
      return this.getUserInfo?.birth || '미인증'
    },
    getPoint() {
      return this.getUserInfo?.point
    }
  },
  mounted() {
    this.nickName = this.getNickName
    this.email = this.getEmail
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    go(url) {
      if (this.$route.path == url) return
      this.$router.push(url)
    },
    async update() {
      if (!verifyUtils.modifyUser(this.newPassword, this.reNewPassword, this.nickName, this.email)) return
      let result = confirm('내 정보를 수정하시겠습니까?')
      if (!result) return;

      const param = new UpdateInfoUserRequestDto(this.nickName, this.newPassword, this.email);
      const res = await service.updateInfoUser(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.updateUserInfo()
        alert('유저 정보 변경에 성공했습니다.')
      }
    },
    updateUserInfo() {
      this.updateUserNickName(this.nickName)
      this.updateUserEmail(this.email)
      this.newPassword = commonCont.EMPTY
      this.reNewPassword = commonCont.EMPTY
    },
    callAuth() {
      let IMP = window.IMP;
      const _this = this
      IMP.init("imp41351603");
      IMP.certification({ // param
        m_redirect_url : "/my/info",
        popup : false,
        min_age: 19
      }, function (rsp) { // callback
        if (rsp.success) {
          service.authCertifications(rsp)
              .then(res => {
                if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
                  _this.updateUserAuthFlag(1)
                  alert('본인 인증을 성공하였습니다.')
                } else {
                  alert('본인 인증을 실패하였습니다.')
                }
              })
              .catch((err) => {
                console.log(err)
                alert('본인 인증을 실패하였습니다.')
              })
        } else {
          alert('본인 인증을 실패하였습니다.')
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
