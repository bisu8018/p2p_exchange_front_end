<template>
  <span class="avatarWraaper">
    <span class="mainCircle" v-bind:style="{background: color}">
      <span class="firstWord">{{name}}</span>
    </span>
    <div class="loginCircle" v-bind:style="{background: loginColor}">
    </div>
  </span>
</template>

<script>
    export default {
        name: "Avatar",
        props :{
            name : {
                type: String,
                default : ''
            },
            isLogin :{
                type: Boolean,
                default : false
            },
            color :{},
        },
        data: () => ({
            loginColor : '#C8C8C8'
        }),
        mounted(){
            if(this.isLogin ===false){
                this.loginColor ='#C8C8C8';
            }
            else {
                this.loginColor ='#59D817';
            }

        }

    }
</script>

<style scoped>

  .avatarWraaper{

    position : relative;
  }
  .mainCircle{
    height: 34px;
    width: 34px;
    border-radius: 100%;
    align-items: center;
    display: flex;


}
  .firstWord{
    margin-left: auto;
    margin-right: auto;
    color: #ffffff;
    font-size: 16px;
  }
  .loginCircle{
    position: absolute;
    top: 24px;
    left: 24px;
    height: 10px;
    width: 10px;
    border-radius: 100%;
    border: solid 2px #ffffff;
  }

</style>