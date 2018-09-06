<!--<span @click="onToggle('alipay')"><toggle :toggle="alipayUse"  class="pointer"></toggle></span>-->
<!--위 태그 써서 사용. -->
<!--span은 toggle 내 click 이벤트 미동작으로 이용-->

<template>
  <div class="toggle-wrapper" :class="{'toggle-turn-off' : !toggle, 'toggle-turn-on' : toggle, }" @click="onToggle">
      <div class="circle-button"></div>
  </div>
</template>

<script>
    export default {
        name: "toggle",
        props :['toggle'],
        created () {
          console.log(this.toggle);
        },
        methods: {
            onToggle(item) {
                this.$emit('click', item);
            }
        }
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
        animation: turn-on  0.1s ease-out;
        background: #316ee4;
        padding-left: 25px;
    }
    @keyframes turn-on {
        0% {background: #c8c8c8; padding-left: 3px;}
        100% {background: #316ee4; padding-left: 25px;}
    }
    .toggle-turn-off {
        animation: turn-off  0.1s ease-in;
        background: #c8c8c8;
        padding-left: 3px;
    }
    @keyframes turn-off {
        0% {background: #316ee4; padding-left: 25px;}
        100% {background: #c8c8c8; padding-left: 3px;}
    }





</style>