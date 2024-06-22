<template>
  <div class="content">
    <dl class="mypage-layout">
      <my-page-header/>
      <dd>
        <!-- 마이페이지 - 타이틀 -->
        <div class="mypage-title" ref="title">
          <h2>쪽지함</h2>
          <h3>로우지지 회원가입시 다양한 혜택과 서비스를 이용하실 수 있습니다. <br>
            쪽지는 <span style="color: #EC0745">상대방 닉네임을</span> 통해 전달 할 수 있습니다.
          </h3>
        </div>

        <!-- 구분 및 옵션 -->
        <message-sort-option
            :total-elements.sync="totalElements"
            @updateKeyword="updateKeyword"
            @openMessage="openMessage"
        >
          <template slot="pageNum">
            <select name="" class="w80" v-model="pageNum">
              <option value="10">10개</option>
              <option value="30">30개</option>
              <option value="50">50개</option>
            </select>
          </template>
          <input slot="keyword" type="text" name="Sstring" title="검색어" value="" placeholder="발신인을 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
        </message-sort-option>

        <!-- 리스트 -->
        <message-list :messages="messages" :page.sync="page" :page-num.sync="pageNum" @showMessage="showMessage"/>

        <!-- 페이지넘버링 -->
        <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage"/>

        <!-- 모달 - 쪽지 내용 -->
        <message-receive-modal :reply-flag.sync="replyFlag" :receive-data.sync="receiveData" @reply="reply" @post="post"/>

        <!-- 모달 - 쪽지 작성 -->
        <message-write-modal ref="MessageWriteModal" @post="post"/>
      </dd>
    </dl>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import MessageSortOption from "@/components/mypage/message/MessageSortOption";
import MessageList from "@/components/mypage/message/MessageList";
import MessageReceiveModal from "@/components/mypage/message/MessageReceiveModal";
import MessageWriteModal from "@/components/mypage/message/MessageWriteModal";
import service from "@/http/service";
import FindReceiveListMessageRequestDto from "@/dto/message/request/FindReceiveListMessageRequestDto";
import commonUtils from "@/utils/commonUtils";
import SendMessageRequestDto from "@/dto/message/request/SendMessageRequestDto";
import MyPageHeader from "@/components/mypage/common/MyPageHeader";
import PagingList from "@/components/common/PagingList";
import commonCont from "@/constants/commonCont";
import { debounce } from 'lodash';

export default {
  name: "MypageMessage",
  components: {
    PagingList,
    MyPageHeader, MessageWriteModal, MessageReceiveModal, MessageList, MessageSortOption},
  data () {
    return {
      page: 0,
      pageNum: 10 ,
      subject: 4, // 4 발신인 검색 타입 고정
      keyword: '',
      messages: [],
      totalPage: 0,
      totalElements: 0,
      receiveData: {},
      replyFlag: false
    }
  },
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
  },
  activated() {
    if (!this.getIsLogin) {
      alert('로그인 해주세요.')
      this.$router.replace('/login')
      return
    }
    this.search()
  },
  deactivated() {
    this.clear()
  },
  methods: {
    updateKeyword() {
      this.page = 0
      this.debouncedSearch()
    },
    movePage(page) {
      this.$refs.title.scrollIntoView()
      this.page = page;
      this.debouncedSearch()
    },
    async search() {
      const param = new FindReceiveListMessageRequestDto(this.page, this.pageNum, this.subject, this.keyword)
      const res = await service.findReceiveListMessage(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.messages = res.data.messages
        this.totalPage = res.data.totalPage
        this.totalElements= res.data.totalElements
      }
    },
    openMessage() { // 알림 작성 모달 open
      this.$refs.MessageWriteModal.clear()
    },
    showMessage(receiveData) { // 메세지 모달 open
      this.replyFlag = false
      this.receiveData = receiveData
    },
    reply() { // 답장 open
      this.replyFlag = true
    },
    async post(data) {
      const param = new SendMessageRequestDto(data.receiver, data.title, data.content)
      const res = await service.sendMessage(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        alert('알림 발송을 성공했습니다.')
      }
    },
    clear() {
      this.page = 0
      this.pageNum = 10
      this.keyword = commonCont.EMPTY
      this.receiveData = commonCont.EMPTY_OBJ
      this.replyFlag = false
    },
    debouncedSearch: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.search();
    }, 300), // 500ms 동안 중복 클릭 방지
  }
};
</script>
