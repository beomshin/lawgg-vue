<template>
  <div class="main-trial">
    <div>
      <h2>트라이얼</h2>
      <h3>전문가들이 알려주는 제대로된 트라이얼!!</h3>
      <ul v-if="trials">
        <template v-for="(trial, index) in trials">
          <li v-on:click="goDetail(trial.id)" :key="index">
            <p><img src="https://i.pinimg.com/564x/ad/10/8f/ad108f8e82285778b9aa86adbbc4fc09.jpg" width="100%" alt="" title="" /></p>
            <div>
              <h2>{{truncateString(trial.title,19)}}</h2>
<!--              <h3 v-html="truncateString(trial.content,30)"></h3>-->
              <dl>
                <dt><i class="uil uil-clock-two"></i> {{formatDate(trial.writeDt)}}</dt>
                <dd>
                  <span><img src="https://i.pinimg.com/564x/b0/2e/50/b02e506b0a3e5f11fada6dd24c179132.jpg" width="100%" alt="" title="" /></span>
                  <em>{{trial.writer}}</em>
                </dd>
              </dl>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import commonUtils from "@/utils/commonUtils";

export default {
  name: "MainTrial",
  props: ['trials'],
  methods: {
    goDetail(id) {
      this.$router.push({
        path: '/trial/view',
        query: {
          id: id
        }
      })
    },
    truncateString(string, maxLength) {
      if (string.length <= maxLength) {
        return string;
      } else {
        return string.substring(0, maxLength) + "...";
      }
    },
    formatDate(dateStr) {
      return commonUtils.formatDate(dateStr);
    },
  }
}
</script>

<style scoped>

</style>
