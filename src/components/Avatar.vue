<template>
    <div class="avatarWraaper" :class="{ 'avatar_wraaper_big' : big }">
    <span class="mainCircle" v-bind:style="{background: bgColor}">
      <span class="firstWord">{{name}}</span>
    </span>
        <div class="loginCircle" v-bind:style="{background: loginColor}">
        </div>
        <div v-if="chat !== '' && msgAvatar"></div>
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
            },
            big: {
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            loginColor: '#c8c8c8',
            name: '',
            bgColor: '',
            msgInterval: {},
        }),
        computed: {
            msgAvatar() {
                this.bgColor = MainRepository.Message.getMsgAvatar().bgColor;
                this.name = MainRepository.Message.getMsgAvatar().name;
                return MainRepository.Message.getMsgAvatar();
            },
        },
        created() {
            let self = this;
            if(this.chat === '') {
                if (this.me) {
                    this.loginColor = '#59D817';
                    this.name = MainRepository.MyInfo.getUserInfo().nickname === '' ? 'A' : MainRepository.MyInfo.getUserInfo().nickname[0];
                    this.bgColor = MainRepository.MyInfo.getUserInfo().bgColor;
                } else {
                    //유저 정보 GET AXIOS
                    MainRepository.Users.getOtherUsers(this.email, function (result) {
                        let otherUsersInfo = result;
                        self.bgColor = otherUsersInfo.bgColor;
                        self.name = otherUsersInfo.nickName === '' ? 'A' : otherUsersInfo.nickName[0];
                        self.getIsLogin();
                    });
                    //3분마다 로그인 확인 갱신
                    this.initInterval();
                }
            } else {
                if(this.chat === 'main'){
                    MainRepository.Users.getOtherUsers(this.email, (result) => {
                        let otherUsersInfo = result;
                        self.bgColor = otherUsersInfo.bgColor;
                        self.name = otherUsersInfo.nickName === '' ? 'A' : otherUsersInfo.nickName[0];
                        MainRepository.Message.setMsgAvatar({
                            name : self.name,
                            bgColor : self.bgColor
                        })
                        self.initInterval();
                    });
                }
            }
        },
        mounted() {

        },
        beforeDestroy() {
            clearInterval(this.msgInterval);
        },
        methods: {
            //3분마다 로그인 확인 갱신
            initInterval() {
                this.msgInterval = setInterval(function () {
                    self.getIsLogin();
                }, 180000)
            },
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
    /*  Big Size */
    .avatar_wraaper_big {
        height: 42px;
        width: 42px;
    }
    .avatar_wraaper_big .mainCircle {
        height: 42px;
        width: 42px;
        border-radius: 100%;
        align-items: center;
        display: flex;
    }
    .avatar_wraaper_big .firstWord {
        margin-left: auto;
        margin-right: auto;
        color: #ffffff;
        font-size: 22px;
        text-transform: uppercase;
    }
    .avatar_wraaper_big .loginCircle{
        position: absolute;
        bottom: 0;
        right: 0;
        height: 14px;
        width: 14px;
        border-radius: 100%;
        border: solid 3px #ffffff;
    }

</style>