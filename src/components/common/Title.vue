<template>
  <dl class="title" ref="title">
    <dt>
      <h2>{{title[this.page]}}</h2>
      <h3 v-html="content[this.page]" />
    </dt>
  </dl>
</template>

<script>
export default {
  name: "Title",
  props: ['page'],
  data() {
    return {
      title: [
          '포지션게시판', '트라이얼', '로펌'
      ],
      content: [
        '각 포지션에서 다양한 이야기를 할 수 있는 자유게시판입니다. <br/> 클린한 커뮤니케이션을 위해 비방하는 게시물은 자제해주세요.',
        '트라이얼에 관한 다양한 이야기를 할 수 있는 게시판입니다.<br /> 클린한 커뮤니케이션을 위해 비방하는 게시물은 자제해주세요.',
        '로펌에 관한 다양한 이야기를 할 수 있는 게시판입니다.<br /> 클린한 커뮤니케이션을 위해 비방하는 게시물은 자제해주세요.'
      ]
    }
  },
  methods: {
    scrollBanner() {
      this.$refs.title.scrollIntoView()
    }
  }
}
</script>

<style scoped>

</style>
