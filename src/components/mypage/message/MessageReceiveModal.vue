<template>
  <modal class="modal-area" name="modalMessageView" width="90%"  height="auto" :maxWidth="650" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>{{replyFlag ? '쪽지 작성' : '쪽지 내용'}}</dt>
      <dd @click="$modal.hide('modalMessageView')"><i class="uil uil-times"></i></dd>
    </dl>

    <template v-if="!replyFlag">
      <div class="ma-message-view">
        <h2>{{receiveData.title}} (발신인 : {{receiveData.nickName}})</h2>
        <div v-html="receiveData.content">
        </div>
        <p>
          <button class="btn-default-m bg-pink w100" @click="reply">답하기</button>
          &nbsp;
          <button class="btn-default-m bg-black w100" @click="$modal.hide('modalMessageView')">닫기</button>
        </p>
      </div>
    </template>

    <template  v-else-if="replyFlag">
      <div class="ma-message-write">
        <ul>
          <li>
            <input type="text" name="" title="" placeholder="수신자 닉네임" :value="receiveData.nickName" disabled class="input-box w100p h60" />
          </li>
          <li>
            <input type="text" name="" title="" placeholder="제목" class="input-box w100p h60" v-model="title"/>
          </li>
          <li>
            <textarea cols="" rows="" placeholder="내용" class="w100p h200" v-model="content"></textarea>
          </li>
        </ul>
        <p>
          <button class="btn-default-m bg-pink w100" @click="post">전송하기</button>
          &nbsp;
          <button class="btn-default-m bg-black w100" @click="$modal.hide('modalMessageView')">닫기</button>
        </p>
      </div>
    </template>
  </modal>
</template>

<script>
import verifyUtils from "@/utils/verifyUtils";
import commonCont from "@/constants/commonCont";

export default {
  name: "MessageReceiveModal",
  data() {
    return {
      title: '',
      content: ''
    }
  },
  props: ['receiveData', 'replyFlag'],
  methods: {
    reply() {
      this.title = commonCont.EMPTY
      this.content = commonCont.EMPTY
      this.$emit('reply')
    },
    post() {
      if (!verifyUtils.message(this.title, this.content)) return
      this.$emit('post', {receiver: this.receiveData.nickName, title: this.title, content: this.content})
      this.$modal.hide('modalMessageView')
    },
  }
  }
</script>

<style scoped>

</style>
