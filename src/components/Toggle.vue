<!--<span @click="onToggle('alipay')"><toggle :toggle="alipayUse"  class="pointer"></toggle></span>-->
<!--위 태그 써서 사용. -->
<!--span은 toggle 내 click 이벤트 미동작으로 이용-->

<template>
  <div class="toggle-wrapper" v-bind:class="{'toggle-turn-on' : toggle}">
      <div class="circle-button"></div>
  </div>
</template>

<script>
    export default {
        name: "toggle",
        props :['toggle'],
    }
</script>

<style scoped>

    .toggle-wrapper {
        width: 48px;
        height: 26px;
        background: #c8c8c8;
        border-radius: 17px;
        padding-top: 3px;
        padding-left: 3px;
        display: inline-block;
        vertical-align: middle;
    }

    .circle-button{
        background: white;
        border-radius: 17px;
        width: 20px;
        height: 20px;
    }

    .toggle-turn-on {
        background: #316ee4;
        padding-left: 25px;
    }



</style>