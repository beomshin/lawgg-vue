<template>
  <div class="content">
    <dl class="mypage-layout">
      <my-page-header/>
      <dd>
        <!-- 마이페이지 - 타이틀 -->
        <div class="mypage-title" ref="title">
          <h2>알림함</h2>
          <h3>로우지지 회원가입시 다양한 혜택과 서비스를 이용하실 수 있습니다. <br>
          </h3>
        </div>

        <!-- 구분 및 옵션 -->
        <alert-sort-option
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
          <input slot="keyword" type="text" name="Sstring" title="검색어" value="" placeholder="제목 키워드를 입력하세요." class="input-box w300" v-model="keyword" maxlength="30" @keyup.enter="updateKeyword"/>
        </alert-sort-option>

        <!-- 리스트 -->
        <alert-list :alerts="alerts" :page.sync="page" :page-num.sync="pageNum" />

        <!-- 페이지넘버링 -->
        <paging-list :page.sync="page" :total-page.sync="totalPage" :page-num.sync="pageNum" @movePage="movePage"/>

      </dd>
    </dl>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelper from "@/store/modules/common/helper";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";
import MyPageHeader from "@/components/mypage/common/MyPageHeader";
import PagingList from "@/components/common/PagingList";
import commonCont from "@/constants/commonCont";
import AlertSortOption from "@/components/mypage/alert/AlertSortOption";
import AlertList from "@/components/mypage/alert/AlertList";
import FindUserAlertRequestDto from "@/dto/user/request/FindUserAlertRequestDto";
import { debounce } from 'lodash';

export default {
  name: "MypageAlert",
  components: {
    AlertList,
    AlertSortOption,
    PagingList,
    MyPageHeader},
  data () {
    return {
      page: 0,
      pageNum: 10 ,
      subject: 4, // 4 발신인 검색 타입 고정
      keyword: '',
      alerts: [],
      totalPage: 0,
      totalElements: 0,
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
      let param = new FindUserAlertRequestDto(this.page, this.pageNum, this.keyword)
      const res = await service.findUserAlerts(param)
      if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
        this.alerts = res.data.list
        this.totalPage = res.data.totalPage
        this.totalElements= res.data.totalElements
      }
    },
    clear() {
      this.page = 0
      this.pageNum = 10
      this.keyword = commonCont.EMPTY
    },
    debouncedSearch: debounce(function() {
      // 검색 로직을 수행하는 함수
      this.search();
    }, 300), // 500ms 동안 중복 클릭 방지
  }
};
</script>
