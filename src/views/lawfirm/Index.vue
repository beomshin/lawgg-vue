<template>
  <div class="content">

    <!-- 타이틀 -->
    <Title :page="2" />

    <!-- 베너 -->
    <Banner ref="banner"/>

    <!-- 구분 및 옵션 -->
    <law-firm-index-sort-option
        :totalElements.sync="totalElements"
        :page="page + 1"
        :totalPage="totalPage"
        @updateKeyword="updateKeyword"
    >
      <select name="" class="w80" v-model="pageNum">
        <option value="30">30개</option>
        <option value="50">50개</option>
        <option value="100">100개</option>
      </select>
      <input slot="keyword" type="text" name="Sstring" title="검색어" value="" placeholder="검색어를 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
    </law-firm-index-sort-option>

    <!-- 리스트 -갤러리형 -->
    <law-firm-index-gallery-list :law-firms="lawFirms"/>

    <!-- 페이지넘버링 -->
    <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage"/>
  </div>
</template>

<script>
import LawFirmIndexSortOption from "@/components/lawfirm/index/LawFirmIndexSortOption";
import LawFirmIndexGalleryList from "@/components/lawfirm/index/LawFirmIndexGalleryList";
import service from "@/http/service";
import FindAllLawFirmListRequestDto from "@/dto/lawFirm/request/FindAllLawFirmListRequestDto";
import commonUtils from "@/utils/commonUtils";
import PagingList from "@/components/common/PagingList";
import Title from "@/components/common/Title";
import Banner from "@/components/common/Banner";
import { debounce } from 'lodash';

export default {
  name: "LawFirmIndex",
  components: { Title, PagingList, LawFirmIndexGalleryList, LawFirmIndexSortOption, Banner},
  data () {
    return {
      page: 0,
      pageNum: 16,
      subject: 0, // 0 ALL 타입 고정
      keyword: '',
      lawFirms: [],
      totalPage: 0,
      totalElements: 0
    }
  },
  activated() {
    this.search()
  },
  methods: {
    movePage(page) {
      this.$refs.banner.scrollBanner()
      this.page = page;
      this.debouncedSearch()
    },
    updateKeyword() {
      this.page = 0
      this.debouncedSearch()
    },
    async search() {
      const param = new FindAllLawFirmListRequestDto(this.page, this.pageNum, this.subject, this.keyword)
      const res = await service.findAllLawFirmList(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.totalElements = res.data.totalElements
        this.totalPage= res.data.totalPage
        this.lawFirms= res.data.lawFirms
      }
    },
    debouncedSearch: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.search();
    }, 300), // 500ms 동안 중복 클릭 방지
  }
};
</script>
