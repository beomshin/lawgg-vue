<template>
  <swiper class="swiper-area" :options="MPswiperOption">
    <template v-for="(item, index) in list">
      <swiper-slide :key="index">
        <div @click="go(item.id)">
          <p><span>{{getTitle}}</span></p>
          <h2>{{truncateString(item.title, 19)}}</h2>
<!--          <div v-html="truncateString(item.content, 30)"></div>-->
          <dl>
            <dt>
              <i class="uis uis-heart color-pink"></i> {{item.recommendCount}}
              <i class="uil uil-eye"></i> {{item.view}}
            </dt>
            <dd>
              <i class="uil uil-clock-nine"></i> {{formatDate(item.writeDt)}}
            </dd>
          </dl>
        </div>
      </swiper-slide>
    </template>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import 'swiper/swiper-bundle.css'
import commonUtils from "@/utils/commonUtils";

export default {
  name: "MainPositionCard",
  props: ['list', 'type'],
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    getTitle () {
      switch (this.type) {
        case 0: return '탑';
        case 1: return '정글';
        case 2: return '미드';
        case 3: return '원딜';
        case 4: return '서폿';
        default: return ''
      }
    }
  },
  data() {
    return {
      MPswiperOption: {
        slidesPerView: 3,
        //centeredSlides: true,
        spaceBetween: '3.3%',
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          300: {
            slidesPerView: 1.5
          },
          480: {
            slidesPerView: 1.5
          },
          768: {
            slidesPerView: 2.5
          },
          992: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 3
          }
        }
      },
      no: -1
    }
  },
  methods: {
    go(id) {
      this.$router.push({
        path: '/position/view',
        query: {
          id: id
        }
      })
    },
    formatDate(dateStr) {
      return commonUtils.formatDate(dateStr);
    },
    truncateString(string, maxLength) {
      if (string.length <= maxLength) {
        return string;
      } else {
        return string.substring(0, maxLength) + "...";
      }
    }
  }
}
</script>

<style scoped>

</style>
