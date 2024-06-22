<template>
  <div class="wrap">
    <Header></Header>
    <keep-alive>
      <component :is="this.$route.meta.title" />
    </keep-alive>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/layout/common/Header";
import Footer from "@/layout/common/Footer";
import TrialList from '@/views/trial/List'
import TrialWrite from '@/views/trial/Write'
import TrialView from '@/views/trial/View'
import TrialDelete from '@/views/trial/Delete'

export default {
  name: "TrialLayout",
  components: {
    Header,
    Footer,
    TrialList,
    TrialWrite,
    TrialView,
    TrialDelete
  }
}
</script>

<style scoped>


</style>
