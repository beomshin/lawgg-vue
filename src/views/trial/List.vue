<template>
  <div class="content">

    <!-- 타이틀 -->
    <Title :page="1" />

    <!-- 베너 -->
    <Banner ref="banner"/>

    <!-- 구분 및 옵션 -->
    <trial-sort-option :topic.sync="topic" @updateTopic="updateTopic" @updateKeyword="updateKeyword">
      <template slot="pageNum">
        <select name="" class="w80" v-model="pageNum">
          <option value="30">30개</option>
          <option value="50">50개</option>
          <option value="100">100개</option>
        </select>
      </template>
      <input slot="keyword"  type="text" name="Sstring" title="검색어" value="" placeholder="검색어를 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
    </trial-sort-option>

    <!-- 리스트 -->
    <trial-board-list :trial-list.sync="trialList"/>

    <!-- 페이지넘버링 -->
    <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage"/>

<!--    <top-move-btn/>-->
  </div>
</template>

<script>
import TrialSortOption from "@/components/trial/list/TrialSortOption";
import TrialBoardList from "@/components/trial/list/TrialBoardList";
import service from "@/http/service";
import FindAllListTrialRequestDto from "@/dto/trial/request/trial/FindAllListTrialRequestDto";
import commonUtils from "@/utils/commonUtils";
import PagingList from "@/components/common/PagingList";
import Title from "@/components/common/Title";
import Banner from "@/components/common/Banner";
import { debounce } from 'lodash';
// import TopMoveBtn from "@/components/common/TopMoveBtn";

export default {
  name: "TrialList",
  components: {  Title, PagingList, TrialBoardList, TrialSortOption, Banner},
  data () {
    return {
      page: 0,
      pageNum: 30,
      topic: 0,
      subject: 0, // 0 ALL 타입 고정
      keyword: '',
      trialList: [],
      totalPage: 0
    }
  },
  activated() {
    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword // 키워드 진입
    this.search()
  },
  methods: {
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
      let param = new FindAllListTrialRequestDto(this.page, this.pageNum, this.topic, 0, this.keyword)
      let res = await service.findAllListTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.trialList = res.data.list
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
