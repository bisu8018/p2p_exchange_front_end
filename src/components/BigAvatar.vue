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
        name: "BigAvatar",
        props: ['email', 'me'],
        data: () => ({
            loginColor: '',
            name: '',
            bgColor: '',
        }),
        created() {
            var self = this;
            if (this.me === true) {
                this.loginColor = '#59D817';
                this.name = MainRepository.MyInfo.getUserInfo().nickname === '' ? 'A' : MainRepository.MyInfo.getUserInfo().nickname[0];
                this.bgColor = MainRepository.MyInfo.getUserInfo().bgColor;
            } else {
                //유저 정보 GET AXIOS
                const otherUsersInfo = MainRepository.Users.getOtherUsers();
                this.bgColor = otherUsersInfo.bgColor;
                this.name = otherUsersInfo.nickName === '' ? 'A' : otherUsersInfo.nickName[0];

                //3분마다 로그인 확인 갱신
                setInterval(function () {
                    self.getIsLogin();
                },108000)

            }
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

  .avatarWraaper{
    position: relative;
    display: inline-block;
  }
  .mainCircle{
    height: 42px;
    width: 42px;
    border-radius: 100%;
    align-items: center;
    display: flex;


  }
  .firstWord{
    margin-left: auto;
    margin-right: auto;
    color: #ffffff;
    font-size: 22px;
    text-transform: uppercase;
  }
  .loginCircle{
    position: absolute;
    bottom: 0;
    right: 0;
    height: 14px;
    width: 14px;
    border-radius: 100%;
    border: solid 3px #ffffff;
  }

</style>