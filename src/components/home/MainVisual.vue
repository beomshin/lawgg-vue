<template>
  <div class="main-visual">
    <dl>
      <dt>
       
        <h2>당신의 티어를 제대로 한번 올리고 싶다면?</h2>
        <h3>오늘의 <span>HOT</span> 트라이얼</h3>
        <h4>제목 :{{ hot.title }} </h4>
        <div v-html="shortenwords(hot.content)"/>
        <p @click="go(hot.id)" ><button style="cursor: pointer">More <i class="uil uil-arrow-right"></i></button></p>
      </dt>
      <dd>
      <div v-if="!hot.altVideoUrl || hot.altVideoUrl.length == 0">
        <iframe width="100%" height="300"  :src="hot.playVideo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div v-else>
        <iframe width="100%" height="300"  :src="hot.altVideoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "MainVisual",
  props: ['hot'],
  data() {
    return {
    }
  },
  mounted() {

  },

  methods: {
    go(id) {
      this.$router.push({ path: 'trial/view',  query: { id: id } })
    },
    shortenwords(text){
      if (text && text.length > 130) {
        return text.substr(0, 130) + "...";
      } else {
        return text;
      }
    },

  }
}
</script>

<style scoped>

</style>
