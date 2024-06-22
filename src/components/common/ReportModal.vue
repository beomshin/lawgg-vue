<template>
  <modal class="modal-area" name="reportModal" width="90%"  height="auto" :maxWidth="650" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>신고하기</dt>
      <dd @click="close"><i class="uil uil-times"></i></dd>
    </dl>

    <div class="ma-message-write">
      <ul>
        <li>
          <input type="text" name="" title="" placeholder="신고 내용을 작성해주세요." class="input-box w100p h60" v-model="content" maxlength="64"/>
        </li>
      </ul>
      <p>
        <button class="btn-default-m bg-pink w100" @click="submit">신고하기</button>
        &nbsp;
        <button class="btn-default-m bg-black w100" @click="close">닫기</button>
      </p>
    </div>
  </modal>
</template>

<script>
export default {
  name: "ReportModal",
  data() {
    return {
      content: ''
    }
  },
  methods: {
    close() {
      this.content = ''
      this.$modal.hide('reportModal')
    },
    submit() {
      this.$emit('report', this.content)
      this.content = ''
      this.$modal.hide('reportModal')
    }
  }
}
</script>

<style scoped>

</style>
