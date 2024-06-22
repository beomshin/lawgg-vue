<template>
  <modal class="modal-area" name="trialEndLive" width="90%"  height="auto" :maxWidth="650" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>재판 종료하기</dt>
      <dd @click="close"><i class="uil uil-times"></i></dd>
    </dl>

    <div class="ma-message-write">
      <ul>
        <select name="" class="w80" v-model="precedent">
          <option value="0">원고승</option>
          <option value="1">피고승</option>
        </select>
      </ul>
      <p>
        <button class="btn-default-m bg-pink w100" @click="submit">종료하기</button>
        &nbsp;
        <button class="btn-default-m bg-black w100" @click="close">닫기</button>
      </p>
    </div>
  </modal>
</template>

<script>


import UpdateEndTrialRequestDto from "@/dto/trial/request/trial/UpdateEndTrialRequestDto";
import service from "@/http/service";
import commonUtils from "@/utils/commonUtils";

export default {
  name: "TrialLiveEndModal",
  props: ['id'],
  data() {
    return {
      precedent: 0
    }
  },
  methods: {
    close() {
      this.url = ''
      this.$modal.hide('trialEndLive')
    },
    submit() {
      this.$modal.hide('trialEndLive')
      const param = new UpdateEndTrialRequestDto(this.id, this.precedent)
      service.updateEndTrial(param).then(res => {
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          this.$emit('endTrial', this.precedent)
          alert('재판을 종료하였습니다.')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
