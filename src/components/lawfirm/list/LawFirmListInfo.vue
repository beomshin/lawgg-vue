<template>
  <div class="lawfirm-info" :style="{'background' : `url(${lawFirm.background ? lawFirm.background : require('../../../assets/images/lawfirm_info_bg.png')}) center no-repeat`, 'background-size' : 'cover',}">
    <dl>
      <dt>
        <ul>
          <li>
            <h2>{{lawFirm.trialTotalCount}}</h2>
            <h3>참여 재판 수</h3>
          </li>
          <li>
            <h2>{{lawFirm.trialCount}}</h2>
            <h3>누적 요청</h3>
          </li>
          <li>
            <h2>{{lawFirm.winRate}}%</h2>
            <h3>선고율</h3>
          </li>
        </ul>
      </dt>
      <dd>
        <div :style="{'background' : `url(${lawFirm.profile ? lawFirm.profile : defaultImage})`, 'background-size' : 'cover'}">
          <span></span>
        </div>
        <h2>
          {{lawFirm.name}}({{lawFirm.repName}})
        </h2>
        <h3>{{lawFirm.introduction}}</h3>
      </dd>
      <dt>
        <template v-if="isLogin"> <!-- 로그인 여부 -->
          <template v-if="lawFirm.isMyLawFirmFlag == 0"> <!-- 내 로펌 여부 -->
            <template v-if="lawFirm.isSignLawFirmFlag == 0"> <!-- 다른 로펌 가입여부 -->
              <!-- 로펌 지원 여부 -->
              <a class="btn-default-a bg-red w120" v-if="lawFirm.applyFlag == 0" @click="$modal.show('applyLawFirm')"><i class="uil uil-user-circle"></i> 가입하기</a>
              <a class="btn-default-a bg-teal w120" v-if="lawFirm.applyFlag == 1" @click="cancel"><i class="uil uil-user-square"></i> 취소하기</a>
            </template>
            <template v-else-if="lawFirm.isSignLawFirmFlag == 1">
              <a class="btn-default-a bg-teal w120" @click="goMyLawfirm(lawFirm.myLawFirmId)" ><i class="uil uil-user-square"></i>내로펌가기</a>
            </template>
          </template>
          <template v-else-if="lawFirm.isMyLawFirmFlag == 1">
            <a class="btn-default-a bg-red w120" @click="quit" ><i class="uil uil-user-square"></i> 탈퇴하기</a>
          </template>
        </template>
        <template v-else>
          <a class="btn-default-a bg-pink w120" @click="noticeLogin"><i class="uil uil-user-circle"></i> 가입하기</a>
        </template>
        </dt>
    </dl>

    <law-firm-apply-modal :rep-name.sync="lawFirm.repName" :id.sync="id" @successApplyLawFirm="successApplyLawFirm"/>
  </div>
</template>

<script>
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import FindAnonymousLawFirmDetail from "@/dto/lawFirm/request/FindAnonymousLawFirmDetail";
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import FindUserLawFirmDetail from "@/dto/lawFirm/request/FindUserLawFirmDetail";
import LawFirmApplyModal from "@/components/lawfirm/list/LawFirmApplyModal";
import QuitLawFirmRequestDto from "@/dto/lawFirm/request/QuitLawFirmRequestDto";
import UserCancelLawFirmRequestDto from "@/dto/lawFirm/request/UserCancelLawFirmRequestDto";


export default {
  name: "LawFirmListInfo",
  components: {LawFirmApplyModal},
  data() {
    return {
      id: 0,
      lawFirm: {},
      defaultImage: 'https://i.pinimg.com/564x/98/19/56/9819560be56ed3a766e98d3523e5fc8c.jpg',
      defaultBackGround: '/assets/images/lawfirm_info_bg.png'
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    isLogin() {
      return this.getIsLogin
    }
  },
  activated() {
    this.id = this.$route.query.id
    this.init()
  },
  methods: {
    init() {
      if (this.getIsLogin) this.findUserLawFirmDetail()
      else this.findAnonymousLawFirmDetail()
    },
    quit() {
      let result = confirm('탈퇴하겠습니까?')
      if (!result) return
      service.quitLawFirm(new QuitLawFirmRequestDto(this.id)).then(res => {
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          alert('탈퇴 성공했습니다.')
          this.$router.go(0)
        }
      })
    },
    noticeLogin() {
        alert('로그인 유저만 로펌에 가입 할 수 있습니다.')
        this.$router.push('/login')
    },
    goMyLawfirm(id) {
      window.location.replace(`/lawgg/law-firm/list?id=${id}`)
    },
    successApplyLawFirm() {
      this.lawFirm.applyFlag = 1
    },
    async findAnonymousLawFirmDetail() {
      const param = new FindAnonymousLawFirmDetail(this.id)
      const res = await service.findAnonymousLawFirmDetail(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.lawFirm = res.data.lawFirm
      }
    },
    async findUserLawFirmDetail() {
      const param = new FindUserLawFirmDetail(this.id)
      const res = await service.findUserLawFirmDetail(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.lawFirm = res.data.lawFirm
        this.$emit('setIsMyLawFirmFlag', res.data.lawFirm.isMyLawFirmFlag)
      }
    },
    async cancel() {
      let result = confirm('로펌 신청을 취소하시겠습니까?')
      if (!result) return
      const param = new UserCancelLawFirmRequestDto(this.id)
      const res = await service.cancelLawFirm(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.lawFirm.applyFlag = 0
        alert('로펌 취소를 성고했습니다.')
      }
    }
  }
}
</script>

<style scoped>

</style>
