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
import LawFirmIndex from '@/views/lawfirm/Index'
import LawFirmList from '@/views/lawfirm/List'
import LawFirmPositionView from '@/views/position/View'
import LawFirmPositionPasswordDelete from '@/views/position/Delete'
import LawFirmPositionEdit from '@/views/position/Edit'
import LawFirmTrialView from '@/views/trial/View'
import LawFirmTrialDelete from '@/views/trial/Delete'
import LawFirmPositionWrite from '@/views/position/Write'
import LawFirmTrialWrite from '@/views/trial/Write'

export default {
  name: "LawFirmLayout",
  components: {
    Header,
    Footer,
    LawFirmIndex,
    LawFirmList,
    LawFirmPositionView,
    LawFirmPositionPasswordDelete,
    LawFirmPositionEdit,
    LawFirmPositionWrite,
    LawFirmTrialView,
    LawFirmTrialDelete,
    LawFirmTrialWrite
  }
}
</script>

<style scoped>

</style>
