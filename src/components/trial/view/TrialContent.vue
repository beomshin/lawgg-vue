<template>
  <div class="board-view">
    <dl class="bv-header">
      <dt>
        <h2>{{trial.title}}</h2>
        <div>
          <i class="uit uit-user"></i> 작성자 : {{trial.writer}}
          &nbsp; · &nbsp;
          <i class="uit uit-clock"></i> {{trial.writeDt}}
          &nbsp; · &nbsp;
          <i class="uit uit-eye"></i> 조회수 : {{trial.view}}
          &nbsp; · &nbsp;
          <i class="uit uit-heart-sign"></i> 추천 : {{trial.recommendCount}}
        </div>
      </dt>
      <dd>
        <button class="btn-default-s bg-pink" @click="recommendTrial"><i class="uit uit-thumbs-up"></i> 추천하기</button>
        &nbsp;
        <button class="btn-default-s bg-black" @click="reportTrial"><i class="uit uit-megaphone"></i> 신고하기</button>
      </dd>
    </dl>
    <div class="bv-poll2" v-if="trial.replay">
        <label style="cursor: pointer" @click="downloadReplay">
          <img src="../../../assets/images/fileIcn/jpg.gif" alt="" title=""/> &nbsp; 리플레이파일 다운받기
        </label>
    </div>
    <trial-video :url="trial.playVideo" />
    <div class="bv-content">
      <p v-html="adjustMediaSize(content)" />
    </div>
    <template v-if="!isNotNotice(trial.postType)">
      <div class="bv-lawer">
        <div><span>원고 :</span> {{trial.plaintiff}}</div>
        <div><span>피고 :</span> {{trial.defendant}}</div>
        <div><span>판사 :</span> {{trial.judgeName || '미정'}}</div>
      </div>
      <div class="bv-poll">
        <h2>누구의 판단이 맞는가?</h2>
        <dl>
          <dt>
            <div>
              <span :style="`width:${redPercent}%;`" style="background:#EC0745;"></span>
            </div>
            <h2>{{trial.plaintiffOpinion}} <span v-if="redPercent">&nbsp;({{trial.plaintiffCount}}표/{{redPercent}}%)</span></h2>
            <p><button class="btn-default-m w100" :class="isEnd ? trial.precedent == 0 ? 'bg-orange' : 'bg-dark' : trial.isVote == 0 ? 'bg-orange' : 'bg-dark'" @click="vote(0)" :disabled="trial.isVote == 0 || isEnd">
              {{isEnd ? trial.precedent == 0 ? '원고 승소' : trial.precedent == 1 ? '원고 패소' : '재판 종료' : '원고 투표'}}
            </button></p>
          </dt>
          <dd>
            <div>
              <span :style="`width:${bluePercent}%;`" style="background:#4F8EF8;"></span>
            </div>
            <h2>{{trial.defendantOpinion}} <span v-if="bluePercent">&nbsp;({{trial.defendantCount}}표/{{bluePercent}}%)</span></h2>
            <p><button class="btn-default-m w100" :class="isEnd ? trial.precedent == 1 ? 'bg-orange' : 'bg-dark' : trial.isVote == 1 ? 'bg-orange' : 'bg-dark'"  @click="vote(1)" :disabled="trial.isVote == 1 || isEnd">
              {{isEnd ? trial.precedent == 1 ? '피고 승소' : trial.precedent == 0 ? '피고 패소' : '재판 종료' : '피고 투표'}}
            </button></p>
          </dd>
        </dl>
        <div>
          <template v-if="trial.isRecommend && trial.isRecommend == 1">
            <button class="btn-line-gray-m w170" ><i class="uil uil-thumbs-up"></i> 추천완료</button>
          </template>
          <template v-else>
            <button class="btn-line-gray-m w170" @click="recommendTrial"><i class="uil uil-thumbs-up"></i> 추천</button>
          </template>
          &nbsp;
          <template v-if="isEnd">
            <button class="btn-line-gray-m w170 bg-black"><i class="uil uil-notebooks"></i>재판 종료</button>
          </template>
          <template v-else-if="isLive">
            <button class="btn-line-blue-m w170" @click="openLive"><i class="uil uil-notebooks"></i>실시간 재판중</button>
          </template>
          <template v-else>
            <button class="btn-line-gray-m w170"><i class="uil uil-notebooks"></i>재판 준비중</button>
          </template>
        </div>
      </div>
    </template>
    <dl class="bv-btn">
      <dt>
<!--        <a v-if="canUser(trial.created, trial.endingType, trial.liveType, trial.precedent)" class="btn-default-m bg-black">수정</a>-->
        &nbsp;
        <a v-if="canUser" @click="goDelete" class="btn-default-m bg-black">삭제</a>
      </dt>
      <dd>
        <template v-if="!isNotNotice(trial.postType)">
          <a v-if="getJudgeFlag == 1 && !isEnd && !isLive" @click="$modal.show('trialLive')" class="btn-default-m bg-pink" style="margin-right: 5px;">재판하기</a>
          <a v-else-if="getJudgeFlag == 1 && !isEnd && isLive && getTrialJudge" @click="$modal.show('trialEndLive')" class="btn-default-m bg-purple" style="margin-right: 5px;">재판종료</a>
        </template>
        <a @click="back" class="btn-default-m bg-black">뒤로가기</a>
      </dd>
    </dl>

    <trial-live-modal :id="trial.trialId" @startLive="startLive" />

    <trial-live-end-modal :id="trial.trialId" @endTrial="endTrial" />
  </div>
</template>

<script>
import service from "@/http/service";
import RecommendTrialRequestDto from "@/dto/trial/request/trial/RecommendTrialRequestDto";
import commonUtils from "@/utils/commonUtils";
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import VoteTrialRequestDto from "@/dto/trial/request/trial/VoteTrialRequestDto";
import TrialLiveModal from "@/components/trial/list/TrialLiveModal";
import TrialVideo from "@/components/trial/view/TrialVideo";
import TrialLiveEndModal from "@/components/trial/list/TrialLiveEndModal";

export default {
  name: "TrialContent",
  components: {TrialLiveEndModal, TrialVideo, TrialLiveModal},
  props: ['trial'],
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    isLive() {
      return this.trial.liveType == 1 // 라이브 상태인지
    },
    isEnd() {
      return this.trial.endingType == 1 || (this.trial.endingType == 0 && this.checkThreeHoursPassed(this.trial.liveDt)) // 종료 되었는지
    },
    content() {
      if (!this.trial.content) return
      return this.trial.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    canUser() {
      return this.trial.created == 1 && this.trial.endingType == 0 && this.trial.liveType == 0 && this.trial.precedent == 9
    },
    getJudgeFlag() {
      return this.getUserInfo?.judgeFlag || 0 // 판사 자격이 있는지
    },
    redPercent() {
      return (this.trial.plaintiffCount / (this.trial.plaintiffCount + this.trial.defendantCount) * 100) || 0;
    },
    bluePercent() {
      return (this.trial.defendantCount / (this.trial.plaintiffCount + this.trial.defendantCount)  * 100) || 0;
    },
    getTrialJudge() {
      if(!this.trial.judgeId) return false;
      return this.trial.judgeId == this.getUserInfo.userId // 재판 시작한 판사인지
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    goDelete() {
      this.$router.replace({ path: 'delete', query: { id: this.trial.trialId }})
    },
    alertVote(precedent) {
      let title
      if (this.trial.isVote == 9) title = `${precedent == 0 ? 'A' : 'B'}를 투표하시겠습니까?`
      else title = '투표를 변경하시겠습니까?'
      let result = confirm(title)
      return result
    },
    async vote(precedent) {
      if (!this.getIsLogin) {
        this.goLogin()
        return
      } else if (!this.alertVote(precedent)) {
        return
      }
      const param = new VoteTrialRequestDto(this.trial.trialId, precedent)
      const res = await service.voteTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.setVote(this.trial.isVote, precedent)
      }
    },
    async recommendTrial() {
      if (!this.getIsLogin) {
        this.goLogin()
        return
      }
      const param = new RecommendTrialRequestDto(this.trial.trialId)
      const res = await service.recommendTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        alert('추천 성공하였습니다.')
        this.trial.isRecommend = 1
        this.trial.recommendCount += 1
      }
    },
    async reportTrial() {
      this.$emit('reportTrial')
    },
    setVote(isVote, precedent) {
      if (isVote == 9) { // 투표 처음 경우
        if (precedent == 0) this.trial.plaintiffCount += 1
        else this.trial.defendantCount += 1
      } else if (isVote == 0) { // A투표 에서 B투표로 변경
        this.trial.plaintiffCount -= 1
        this.trial.defendantCount += 1
      } else if (isVote == 1) {// B투표 에서 A투표로 변경
        this.trial.plaintiffCount += 1
        this.trial.defendantCount -= 1
      }
      this.trial.isVote = precedent
    },
    startLive(url) {
      this.trial.liveType = 1;
      this.trial.url = url
      this.trial.judgeId = this.getUserInfo.userId
    },
    endTrial(precedent) {
      this.trial.endingType = 1
      this.trial.precedent = precedent
    },
    openLive() {
      window.open(this.trial.url, "_blank");
    },
    checkThreeHoursPassed(dateString) {
      if (!dateString) return false
      const date = new Date(dateString);
      const timeDiff = Date.now() - date.getTime();
      const threeHoursInMillis = 2 * 60 * 60 * 1000;
      return timeDiff >= threeHoursInMillis;
    },
    goLogin() {
      alert('로그인을 해주세요')
      this.$router.push('/login')
    },
    downloadReplay() {
      if (!this.getIsLogin) {
        this.goLogin()
        return
      }
      window.location.href = this.trial.replay
    },
    isNotNotice(type) {
      if (type == 98 || type == 99) return true
      else return false
    },
    adjustMediaSize(content) {
      if (!content) return
      // 모바일 여부를 판단하는 로직
      const isMobile = window.innerWidth <= 767;

      // iframe 태그 크기 조정
      const adjustedContent = content.replace(/<iframe.*?<\/iframe>/g, (match) => {
        if (isMobile) {
          return match.replace(/width="(\d+)"/, 'width="100%"')
              .replace(/height="(\d+)"/, 'height="300px"');
        } else {
          return match;
        }
      });

      // 이미지 태그 크기 조정
      const imgAdjustedContent = adjustedContent.replace(/<img.*?>/g, (match) => {
        if (isMobile) {
          return match.replace(/style=".*?"/, 'style="width: 100%;"');
        } else {
          return match;
        }
      });

      return imgAdjustedContent;
    }
  }
}
</script>

<style scoped>

</style>
