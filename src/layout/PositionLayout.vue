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
import PositionList from "@/views/position/List"
import PositionView from '@/views/position/View'
import PositionWrite from '@/views/position/Write'
import PositionPasswordDelete from '@/views/position/Delete'
import PositionEdit from '@/views/position/Edit'

export default {
  name: "PositionLayout",
  components: {
    Header,
    Footer,
    PositionList,
    PositionView,
    PositionWrite,
    PositionPasswordDelete,
    PositionEdit
  }
}
</script>

<style scoped>

</style>
