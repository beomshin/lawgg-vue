<template>
  <div class="board-gallery-list">
    <ul>
      <template v-for="(item, index) in lawFirms">
        <li :key="index" @click="go(item.lawFirmId)">
          <p><img :src="item.profile ? item.profile : defaultImage" width="100%" height="100%" alt="" title="" /></p>
          <h2>{{item.name}}</h2>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LawFirmIndexGalleryList",
  props: ['lawFirms'],
  data() {
    return {
      defaultImage: 'https://i.pinimg.com/564x/53/7f/ee/537fee1351057a3b3e77b9b7457920b4.jpg'
    }
  },
  methods: {
    go(id) {
      this.$router.push({ path: 'law-firm/list', query: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
