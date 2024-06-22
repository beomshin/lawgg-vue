<template>
  <modal class="modal-area" name="modalMessageWrite" width="90%"  height="auto" :maxWidth="650" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>쪽지 작성</dt>
      <dd @click="$modal.hide('modalMessageWrite')"><i class="uil uil-times"></i></dd>
    </dl>

    <div class="ma-message-write">
      <ul>
        <li>
          <input id="test1" type="text" name="" title="" placeholder="수신자 닉네임" class="input-box w100p h60" v-model="receiver"/>
        </li>
        <li>
          <input id="test2" type="text" name="" title="" placeholder="제목" class="input-box w100p h60" v-model="title" />
        </li>
        <li>
          <textarea id="test3" cols="" rows="" placeholder="내용" class="w100p h200" v-model="content"></textarea>
        </li>
      </ul>
      <p>
        <button class="btn-default-m bg-pink w100" @click="post">전송하기</button>
        &nbsp;
        <button class="btn-default-m bg-black w100" @click="$modal.hide('modalMessageWrite')">닫기</button>
      </p>
    </div>
  </modal>
</template>

<script>
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";

export default {
  name: "MessageWriteModal",
  data() {
    return {
      receiver: '',
      title: '',
      content: ''
    }
  },
  methods: {
    post() {
      if (!verifyUtils.message2(this.receiver, this.title, this.content)) return
      this.$emit('post', {receiver: this.receiver, title: this.title, content: this.content})
      this.clear()
      this.$modal.hide('modalMessageWrite')
    },
    clear() {
      this.receiver = commonCont.EMPTY
      this.title = commonCont.EMPTY
      this.content = commonCont.EMPTY
    }
  }
}
</script>

<style scoped>

</style>
