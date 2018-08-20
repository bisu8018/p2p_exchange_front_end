<template>
  <div class="avatarWraaper">
    <span class="mainCircle" v-bind:style="{background: bgColor}">
      <span class="firstWord">{{name}}</span>
    </span>
    <div class="loginCircle" v-bind:style="{background: loginColor}">
    </div>
  </div>
</template>

<script>
    import AccountService from "@/service/account/AccountService";
    import MainRepository from "../vuex/MainRepository";

    export default {
        name: "Avatar",
        props: ['email', 'me'],
        data: () => ({
            loginColor: '#c8c8c8',
            name: '',
            bgColor: '',
        }),
        created() {
            let self = this;
            if (this.me === true) {
                this.loginColor = '#59D817';
                this.name = MainRepository.MyInfo.getUserInfo().nickname === '' ? 'A' : MainRepository.MyInfo.getUserInfo().nickname[0];
                this.bgColor = MainRepository.MyInfo.getUserInfo().bgColor;
            } else {
                //유저 정보 GET AXIOS
                MainRepository.Users.getOtherUsers(this.email, function (result) {
                    let otherUsersInfo = result ;
                    self.bgColor = otherUsersInfo.bgColor;
                    self.name = otherUsersInfo.nickName === '' ? 'A' : otherUsersInfo.nickName[0];
                    self.getIsLogin()
                });

                //3분마다 로그인 확인 갱신
                setInterval(function () {
                    self.getIsLogin();
                },108000)

            }
        },
        mounted() {

        },
        methods: {
            getIsLogin() {
                let self = this;
              MainRepository.Users.isUserActive({
                  email : self.email
              },function (result) {
                  return result
              })
            },
        }
    }
</script>

<style scoped>

    .avatarWraaper {
        position: relative;
        height: 34px;
        width: 34px;
        display: inline-block;
        vertical-align: middle;
    }

    .mainCircle {
        height: 34px;
        width: 34px;
        border-radius: 100%;
        align-items: center;
        display: flex;
    }

    .firstWord {
        margin-left: auto;
        margin-right: auto;
        color: #ffffff;
        font-size: 16px;
        line-height: 16px;
        text-transform: uppercase;
    }

    .loginCircle {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 10px;
        width: 10px;
        border-radius: 100%;
        border: solid 2px #ffffff;
    }

</style>