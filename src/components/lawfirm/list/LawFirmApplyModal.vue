<template>
  <modal class="modal-area" name="applyLawFirm" width="90%"  height="auto" :maxWidth="650" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>로펌 신청하기</dt>
      <dd @click="close"><i class="uil uil-times"></i></dd>
    </dl>

    <div class="ma-message-write">
      <ul>
        <li>
          <input type="text" name="" title="" placeholder="수신인" class="input-box w100p h60" :value="repName" disabled/>
        </li>
        <li>
          <input type="text" name="" title="" placeholder="제목을 작성해주세요." class="input-box w100p h60" v-model="title" maxlength="64"/>
        </li>
        <li>
          <textarea cols="" rows="" placeholder="자신을 소개하는 글을 작성해주세요." class="w100p h200" v-model="content" maxlength=512></textarea>
        </li>
      </ul>
      <p>
        <button class="btn-default-m bg-pink w100" @click="applyLawfirm">신청하기</button>
        &nbsp;
        <button class="btn-default-m bg-black w100" @click="close">닫기</button>
      </p>
    </div>
  </modal>
</template>

<script>
import service from "@/http/service";
import ApplyLawFirmRequestDto from "@/dto/lawFirm/request/ApplyLawFirmRequestDto";
import commonUtils from "@/utils/commonUtils";

export default {
  name: "LawFirmApplyModal",
  props: ['repName', 'id'],
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    applyLawfirm() {
      this.$modal.hide('applyLawFirm')
      service.applyLawFirm(new ApplyLawFirmRequestDto(this.id, this.title, this.content)).then(res => {
        if (commonUtils.globalCheckResultCode(res.data.resultCode)) {
          this.$emit('successApplyLawFirm')
          this.close()
          alert('로펌 신청을 성공했습니다.')
        }
      }).catch(() => alert('로펌 신청을 실패했습니다.'))
    },
    close() {
      this.title = ''
      this.content = ''
      this.$modal.hide('applyLawFirm')
    }
  }
}
</script>

<style scoped>

</style>
