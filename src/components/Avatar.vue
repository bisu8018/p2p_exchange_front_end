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
        props: {
            email: {
                type: String,
                default: ''
            },
            me: {
                type: Boolean,
                default: false
            },
            chat: {
                type: String,
                default: '',
            }
        },
        data: () => ({
            loginColor: '#c8c8c8',
            name: '',
            bgColor: '',
            msgInterval: {},
        }),
        created() {
            let self = this;
            if(this.chat === ''){
                if (this.me === true) {
                    this.loginColor = '#59D817';
                    this.name = MainRepository.MyInfo.getUserInfo().nickname === '' ? 'A' : MainRepository.MyInfo.getUserInfo().nickname[0];
                    this.bgColor = MainRepository.MyInfo.getUserInfo().bgColor;
                } else if(this.me === false){
                    //유저 정보 GET AXIOS
                    MainRepository.Users.getOtherUsers(this.email, function (result) {
                        let otherUsersInfo = result;
                        self.bgColor = otherUsersInfo.bgColor;
                        self.name = otherUsersInfo.nickName === '' ? 'A' : otherUsersInfo.nickName[0];
                        self.getIsLogin();
                    });

                    //3분마다 로그인 확인 갱신
                    this.msgInterval = setInterval(function () {
                        self.getIsLogin();
                    }, 180000)

                }
            } else {
                if(this.chat === 'main'){
                    MainRepository.Users.getOtherUsers(this.email, (result) => {
                        let otherUsersInfo = result;
                        self.bgColor = otherUsersInfo.bgColor;
                        self.name = otherUsersInfo.nickName === '' ? 'A' : otherUsersInfo.nickName[0];
                        MainRepository.Message.setMsgAvatar(new {
                            name : self.name,
                            bgColor : self.bgColor
                        },function () {
                            self.msgInterval = setInterval(function () {
                                self.getIsLogin();
                            }, 180000)
                        })
                    });
                }else{
                    this.bgColor = MainRepository.Message.getMsgAvatar().bgColor;
                    this.name = MainRepository.Message.getMsgAvatar().name;
                }
            }

        },
        mounted() {

        },
        beforeDestroy() {
            clearInterval(this.msgInterval);
        },
        methods: {
            getIsLogin() {
                let self = this;
                MainRepository.Users.isUserActive({
                    email: self.email
                }, function (result) {
                    if(self.me === false && self.chat === 'main'){

                        MainRepository.Message.updateMsgAvatar({
                            isLogin : result
                        },function () {
                            
                        })
                    }
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