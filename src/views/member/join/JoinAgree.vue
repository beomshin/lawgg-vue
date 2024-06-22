<template>
  <div class="content">

    <!-- 회원관련 - 타이틀 -->
    <member-title :page="0" />
    <!-- 회원관련 - 타이틀 끝 -->

    <!-- 약관동의 -->
    <div class="join-agreement">
      <ul>
        <li>
          <dl>
            <dt>
              <div class="check-box">
                <input type="checkbox" name="opt" id="chk" :checked="agree" @click="updateAll"/>
                <label for="chk">네, 모두 동의합니다.</label>
              </div>
            </dt>
            <dd></dd>
          </dl>
        </li>

        <template v-for="(item, index) in this.agrees" >
          <li :key="index">
            <dl>
              <dt>
                <div class="check-box">
                  <input type="checkbox" name="opt" :id="`chk${index}`" v-model="item.val" />
                  <label :for="`chk${index}`">{{item.title}}</label>
                </div>
              </dt>
              <dd @click="$modal.show(item.modalName)">보기</dd>
            </dl>
          </li>
        </template>

      </ul>
      <p>
        <a class="btn-default-b bg-black w100p" @click="next">동의</a>
      </p>
    </div>
    <!-- 약관동의 끝 -->
  </div>
</template>

<script>
import MemberTitle from "@/components/member/join/MemberTitle";
export default {
  name: "MemberJoinAgree",
  components: {MemberTitle},
  data () {
    return {
      agrees: [
        {
          val: false,
          title: '로우지지 이용약관 (필수)',
          modalName: 'modalTerms'
        },
        {
          val: false,
          title: '개인정보 수집 및 이용 동의 (필수)',
          modalName: 'modalPersonalTerms'
        }
      ]
    }
  },
  computed: {
    agree() {
      return !this.agrees.find(it => {return it.val == false })
    }
  },
  methods: {
    next() {
      if (!this.agree) {
        alert('약관 동의를 해주세요.')
        return
      }
      this.$router.push({ path: '/join/register'})
    },
    updateAll () {
      let flag = !this.agree
      this.agrees.map(e => { e.val = flag })
    }
  }
};
</script>
