<!--사용법-->
<!--<chat :orderNo="orderNo" :merchant_member_no="merchant_member_no" :customer_member_no="customer_member_no"></chat>-->


<template>
    <div :class="[isMobile() ? 'chat-wrapper-xs' : 'chat-wrapper-md']">


        <!--상대방 정보-->
        <div style="border-bottom: 1px solid #d1d1d1; height: 82px; display: flex">
            <div class="pl-3 pr-3 pt-4 pb-4 " >
                <avatar v-if="counterPartyEmail != ''"  :email=counterPartyEmail  :chat="'main'"/>
            </div>

            <div class="text-xs-left pt-twenty">
                <span class="h5 bold color-black c-pointer" @click="goUserPage">{{ counterPartyNickname }}</span><br>
                <!--30일간 거래 횟수-->
                <span class="h6 color-darkgray">{{ $str('Trades_in_30_days') }} : {{ transactionNum }}</span>
            </div>

            <v-spacer></v-spacer>

            <!--휴대폰 번호 공유-->
            <!--정확한 용도 및 필요성 부재-->

            <!--<div class="pt-4a pr-3 pl-3">-->
                <!--<i class="material-icons color-darkgray c-pointer">stay_current_portrait</i>-->
            <!--</div>-->
        </div>



        <!--채팅 내용-->
        <div class="contents-wrapper pr-3 pl-3 pt-4 pb-4" id="contentsWrapper" v-on:scroll.passive="scrollEvent">
            <div v-for="data in messageList">

                <!--시스템 메세지-->
                <div v-if="data.systemMessage" class="mb-4">
                    <div class="h6 color-darkgray pb-2 line-height-full">
                        {{ getTime(data.registerDatetime) }}
                        <!--<span>{{ getDateTime('date') }}</span>-->
                    </div>
                    <div class="system-content-wrapper color-black h6"
                         v-if="data.attachedImgUrl === '' && data.systemMessage">
                        {{ getSystemMsg(data.message) }}
                    </div>
                </div>


                <!--일반 메세지-->
                <div v-else>

                    <!--상대방-->
                    <div class="mb-4 display-flex" v-if="data.mine === false ">
                        <div v-if="!data.systemMessage">
                            <avatar v-if="counterPartyEmail !== ''"  :email=counterPartyEmail  :chat="'sub'"/>
                        </div>
                        <div v-else class="none-avatar"></div>
                        <div class="pl-2">
                            <div class="h6 color-darkgray pb-1 line-height-full text-xs-left">
                                {{ getTime(data.registerDatetime) }}
                                <!--<span>{{ getDateTime('date') }}</span>-->
                            </div>
                            <div class="chat-content-wrapper text-xs-left color-black h6"
                                 v-if="data.attachedImgUrl === '' && !data.systemMessage">
                                {{ data.message }}
                            </div>
                            <div class="chat-content-wrapper" v-else-if="data.attachedImgUrl !== ''">
                                <img :src="data.attachedImgUrl" class="w-full">
                            </div>
                        </div>
                    </div>

                    <!--자신-->
                    <div class="mb-4 display-flex " v-else>
                        <v-spacer></v-spacer>
                        <div class="pr-2">
                            <div class="h6 color-darkgray text-xs-right pb-1 line-height-full">
                                {{ getTime(data.registerDatetime) }}
                                <!--<span>{{ getDateTime('date') }}</span>-->
                            </div>
                            <div class="chat-content-wrapper text-xs-left color-black h6"
                                 v-if="data.attachedImgUrl === ''">
                                {{ data.message }}
                            </div>
                            <div class="chat-content-wrapper" v-else>
                                <img :src="data.attachedImgUrl" class="w-full">
                            </div>
                        </div>
                        <div>
                            <avatar
                                    :me=true>
                            </avatar>
                        </div>
                    </div>
                </div>
            </div>


            <!--미통신 로컬 메세지-->
            <div v-for="localMsg in localMsgList">
                <!--자신-->
                <div class="mb-3 display-flex " v-if="showLocalMsg">
                    <v-spacer></v-spacer>
                    <div class="pr-2">
                        <div class="h6 color-darkgray text-xs-right pb-2 line-height-full">
                            {{ $str('sending') }}
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6" v-if="localMsg.type === 'msg'">
                            {{ localMsg.message }}
                        </div>
                        <div class="chat-content-wrapper" v-else>
                            <img :src="localMsg.message" class="attachment-img-style">
                        </div>
                    </div>
                    <div>
                        <avatar
                                :me=true>
                        </avatar>
                    </div>
                </div>
            </div>
        </div>


        <!--채팅 입력-->
        <div class="pl-3 input-wrapper">
            <input type="text" class="o-none chat-input" v-model="inputValue" :placeholder="$str('chatPlaceholder')"
                   @keypress.enter="onPost()"/>
            <div class="pr-3"><label><i
                    class="c-pointer material-icons color-darkgray attatchment-wrapper">attachment</i>

                <!--파일첨부-->
                <input type="file" id="file" ref="file" v-on:input="onCheckAttachmentFile()"
                       class="d-none" accept="image/*" /></label>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "@/vuex/MainRepository";
    import Avatar from './Avatar.vue';
    import Order from "../vuex/model/Order"

    export default Vue.extend({
        name: 'message',
        components: {
            Avatar
        },
        props: {
            order: {}
        },
        data: () => ({
            inputValue: "",
            transactionNum: '',
            st: 0,
            needScrollDown: true,
            msgInterval: {},
            latestPostTime: 0,

            //파일 첨부
            file: '',
            image: '',

            showLocalMsg: false,
            localMsgList: [],
            isMsgInitCompleted: false,
        }),
        computed: {
            messageList() {
                this.$nextTick(() => {
                    // 현재 스크롤이 최하단일경우 -> scroll
                    if (this.needScrollDown) {
                        this.scrollBottom();
                    }
                });
                this.showLocalMsg = false;
                this.localMsgList = [];
                return MainRepository.Message.controller().getMsgList();
            },
            myMemberNo() {
                this.scrollBottom();
                return MainRepository.MyInfo.getUserInfo().memberNo;
            },
            myEmail() {
                return MainRepository.MyInfo.getUserInfo().email;
            },
            myNickname() {
                return MainRepository.MyInfo.getUserInfo().nickname;
            },
            counterPartyNickname() {
                let name;
                if (MainRepository.MyInfo.getUserInfo().nickname === this.order.merchantNickname) {
                    name = this.order.customerNickname;
                } else {
                    name = this.order.merchantNickname;
                }
                return name;
            },
            counterPartyMemberNo() {
                let num;
                if (MainRepository.MyInfo.getUserInfo().memberNo === this.order.merchantMemberNo) {
                    num = this.order.customerMemberNo;
                } else {
                    num = this.order.merchantMemberNo;
                }
                return num;
            },
            counterPartyEmail() {
                let email;
                if (MainRepository.MyInfo.getUserInfo().email === this.order.merchantEmail) {
                    email = this.order.customerEmail;
                } else {
                    email = this.order.merchantEmail;
                }
                return email;
            },
        },
        created() {
            MainRepository.Message.createRoom(() => {
                this.updateMsg();
                this.$nextTick(() => {
                    this.msgInterval = setInterval(() => {
                        this.updateMsg()
                    }, 1000);
                });
            });

            MainRepository.Users.getUserPageHistoryInfo({
                memberNo: this.counterPartyMemberNo
            }, (result) => {
                this.transactionNum = result.tradeMonthTimes;
            })
        },
        beforeDestroy() {
            clearInterval(this.msgInterval);
        },
        methods: {
            updateMsg() {
                MainRepository.Message.updateMsg(() => {
                });
            },
            onCheckAttachmentFile() {
                //첨부파일 타입, 확장자, 용량 체크
                let fileInfo = this.$refs.file.files[0];
                let fileSize = fileInfo.size;
                console.log(fileInfo);
                if (fileSize > 2000000) {
                    // 용량 alert

                    this.$eventBus.$emit('showAlert', 4012);
                    document.getElementById("file").value = "";
                    return false;
                }
                this.handleFileUpload();
            },
            handleFileUpload() {
                //첨부파일 사진 등록 및 출력
                this.file = this.$refs.file.files[0];
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(this.file);
                this.onPostImg();
            },
            submitFile() {      // 첨부파일 서버 전송
                let formData = new FormData();
                formData.append('file', this.file);
                return formData;
            },
            getTime(date) {
                let _date = new Date(date).toTimeString().substr(0, 8);
                return _date;
            },
            getDate(date) {
                let dateTime = String(date).split(' ');
                return dateTime[1];
            },
            getSystemMsg(msg) {
                switch (msg) {
                    case 'REGISTERED' :
                        return Vue.prototype.$str('systemMsgRegistered');

                    case 'PAID' :
                        return Vue.prototype.$str('systemMsgPaid');

                    case 'PAID_CANCELED_APPEAL' :
                        return Vue.prototype.$str('systemMsgPaidCanceledAppeal');

                    case 'COMPLETE' :
                        return Vue.prototype.$str('systemMsgComplete');

                    case 'CANCELED' :
                        return Vue.prototype.$str('systemMsgCanceled');

                    case 'APPEALED' :
                        return Vue.prototype.$str('systemMsgAppealed');

                    case 'EXPIRED' :
                        return Vue.prototype.$str('systemMsgExpired');
                }
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onPost() {
                let tmpValue = this.inputValue.trim();
                if (tmpValue !== '') {
                    //도배 및 중복 값 입력 방지
                    if (Date.now() - this.latestPostTime < 500) {
                        return false;
                    } else {
                        this.latestPostTime = Date.now();
                        MainRepository.Message.postMsg(this.inputValue, () => {
                        });
                        this.createLocalMsg(this.inputValue, 'msg');
                        this.inputValue = '';
                    }
                }
                this.$nextTick(() => {
                    this.scrollBottom();
                });
            },
            onPostImg() {
                MainRepository.Message.postImg({
                    file: this.submitFile(),
                    orderNo: this.order.orderNo
                }, (url) => {
                    this.createLocalMsg(url, 'img');
                    this.file = '';
                    this.image = '';
                });
                this.$nextTick(() => {
                    this.scrollBottom();
                });
            },
            createLocalMsg(msg, type) {
                this.showLocalMsg = true;
                this.localMsgList.push({
                    type: type,
                    message: msg,
                    registerDatetime: new Date().getTime()
                })
            },
            scrollBottom() {
                let chatWrapper = document.getElementById("contentsWrapper");
                chatWrapper.scrollTop = chatWrapper.scrollHeight;
            },
            scrollEvent(e) {
                this.offsetTop = e.target.scrollTop;
                this.offsetTop = ((e.target.scrollTop || 0) - window.pageYOffset);
                let a = this.$el.querySelector(".contents-wrapper").clientHeight;
                let b = this.$el.querySelector(".contents-wrapper").scrollHeight;
                this.st = b - (a + this.offsetTop);
                this.needScrollDown = this.st < 120;
            },
            goUserPage() {
                //유저페이지 이동
                MainRepository.router().goUserPage(this.counterPartyMemberNo);
            }
        }
    })
</script>

<style scoped>
    .chat-wrapper-md {
        width: 330px;
        height: 570px;
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        background: white;
        top: 0px;
        right: 0px;
        position: absolute;
    }

    .display-flex {
        display: flex;
    }

    .chat-wrapper-xs {
        width: 100%;
        height: 570px;
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        background: white;
    }

    .pt-twenty {
        padding-top: 20px;
    }

    .contents-wrapper {
        border-bottom: 1px solid #d1d1d1;
        height: 424px;
        overflow-y: scroll;
    }

    .chat-content-wrapper {
        width: 170px;
        padding: 8px;
        background: #d8d8d8;
        border-radius: 2px;
    }

    .system-content-wrapper {
        border-radius: 2px;
        font-weight: bold;
    }

    .input-wrapper {
        height: 62px;
        display: flex;
    }

    .chat-input {
        width: 100%;
        height: 100%;
    }

    .attatchment-wrapper {
        padding-top: 20px;
        padding-left: 20px;
    }

    .line-height-date {
        line-height: 0.6;
    }

    .none-avatar {
        width: 34px;
    }
</style>