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
    import AccountService from "@/service/account/AccountService";
    import MainRepository from "../vuex/MainRepository";

    export default {
        name: "Avatar",
        props: ['email', 'me'],
        data: () => ({
            loginColor: '',
            name: '',
            bgColor: '',
        }),
        created() {
            let self = this;
            if (this.me === true) {
                this.loginColor = '#59D817';
                this.name = MainRepository.Login.getUserInfo().nickname === '' ? 'A' : MainRepository.Login.getUserInfo().nickname[0];
                this.bgColor = MainRepository.Login.getUserInfo().bgColor;
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
                var self = this;
                AccountService.Account.isUserActive({
                        email: self.email  //VUEX userInfo.email
                    }, function (result) {
                        if (result === false) {
                            self.loginColor = '#C8C8C8';
                        }
                        else {
                            self.loginColor = '#59D817';
                        }
                    }
                )
            },
        }
    }
</script>

<style scoped>

    .avatarWraaper {

        position: relative;
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
    }

    .loginCircle {
        position: relative;
        margin-top: -8px;
        left: 24px;
        height: 10px;
        width: 10px;
        border-radius: 100%;
        border: solid 2px #ffffff;
    }

</style>