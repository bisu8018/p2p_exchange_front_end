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
        width: 60px;
        height: 28px;
        background: #c8c8c8;
        border-radius: 17px;
        padding-top: 3px;
        padding-left: 4px;
        display: inline-block;
    }

    .circle-button{
        background: white;
        border-radius: 17px;
        width: 21px;
        height: 21px;
    }

    .toggle-turn-on {
        background: #316ee4;
        padding-left: 35px;
    }



</style>