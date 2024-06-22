<template>
  <div name="addForm" >
    <fieldset>
      <legend>등록/수정</legend>
      <div class="board-write">
        <div>
          <dl>
            <dt>작성자 <span>*</span></dt>
            <dd>
              <div>
                <input type="text" class="input-box w100p" placeholder="아이디를 입력하세요." maxlength="20" v-model="loginId" disabled/>
                <input type="password" class="input-box w100p" placeholder="비밀번호를 입력하세요." maxlength="12" v-model="password" disabled/>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>카테고리 <span>*</span></dt>
            <dd>
              <select name="name" title="" class="w100p" v-model="lineType" disabled>
                <option value="0" >TOP</option>
                <option value="1" >JUNGLE</option>
                <option value="2" >MID</option>
                <option value="3" >ADD</option>
                <option value="4" >ALL</option>
              </select>
            </dd>
          </dl>
          <dl>
            <dt>제목 <span>*</span></dt>
            <dd><input name="" type="text" class="input-box w100p" placeholder="제목을 입력하세요." v-model="title" maxlength="32"/></dd>
          </dl>
          <div>
            <summernote @uploadFile="uploadFile" />
            <h3 style="margin-top: 5px"><i class="uil uil-exclamation-triangle color-pink" ></i>파일은 각각 최대 3MB 업로드 하실 수 있습니다.</h3>
          </div>
        </div>
        <p class="bw-btn-two">
          <a class="btn-default-a bg-black w150" @click="edit">수정하기</a>
          &nbsp;
          <a class="btn-default-a bg-gray w150" @click="back">뒤로가기</a>
        </p>
      </div>
    </fieldset>
  </div>
</template>

<script>
import commonUtils from "@/utils/commonUtils";
import verifyUtils from "@/utils/verifyUtils";
import UpdateAnonymousBoardRequestDto from "@/dto/board/request/board/UpdateAnonymousBoardRequestDto";
import service from "@/http/service";
import UpdateUserBoardRequestDto from "@/dto/board/request/board/UpdateUserBoardRequestDto";
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import Summernote from "@/components/common/Summernote";

export default {
  name: "PositionContentEdit",
  components: {Summernote},
  props: ['board', 'id'],
  data() {
    return {
      loginId: '',
      password: '',
      title: '',
      content: '',
      lineType: 0,
      files: [],
      filePath: '',
      addFiles: [],
      deleteFiles: []
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
  },
  watch: {
    board(val) {
      if (!val) return
      this.setBoard(val)
    }
  },
  mounted() {
    if (this.board) {
      this.setBoard(this.board)
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    uploadFile(files) {
      files.forEach(e => {
        this.addFiles.push(e)
      })
    },
    edit() {
      this.content = window.$('#summernote').summernote('code');
      if (!verifyUtils.editBoard(this.title, this.content)) return;
      if (this.getIsLogin) this.editUser()
      else this.editAnonymous()
    },
    async editAnonymous() {
      const param = new UpdateAnonymousBoardRequestDto(this.id, this.password, this.title, this.content, this.addFiles)
      const res = await service.updateAnonymousBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        window.history.back()
        alert('게시판이 수정되었습니다.')
      }
    },
    async editUser() {
      const param = new UpdateUserBoardRequestDto(this.id, null, this.title, this.content, this.addFiles)
      const res = await service.updateUserBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        window.history.back()
        alert('게시판이 수정되었습니다.')
      }
    },
    setBoard(val) {
      this.loginId = val.writer
      this.password = val.password
      this.title = val.title
      this.content = val.content
      window.$('#summernote').summernote("code", this.content)
    }
  }
}
</script>

<style scoped>

</style>
