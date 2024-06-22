<template>
  <modal class="modal-area" name="modalServiceInfo" width="90%"  height="auto" :maxWidth="450" :adaptive="true" :scrollable="true">
    <dl class="ma-header">
      <dt>서비스 소개</dt>
      <dd @click="$modal.hide('modalServiceInfo')"><i class="uil uil-times"></i></dd>
    </dl>

    <div class="ma-terms">
      <h3>소개</h3>
      <div>
        로우지지는 게임에 열정과 심혈을 기울이는 진성 게이머들을 위하여 본인들의 게임 플레이를 검토하고 서로 간의 피드백을 받아 의견을 나누며 토의할 수 있는 게임 커뮤니티 플랫폼입니다.<br><br>

        현 21세기에서 온라인 게임은 그저 취미가 아닌 스포츠의 한 종류이자 누군가에게는 열정, 청춘을 넘어 인생 그 자체로 정의를 내릴 수 있을지도 모릅니다.<br><br>

        그런 사람들이 좀 더 자신의 실력을 증진하기 위해 또는 더 많은 정보를 알고 함께 경험하기를 바라며 이 서비스를 시작하였습니다.<br><br>

        단 한 명에게라도 본인이 게이머로서 가고 있는 길의 방향이 틀리지 않다는 것을 이 서비스를 통해 확신을 가질 수 있다면 그것만으로 로우지지의 존재 의의가 있다고 생각합니다.<br><br>

        우리는, 그들에게 그러한 경험들을 제공하는 서비스를 목표로 하고 있습니다.
      </div>

      <h3>* 부칙</h3>
      <div>
        LAW,GG 사용자 규범에 대해 질문이 있거나 약관에 따라 LAW,GG에 문의해야 할 경우 LAW,GG 고객센터: 070-7954-9511 로 연락하시기 바랍니다.<br><br>
        첫 시행일자 : 2023-06-27<br />
        시행일자 : 2023-07-04
      </div>

    </div>
  </modal>
</template>

<script>
export default {
  name: "ServiceInfoModal"
}
</script>

<style scoped>

</style>
