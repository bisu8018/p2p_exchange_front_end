<template>
    <div class="avatarWraaper" :class="{ 'avatar_wraaper_big' : big }">
    <span class="mainCircle" v-bind:style="{background: bgColor}">
      <span class="firstWord">{{ nickname }}</span>
    </span>
        <div class="loginCircle" v-bind:style="{background: loginColor}">
        </div>
        <div v-if="chat !== '' && msgAvatar"></div>
        <div v-else-if="me && myInfo"></div>
    </div>
</template>

<script>
    import MainRepository from "../vuex/MainRepository";

    export default {
        name: "Avatar",
        props: {
            email: {    // 메일 전달
                type: String,
                default: ''
            },
            me: {       // 자신 아바타
                type: Boolean,
                default: false
            },
            chat: {     // BUY/SELL : main, sub     OPEN CHAT : memberList
                type: String,
                default: '',
            },
            big: {      // 큰 아바타
                type: Boolean,
                default: false
            },
            useMemberInfo: {        // Trade Center 전용
                type: Boolean,
                default: false
            },
            member: {}      // Trade Center, Open Chat MemberList
        },
        data() {
            return {
                loginColor: '#c8c8c8',
                nickname: '',
                bgColor: '#7f7f7f',
                msgInterval: {},
            }
        },
        watch: {
            email() {
                this.init();
            },
            member() {
                this.init();
            },
        },
        computed: {
            msgAvatar() {
                let avatarInfo =MainRepository.Message.msgAvatar().get();
                console.log(avatarInfo)
                this.bgColor = avatarInfo.bgColor;
                this.nickname = avatarInfo.nickname;

                if(this.chat === 'sub'){
                    this.loginColor = avatarInfo.isLogin ? '#59D817' : '#c8c8c8';
                }
                return avatarInfo;
            },
            myInfo() {
                if (this.me) {
                    this.setAvatar(
                        MainRepository.MyInfo.getUserInfo().nickname === '' ? 'A' : MainRepository.MyInfo.getUserInfo().nickname[0],
                        MainRepository.MyInfo.getUserInfo().bgColor,
                        true,
                    )
                }
                return MainRepository.MyInfo.getUserInfo();
            },
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            clearInterval(this.msgInterval);
        },
        methods: {
            init() {
                // 내 아바타일 때
                if (this.me) {
                    this.setAvatar(
                        MainRepository.MyInfo.getUserInfo().nickname === '' ? 'A' : MainRepository.MyInfo.getUserInfo().nickname[0],
                        MainRepository.MyInfo.getUserInfo().bgColor,
                        true,
                    )
                } else {
                    // TradeCenter Item
                    if (this.useMemberInfo) {
                        this.setAvatar(
                            this.member.nickname === '' ? 'A' : this.member.nickname[0],
                            this.member.bgColor,
                            this.member.isActive
                        )
                    } else if (this.chat === 'sub') {
                        // 채팅 모드 : Sub -> Main Avatar 정보를 불러온다.
                        let _msgAvatar = MainRepository.Message.msgAvatar().get();
                        this.setAvatar(
                            _msgAvatar.nickname,
                            _msgAvatar.bgColor,
                            _msgAvatar.isLogin
                        );
                    } else if (this.chat === 'memberList'){
                        let memberList = MainRepository.Chat.controller().getChatMembers();
                        let user = memberList.find((element) => {
                            return element.name === this.member.name;
                        });

                        this.setAvatar(
                            this.member.name[0],
                            this.member.bgColor,
                            user ? true : false,
                        )
                    } else {
                        // 로그인 상태 요청
                        MainRepository.Users.getOtherUsers(this.email, (userInfo) => {
                            this.setAvatar(
                                userInfo.nickName === '' ? 'A' : userInfo.nickName[0],
                                userInfo.bgColor,
                                false
                            );
                            // 채팅일 경우 -> MsgAvatar 에 저장
                            if (this.chat === 'main') {
                                MainRepository.Message.msgAvatar().set({
                                    email: this.email,
                                    nickname: this.nickname,
                                    bgColor: this.bgColor
                                })
                            }
                            this.initInterval();
                        });
                    }
                }
            },
            setAvatar(nickname, bgColor, isLogin) {
                this.nickname = nickname;
                this.bgColor = bgColor;
                this.loginColor = isLogin ? '#59D817' : '#c8c8c8';
            },
            //3분마다 로그인 확인 갱신
            initInterval() {
                // 1회 바로 실행
                this.checkLogin();

                // 이후 3분마다 로그인 확인
                this.msgInterval = setInterval(() => {
                    this.checkLogin();
                }, 180000)
            },
            checkLogin() {
                MainRepository.Users.isUserActive({
                    email: this.email
                }, (result) => {
                    if (this.chat === 'main') {
                        MainRepository.Message.msgAvatar().update({ isLogin: result })

                    }
                        this.loginColor = result ? '#59D817' : '#c8c8c8';

                });
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