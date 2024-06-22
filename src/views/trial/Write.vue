<template>
  <div class="content">


    <!-- 타이틀 -->
    <Title :page="1"/>
    <!-- 타이틀 끝 -->


    <!-- 등록/수정 -->
    <div name="addForm" >
      <fieldset>
        <legend>등록/수정</legend>
        <form>
          <div class="board-write">
            <div>
              <dl>
                <dt>작성자 <span>*</span></dt>
                <dd>
                  <div>
                    <input type="text" class="input-box w100p" placeholder="" maxlength="20" :value="id"  disabled/>
                    <input type="password" name="password" class="input-box w100p" placeholder="" value="********" maxlength="12" disabled autocomplete="on"/>
                  </div>
                </dd>
                <h3><i class="uil uil-exclamation-triangle color-pink" ></i> 닉네임은 마이 페이지에서 변경가능합니다.</h3>
              </dl>
              <dl>
                <dt>제목 <span>*</span></dt>
                <dd><input name="" type="text" class="input-box w100p" placeholder="제목을 작성해주세요." maxlength="32" v-model="title"/></dd>
              </dl>
              <dl>
                <dt>원고/피고 <span>*</span></dt>
                <dd>
                  <div>
                    <input name="" type="text" class="input-box w100p" placeholder="원고 챔피언명" v-model="plaintiff" maxlength="16"/>
                    <input name="" type="text" class="input-box w100p" placeholder="피고 챔피언명" v-model="defendant" maxlength="16"/>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>동영상 첨부</dt>
                <dd>
                  <div class="input-file">
                    <label>
                      파일선택
                      <input type="file"  @change="handleVideoChange($event)">
                    </label>
                    <input type="text" readonly="readonly" title="File Route" id="fileRoute" placeholder="영상 파일을 업로드해주세요." class="input-box w100p" v-model="filePath"/>
                  </div>
                  <File :file.sync="playVideo" @deleteImage="deleteVideo"/>
                </dd>
                <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>영상은 최대 500MB 업로드 하실 수 있습니다.</h3>
              </dl>
              <dl>
                <dt>리플레이 첨부</dt>
                <dd>
                  <div class="input-file">
                    <label>
                      파일선택
                      <input type="file"  @change="handleReplayChange($event)">
                    </label>
                    <input type="text" readonly="readonly" title="File Route" id="fileRoute" placeholder="리플레이 파일을 업로드해주세요." class="input-box w100p" v-model="filePath3"/>
                  </div>
                  <File :file.sync="replay" @deleteImage="deleteReplay"/>
                </dd>
                <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>리플레이는 최대 50MB 업로드 하실 수 있습니다.</h3>
              </dl>
            </div>

            <h2>상세 정보 입력</h2>
            <h3>
              <i class="uil uil-exclamation-triangle"></i>
              <span>작성하는 법 : </span>
              우선 소제목에 어떤 부분에 대해 판결을 받고 싶은 지 적으세요. <br>그 후, 의견 A와 B에 각 대립하는 의견을 적어주시길 바랍니다.
            </h3>
            <div class="mt20">
              <dl>
                <dt>투표 소제목 <span>*</span></dt>
                <dd><input name="" type="text" class="input-box w100p" placeholder="투표 소제목을 작성해주세요." maxlength="100" v-model="subheading"/></dd>
              </dl>
              <dl>
                <dt>의견A <span>*</span></dt>
                <dd><input name="" type="text" class="input-box w100p" placeholder="원고의 의견을 작성해주세요." maxlength="100" v-model="plaintiffOpinion"/></dd>
              </dl>
              <dl>
                <dt>의견B <span>*</span></dt>
                <dd><input name="" type="text" class="input-box w100p" placeholder="피고의 의견을 작성해주세요." maxlength="100" v-model="defendantOpinion"/></dd>
              </dl>
            </div>

            <div class="mt20">
              <div>
                <summernote @uploadFile="uploadFile"/>
                <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>파일은 각각 최대 3MB 업로드 하실 수 있습니다.</h3>
                <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>유튜브 숏츠는 업로드 불가합니다.</h3>
              </div>
            </div>

            <dl>
              <dt>
                트라이얼을 요청할 시 게시물은 판사의 선고가 이뤄진 시간으로 일주일 후에 게시물 삭제가 가능하며 서로의 합의 하에 진행되는 것임을 또한 이 후 일어나는 모든 책임은 본인이 짊어지는 것에 대해 동의하십니까?
              </dt>
              <dd>
                <div class="radio-box" @click="changeAgree(true)">
                  <input type="radio" name="opt" id="chk1" :checked="agree"/>
                  <label for="chk1">예</label>
                </div>
                <div class="radio-box ml20" @click="changeAgree(false)">
                  <input type="radio" name="opt" id="chk2" :checked="!agree"/>
                  <label for="chk2">아니오</label>
                </div>
              </dd>
            </dl>

            <p class="bw-btn-two">
              <a @click="enroll" class="btn-default-a bg-black w150" >등록하기</a>
              &nbsp;
              <a @click="back" class="btn-default-a bg-gray w150">뒤로가기</a>
            </p>
          </div>
        </form>
      </fieldset>
    </div>


  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import commonUtils from "@/utils/commonUtils";
import service from "@/http/service";
import EnrollUserTrialRequestDto from "@/dto/trial/request/trial/EnrollUserTrialRequestDto";
import File from "@/components/common/File";
import Title from "@/components/common/Title";
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";
import Summernote from "@/components/common/Summernote";
import EnrollVideoDto from "@/dto/trial/request/trial/EnrollVideoDto";
import CommonUtils from "@/utils/commonUtils";

export default {
  name: "TrialWrite",
  components: {Summernote, Title, File},
  data() {
    return {
      title: '',
      plaintiff: '',
      defendant: '',
      subheading: '',
      plaintiffOpinion: '',
      defendantOpinion: '',
      content: '',
      playVideo: null,
      replay: null,
      files: new Array(),
      filePath: '',
      filePath2: '',
      filePath3: '',
      agree: false,
      doubleSubmit: false
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    id() {
      return this.getUserInfo?.nickName
    },
    isLogin() {
      return this.getIsLogin
    },
    isAuth() {
      return this.getUserInfo?.authFlag == 1
    },
    isAge() {
      return CommonUtils.isAbove19(this.getUserInfo?.birth)
    }
  },
  activated() {
    if (!this.isLogin) {
      this.goLogin()
      return
    } else if (!this.getUserInfo) {
      history.back();
      return;
    } else if (!this.isAuth) {
      history.back();
      alert('트라이얼은 본인인증 유저만 작성 가능합니다.')
      return;
    } else if (!this.isAge) {
      history.back();
      alert('트라이얼은 19세 이상만 이용 가능합니다.')
    }
  },
  deactivated() {
    this.clear()
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    back() {
      window.history.back()
    },
    uploadFile(files) {
      files.forEach(e => {this.files.push(e)})
    },
    handleVideoChange(e) { // 파일 등록
      let file = e.target.files[0]
      if (!file) return;
      this.filePath = e.target.value
      e.target.value = ''; // 동일한 파일 업로드를 위해 초기화
      const ext = commonUtils.getExtVideo(file.name)
      if (file.size > commonCont.VIDEO_MAX_SIZE) { // 사이즈 검사
        alert(`파일 크기가 500MB를 초과했습니다.`)
        return
      } else if (!ext) return; // 확장자 검사
      file.ext = ext
      this.playVideo = file
    },
    handleReplayChange(e) { // 파일 등록
      let file = e.target.files[0]
      if (!file) return;
      this.filePath3 = e.target.value
      e.target.value = ''; // 동일한 파일 업로드를 위해 초기화
      const ext = commonUtils.getExtReplay(file.name)
      if (file.size > commonCont.REPLAY_MAX_SIZE) { // 사이즈 검사
        alert(`파일 크기가 50MB를 초과했습니다.`)
        return
      } else if (!ext) return; // 확장자 검사
      file.ext = ext
      this.replay = file
    },
    deleteVideo() { // 파일 삭제
      this.filePath = null
      this.playVideo = null
    },
    deleteReplay() { // 파일 삭제
      this.replay = null
      this.filePath3 = null
    },
    changeAgree(agree) {
      this.agree = agree
    },
    goLogin() {
      alert('트라이얼 작성은 회원만 가능합니다.')
      this.$router.replace('/login')
    },
    enroll() {
      if (this.doubleSubmit) return;
      if (!this.playVideo) {
        alert('판결에 참고할 수 있는 동영상을 올려주세요.')
        return;
      }
      this.content = window.$('#summernote').summernote('code');
      if(!verifyUtils.enrollTrial(this.title, this.plaintiff, this.defendant, this.subheading, this.plaintiffOpinion, this.defendantOpinion, this.content, this.agree)) return
      this.doubleSubmit = true
      const isLawFirm= this.$route.path.includes('law-firm') ? 1 : 0;
      service.enrollUserTrial(
          new EnrollUserTrialRequestDto(
          this.title,
          this.plaintiff,
          this.defendant,
          this.subheading,
          this.plaintiffOpinion,
          this.defendantOpinion,
          this.content,
          this.files,
          isLawFirm,
          this.playVideo,
          this.replay)
      ).then(res => {
        this.doubleSubmit = false
        if(res.data.resultCode == '00000') {
          this.updateTrialCount(1)
          service.uploadVideo(new EnrollVideoDto(res.data.id, this.playVideo, this.replay)).catch(() => {
            alert('영상 업로드에 실패하였습니다.')
          })
          this.$router.replace('/my/board')
        } else {
          alert('트라이얼 등록에 실패하였습니다.')
          window.history.back();
        }
      }).catch(e => {
        console.log(e)
        alert('트라이얼 등록에 실패하였습니다.')
      })
    },
    clear() {
      this.title = commonCont.EMPTY
      this.plaintiff = commonCont.EMPTY
      this.defendant = commonCont.EMPTY
      this.subheading = commonCont.EMPTY
      this.plaintiffOpinion = commonCont.EMPTY
      this.defendantOpinion = commonCont.EMPTY
      this.content = commonCont.EMPTY
      this.playVideo = null
      this.filePath =  commonCont.EMPTY
      this.agree = false
      this.replay = null;
      this.doubleSubmit = false
      this.files = commonCont.EMPTY_ARR
    }
  }
};
</script>
