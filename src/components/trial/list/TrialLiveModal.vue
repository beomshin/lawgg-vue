<template>
  <modal class="modal-area" name="trialLive" width="90%"  height="auto" :maxWidth="650" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>실시간 재판 시작하기</dt>
      <dd @click="close"><i class="uil uil-times"></i></dd>
    </dl>

    <div class="ma-message-write">
      <ul>
        <li>
          <input type="text" name="" title="" placeholder="실시간 스트리밍 주소를 넣어주세요." class="input-box w100p h60" v-model="url" maxlength="64"/>
        </li>
      </ul>
      <p>
        <button class="btn-default-m bg-pink w100" @click="submit">시작하기</button>
        &nbsp;
        <button class="btn-default-m bg-black w100" @click="close">닫기</button>
      </p>
    </div>
  </modal>
</template>

<script>

import service from "@/http/service";
import UpdateLiveTrialRequestDto from "@/dto/trial/request/comment/UpdateLiveTrialRequestDto";
import commonUtils from "@/utils/commonUtils";

export default {
  name: "TrialLiveModal",
  props: ['id'],
  data() {
    return {
      url: ''
    }
  },
  methods: {
    close() {
      this.url = ''
      this.$modal.hide('trialLive')
    },
    submit() {
      const param = new UpdateLiveTrialRequestDto(this.id, this.url);
      service.updateLiveTrial(param).then(res => {
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          alert('재판을 시작하였습니다.')
          this.$emit('startLive', this.url)
          this.$modal.hide('trialLive')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
