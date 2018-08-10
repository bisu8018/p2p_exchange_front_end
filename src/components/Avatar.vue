<template>
  <span class="avatarWraaper">
    <span class="mainCircle" v-bind:style="{background: bgColor}">
      <span class="firstWord">{{name}}</span>
    </span>
    <div class="loginCircle" v-bind:style="{background: loginColor}">
    </div>
  </span>
</template>

<script>
    import AccountController from "../vuex/controller/AccountController";
    import AccountService from "@/service/account/AccountService";

    export default {
        name: "Avatar",
        props :['member_no'],
        data: () => ({
            loginColor : '',
            name : '',
            isLogin : false,
            bgColor : '',
        }),
        created() {
            this.getIsLogin();
        },
        mounted(){
            if(this.isLogin ===false){
                this.loginColor ='#C8C8C8';
            }
            else {
                this.loginColor ='#59D817';
            }
        },
        methods : {
            getIsLogin() {
                var self = this;
                AccountService.Account.isUserActive({
                        member_no: self.member_no  //VUEX userInfo.email
                    }, function (error) {
                      this.isLogin = result;
                    }
                )
            },
            // 유져 정보 AXIOS GET
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
    position: relative;
    margin-top: -8px;
    left: 24px;
    height: 10px;
    width: 10px;
    border-radius: 100%;
    border: solid 2px #ffffff;
  }

</style>