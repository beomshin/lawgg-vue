<template>
  <div class="main-position">
    <div>
      <h2>포지션 게시판</h2>
      <h3>매일 매일 쌓이는 이야기 포지션 게시판!!</h3>
      <p>
        <button :class="{'active': type == 0}" @click="change(0)">탑</button>
        <button :class="{'active': type == 1}" @click="change(1)">정글</button>
        <button :class="{'active': type == 2}" @click="change(2)">미드</button>
        <button :class="{'active': type == 3}" @click="change(3)">원딜</button>
        <button :class="{'active': type == 4}" @click="change(4)">서폿</button>
      </p>
      <main-position-card v-if="type == 0" :list.sync="top" :type="type"/>
      <main-position-card v-else-if="type == 1" :list.sync="jungle" :type="type"/>
      <main-position-card v-else-if="type == 2" :list.sync="mid" :type="type"/>
      <main-position-card v-else-if="type == 3" :list.sync="bot" :type="type"/>
      <main-position-card v-else-if="type == 4" :list.sync="spt" :type="type"/>
    </div>
  </div>
</template>

<script>
import MainPositionCard from "@/components/home/MainPositionCard";

export default {
  name: "MainPosition",
  props:['top','jungle','mid','bot','spt'],
  data() {
    return {
      type: 0
    }
  },
  components: {
    MainPositionCard,
  },
  methods: {
    change(type) {
      this.type = type
    },
  }
}
</script>

<style scoped>

</style>
