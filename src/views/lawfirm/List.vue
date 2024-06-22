<template>
  <div class="content">

    <!-- 타이틀 -->
    <Title :page="2" ref="title"/>

    <!-- 로펌 - 정보 -->
    <law-firm-list-info @setIsMyLawFirmFlag="setIsMyLawFirmFlag"/>

    <div style="padding: 20px"></div>

    <law-firm-list-sub-menu :type.sync="type" @updateType="updateType" />
    <!-- 구분 및 옵션 -->
    <law-firm-list-sort-option
        :topic.sync="topic"
        :type.sync="type"
        :isMyLawFirmFlag.sync="isMyLawFirmFlag"
        @updateTopic="updateTopic"
        @updateKeyword="updateKeyword"
    >
      <template slot="pageNum">
        <select name="" class="w80" v-model="pageNum">
          <option value="30">30개</option>
          <option value="50">50개</option>
          <option value="100">100개</option>
        </select>
      </template>
      <input slot="keyword" type="text" name="Sstring" title="검색어" value="" placeholder="검색어를 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
    </law-firm-list-sort-option>

    <!-- 리스트 -->
    <law-firm-list-content :list.sync="list" :type.sync="type" />

    <!-- 페이지넘버링 -->
    <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage" />

<!--    <top-move-btn/>-->
  </div>
</template>

<script>
import LawFirmListSubMenu from "@/components/lawfirm/list/LawFirmListSubMenu";
import LawFirmListInfo from "@/components/lawfirm/list/LawFirmListInfo";
import LawFirmListSortOption from "@/components/lawfirm/list/LawFirmListSortOption";
import LawFirmListContent from "@/components/lawfirm/list/LawFirmListContent";
import service from "@/http/service";
import FindLawFirmListBoardRequestDto from "@/dto/board/request/board/FindLawFirmListBoardRequestDto";
import commonUtils from "@/utils/commonUtils";
import FindLawFirmListTrialRequestDto from "@/dto/trial/request/trial/FindLawFirmListTrialRequestDto";
import PagingList from "@/components/common/PagingList";
import Title from "@/components/common/Title";
import { debounce } from 'lodash';
// import TopMoveBtn from "@/components/common/TopMoveBtn";

export default {
  name: "LawFirmList",
  components: {
    Title,
    PagingList, LawFirmListContent, LawFirmListSortOption, LawFirmListInfo, LawFirmListSubMenu},
  data() {
    return {
      id: 0,
      page: 0,
      type: 0,
      pageNum: 30,
      topic: 0,
      subject: 0, // 0 ALL 타입 고정
      keyword: '',
      list: [],
      totalPage: 0,
      isMyLawFirmFlag: 0
    }
  },
  activated() {
    this.id = this.$route.query.id
    this.search()
  },
  methods: {
    setIsMyLawFirmFlag(isMyLawFirmFlag) {
      this.isMyLawFirmFlag = isMyLawFirmFlag
    },
    updateType(type) {
      this.type = type;
      this.page = 0
      this.pageNum = 30
      this.topic = 0
      this.keyword = ''
      this.search()
    },
    updateTopic(topic) {
      this.topic=topic
      this.page = 0
      this.pageNum = 30
      this.search()
    },
    updateKeyword() {
      this.page = 0
      this.search()
    },
    movePage(page) {
      this.$refs.title.scrollBanner()
      this.page = page;
      this.search()
    },
    search() {
      if (this.type == 0) this.debouncedSearch1()
      else if (this.type == 1) this.debouncedSearch2()
    },
    async searchBoard() {
      const param = new FindLawFirmListBoardRequestDto(this.id, this.page, this.pageNum, this.topic, this.subject, this.keyword)
      const res = await service.findLawFirmListBoard(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.list = res.data.list
        this.totalPage = res.data.totalPage
      }
    },
    async searchTrial() {
      const param = new FindLawFirmListTrialRequestDto(this.id, this.page, this.pageNum, this.topic, this.subject, this.keyword)
      const res = await service.findLawFirmListTrial(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.list = res.data.list
        this.totalPage = res.data.totalPage
      }
    },
    debouncedSearch1: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.searchBoard();
    }, 300), // 500ms 동안 중복 클릭 방지
    debouncedSearch2: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.searchTrial();
    }, 300), // 500ms 동안 중복 클릭 방지
  }
};
</script>
