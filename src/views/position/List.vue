<template>
  <div class="content">

    <!-- 서브메뉴 -->
    <position-sub-menu :type.sync="type" @updateType="updateType"/>

    <!-- 타이틀 -->
    <Title :page="0" />

    <!-- 베너 -->
    <Banner ref="banner"/>

    <!-- 구분 및 옵션 -->
    <position-sort-option :topic.sync="topic" :type.sync="type" @updateTopic="updateTopic" @updateKeyword="updateKeyword">
      <template slot="pageNum">
        <select name="" class="w80" v-model="pageNum">
          <option value="30">30개</option>
          <option value="50">50개</option>
          <option value="100">100개</option>
        </select>
      </template>
      <input slot="keyword" type="text" name="Sstring" title="검색어" value="" placeholder="검색어를 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
    </position-sort-option>

    <!-- 리스트 -->
    <position-board-list :board-list.sync="boardList" />

    <!-- 페이지넘버링 -->
    <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage" />

<!--    <top-move-btn/>-->
  </div>
</template>

<script>
import PositionSubMenu from "@/components/position/list/PositionSubMenu";
import PositionSortOption from "@/components/position/list/PositionSortOption";
import PositionBoardList from "@/components/position/list/PositionBoardList";
import FindAllListBoardRequestDto from "@/dto/board/request/board/FindAllListBoardRequestDto.js";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import PagingList from "@/components/common/PagingList";
import Title from "@/components/common/Title";
import Banner from "@/components/common/Banner";
import { debounce } from 'lodash';
// import TopMoveBtn from "@/components/common/TopMoveBtn";

export default {
  name: "PositionList",
  components: { Title, PagingList, PositionBoardList, PositionSortOption,  PositionSubMenu, Banner},
  data () {
    return {
      page: 0,
      type: 5,
      pageNum: 30,
      topic: 0,
      subject: 0, // 0 ALL 타입 고정
      keyword: '',
      boardList: [],
      totalPage: 0
    }
  },
  activated() {
    if (this.$route.query.type) this.type = this.$route.query.type
    this.search()
  },
  methods: {
    updateType(type) {
      this.type = type;
      this.page = 0
      this.pageNum = 30
      this.topic = 0
      this.keyword = ''
      this.debouncedSearch()
    },
    updateTopic(topic) {
      this.topic=topic
      this.page = 0
      this.pageNum = 30
      this.debouncedSearch()
    },
    updateKeyword() {
      this.page = 0
      this.debouncedSearch()
    },
    movePage(page) {
      this.$refs.banner.scrollBanner()
      this.page = page;
      this.debouncedSearch()
    },
    async search() {
      let param = new FindAllListBoardRequestDto(this.page, this.type, this.pageNum, this.topic, this.subject, this.keyword);
      let res = await service.findAllListBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.boardList = res.data.list
        this.totalPage = res.data.totalPage
      }
    },
    debouncedSearch: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.search();
    }, 300), // 500ms 동안 중복 클릭 방지
  }
};
</script>
