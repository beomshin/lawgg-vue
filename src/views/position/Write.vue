<template>
  <div class="content">


    <!-- 타이틀 -->
    <Title :page="0"/>
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
                    <input type="text" class="input-box w100p" placeholder="아이디를 입력하세요." maxlength="20" v-model="id" :disabled="isLogin"/>
                    <input type="password" class="input-box w100p" placeholder="비밀번호를 입력하세요." maxlength="12" v-model="password" :disabled="isLogin" :autocomplete="isLogin" />
                  </div>
                </dd>
                <h3 v-if="isLogin"><i class="uil uil-exclamation-triangle color-pink" ></i> 닉네임은 마이 페이지에서 변경가능합니다.</h3>
              </dl>
              <dl>
                <dt>카테고리 <span>*</span></dt>
                <dd>
                  <select name="name" title="" class="w100p" v-model="lineType">
                    <option value="0" >TOP</option>
                    <option value="1" >JUNGLE</option>
                    <option value="2" >MID</option>
                    <option value="3" >BOT</option>
                    <option value="4" >SPT</option>
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>제목 <span>*</span></dt>
                <dd><input name="" type="text" class="input-box w100p" placeholder="제목을 입력하세요." v-model="title" maxlength="32"/></dd>
              </dl>
              <div>
                <summernote @uploadFile="uploadFile"/>
                <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>파일은 각각 최대 3MB 업로드 하실 수 있습니다.</h3>
                <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>유튜브 숏츠는 업로드 불가합니다.</h3>
              </div>
            </div>
            <p class="bw-btn-two">
              <a class="btn-default-a bg-black w150" @click="enroll">등록하기</a>
              &nbsp;
              <a class="btn-default-a bg-gray w150" @click="back">뒤로가기</a>
            </p>
          </div>
        </form>
      </fieldset>
    </div>
    <!-- 등록/수정 끝 -->


  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import userHelper from "@/store/modules/user/helper";
import service from "@/http/service";
import EnrollUserBoardRequestDto from "@/dto/board/request/board/EnrollUserBoardRequestDto";
import commonUtils from "@/utils/commonUtils";
import EnrollAnonymousBoardRequestDto from "@/dto/board/request/board/EnrollAnonymousBoardRequestDto.js";
import Title from "@/components/common/Title";
import commonCont from "@/constants/commonCont";
import verifyUtils from "@/utils/verifyUtils";
import Summernote from "@/components/common/Summernote";


export default {
  name: "PositionWrite",
  components: {Summernote, Title},
  data() {
    return {
      id: '',
      password: '',
      title: '',
      content: '',
      lineType: 0,
      files: [],
      filePath: '',
      doubleSubmit: false,
      summernoteActive: false
    }
  },
  watch: {
    getUserInfo(val) {
      if (!val) return
      this.id = val.nickName;
      this.password = commonCont.PASSWORD
    }
  },
  activated() {
    if (this.isLogin) {
      this.id = this.getUserInfo?.nickName;
      this.password = commonCont.PASSWORD;
    }
    this.lineType = this.$route.query.type ? this.$route.query.type : 0
  },
  deactivated() {
    this.clear()
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
    ...mapGetters(userHelper.name, userHelper.getters),
    isLogin() {
      return this.getIsLogin
    }
  },
  methods: {
    ...mapMutations(userHelper.name, userHelper.mutations),
    back() {
      window.history.back()
    },
    uploadFile(files) {
      files.forEach(e => {
        this.files.push(e)
      })
    },
    async enroll() {
      if (this.doubleSubmit) return
      this.content = window.$('#summernote').summernote('code');
      if (!verifyUtils.enrollBoard(this.id, this.password, this.lineType, this.title, this.content)) return
      this.doubleSubmit = true
      if (this.getIsLogin) await this.enrollUser()
      else await this.enrollAnonymous()
      this.doubleSubmit = false
    },
    async enrollAnonymous() { // 비회원 게시글 등록
      const param = new EnrollAnonymousBoardRequestDto(this.id, this.password, this.title, this.content, this.lineType, this.files)
      const res = await service.enrollAnonymousBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.back()
        alert('게시판 등록에 성공했습니다.')
      }
    },
    async enrollUser() { // 회원 게시글 등록
      const param = new EnrollUserBoardRequestDto(this.title, this.content, this.lineType, this.files, this.$route.path.includes('law-firm') ? 1 : 0)
      const res = await service.enrollUserBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.updateBoardCount(1)
        this.back()
        alert('게시판 등록에 성공했습니다.')
      }
    },
    clear() {
      this.id = commonCont.EMPTY
      this.password = commonCont.EMPTY
      this.title = commonCont.EMPTY
      this.content = commonCont.EMPTY
      this.filePath = commonCont.EMPTY
      this.lineType = commonCont.ZERO
      this.files = commonCont.EMPTY_ARR
      this.doubleSubmit = false
    }
  },

};
</script>
