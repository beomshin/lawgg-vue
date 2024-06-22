<template>
  <div class="content">
    <dl class="mypage-layout">
      <my-page-header @go="go" />
      <dd>
        <!-- 마이페이지 - 타이틀 -->
        <div class="mypage-title" ref="title">
          <h2>글목록</h2>
          <h3>로우지지 회원가입시 다양한 혜택과 서비스를 이용하실 수 있습니다.</h3>
        </div>
        <!-- 마이페이지 - 타이틀 끝 -->

        <!-- 구분 및 옵션 -->
        <my-board-sort-option
            :total-elements.sync="totalElements"
            @updateKeyword="updateKeyword"
        >
          <template slot="pageNum">
            <select name="" class="w80" v-model="pageNum">
              <option value="10">10개</option>
              <option value="30">30개</option>
              <option value="50">50개</option>
            </select>
          </template>
          <input slot="keyword" type="text" name="Sstring" title="검색어" value="" placeholder="제목을 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
        </my-board-sort-option>

        <!-- 리스트 -->
        <my-board-list :list.sync="list" :page.sync="page" :page-num.sync="pageNum"/>

        <!-- 페이지넘버링 -->
        <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage"/>
      </dd>
    </dl>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import MyBoardSortOption from "@/components/mypage/board/MyBoardSortOption";
import MyBoardList from "@/components/mypage/board/MyBoardList";
import service from "@/http/service";
import FindUserBoardsRequestDto from "@/dto/user/request/FindUserBoardsRequestDto";
import commonUtils from "@/utils/commonUtils";
import MyPageHeader from "@/components/mypage/common/MyPageHeader";
import PagingList from "@/components/common/PagingList";
import commonCont from "@/constants/commonCont";
import { debounce } from 'lodash';

export default {
  name: "MypageMyBoard",
  components: {PagingList, MyPageHeader, MyBoardList, MyBoardSortOption},
  computed: {
    ...mapGetters(commonHelper.name, commonHelper.getters),
  },
  data () {
    return {
      page: 0,
      pageNum: 10 ,
      keyword: '',
      list: [],
      totalPage: 0,
      totalElements: 0,
    }
  },
  activated() {
    if (!this.getIsLogin) {
      alert('로그인 해주세요.')
      this.$router.replace('/login')
      return
    }
    this.debouncedSearch()
  },
  methods: {
    updateKeyword() {
      this.page = 0
      this.debouncedSearch()
    },
    async search() {
      const param = new FindUserBoardsRequestDto(this.page, this.pageNum, this.keyword)
      const res = await service.findUserBoards(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.list = res.data.list
        this.totalPage = res.data.totalPage
        this.totalElements= res.data.totalElements
      }
    },
    movePage(page) {
      this.$refs.title.scrollIntoView()
      this.page = page;
      this.debouncedSearch()
    },
    go() {
      this.page = commonCont.ZERO;
      this.pageNum = 10;
      this.keyword = commonCont.EMPTY
      this.list = commonCont.EMPTY_ARR
    },
    debouncedSearch: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.search();
    }, 300), // 500ms 동안 중복 클릭 방지
  }
};
</script>
