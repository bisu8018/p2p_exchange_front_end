<!--사용법-->
<!--<chat :nickName="nickName" :merchant_member_no = "merchant_member_no" :transactionNum="transactionNum" :isLogin="isLogin" :message="message" :color="color" :orderNumber="orderNumber"></chat>-->


<template>
    <div :class="[isMobile() ? 'chat-wrapper-xs' : 'chat-wrapper-md']">
        <div style="border-bottom: 1px solid #d1d1d1; height: 82px; display: flex">
            <div class="pl-3 pr-3 pt-4 pb-4">
                <avatar
                        :name=nickName[0]
                        :isLogin=isLogin
                        :color=bgColor>
                </avatar>
            </div>
            <div class="text-xs-left pt-twenty">
                <span class="h5 bold color-black">{{nickName}}</span><br>
                <span class="h6 color-darkgray">Trades in 30 days : {{transactionNum}}</span>
            </div>
            <v-spacer></v-spacer>
            <div class="pt-4a pr-3 pl-3">
                <i class="material-icons color-darkgray c-pointer">stay_current_portrait</i>
            </div>
        </div>
        <div class="contents-wrapper pr-3 pl-3 pt-4 pb-4" id="contentsWrapper">
            <div v-for="data in message">
                <div class="mb-3 display-flex" v-if="data.register_member_no != member_no">
                    <div>
                        <avatar
                                :name=nickName[0]
                                :isLogin= isLogin
                                :color=bgColor>
                        </avatar>
                    </div>
                    <div class="pl-2">
                        <div class="h6 color-darkgray pb-2 line-height-full text-xs-left">
                            {{getDate(data.register_datetime)}}
                            <!--<span>{{getDateTime('date')}}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{data.message}}
                        </div>
                    </div>
                </div>
                <div class="mb-3 display-flex " v-else>
                    <v-spacer></v-spacer>
                    <div class="pr-2">
                        <div class="h6 color-darkgray text-xs-right pb-2 line-height-full">
                            {{getDate(data.register_datetime)}}
                            <!--<span>{{getDateTime('date')}}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{data.message}}
                        </div>
                    </div>
                    <div>
                        <avatar
                                :name=nickName[0]
                                :isLogin=true
                                :color=bgColor>
                        </avatar>
                    </div>
                </div>
            </div>
        </div>
        <div class="pl-3 input-wrapper">
            <input type="text" class="o-none chat-input" v-model="inputValue" :placeholder="$str('chatPlaceholder')"
                   v-on:keydown.enter="onPost()" v-on:keyup.enter="scrollBottom()"/>
            <div class="pr-3"><label><i
                    class="c-pointer material-icons color-darkgray attatchment-wrapper">attachment</i>
                <input type="file" id="file" ref="file" v-on:input="onCheckAttachmentFile()"
                       class="d-none" accept="image/*"/></label>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "@/vuex/MainRepository";
    import Avatar from './Avatar.vue';
    import ChatService from "../service/chat/ChatService";
    import AccountService from "../service/account/AccountService";

    export default Vue.extend({
        name: 'chat',
        data: () => ({
            inputValue: "",
            isLogin: false,
            nickName: '',
            bgColor: '',
            transactionNum: '',

            message : [],

            //파일 첨부
            file: '',
            image: '',
        }),
        components: {
            Avatar
        },
        created() {
            //상대방 정보 get AXIOS

        },
        props: ['orderNo'],
        mounted: function () {
            this.scrollBottom();

            this.$nextTick(function () {
                this.getMessage();
                this.getIsLogin();
                setInterval(function () {
                    this.getMessage();
                    this.getIsLogin();
                }.bind(this), 30000);
            })
        },
        methods: {
            getIsLogin() {
                AccountService.Account.isUserActive({
                        email: ''  //VUEX userInfo.nickname
                    }, function (result,error) {
                        if (!error) {
                            this.isLogin = result;
                        } else {
                            console.log("getIsLogin ERROR ::::::: " + error);
                        }
                    }
                )
            },
            getMessage: function () {
                var date = Date.now();
                console.log(date);
                // 페이지 로딩 후 채팅 데이터 주기적 AXIOS get
                ChatService.message.getMessage({
                        email: '',  //VUEX userInfo.nickName
                        dateTime:  date,
                        orderNo : this.orderNo
                    }, function (error) {
                        if (!error) {

                        } else {

                        }
                    }
                )
                //orderNumber, message_no 파라미터 전달

                // $.get('/api/data', function (response) {
                //     this.items = response.items;
                // }.bind(this));

                // data get 성공시 this.message.push();
            },
            onCheckAttachmentFile() {
                //첨부파일 타입, 확장자, 용량 체크
                let fileInfo = this.$refs.file.files[0];
                let fileSize = fileInfo.size;
                console.log(fileInfo);
                if (fileSize > 500000) {
                    // 용량 alert
                    this.$eventBus.$emit('showAlert', 'chat_size');
                    document.getElementById("file").value = "";
                    return false;
                }
                //this.handleFileUpload();

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
            },
            getDate(date) {
                let dateTime = String(date).split(' ');
                return dateTime[0];
            },
            getTime(date) {
                let dateTime = String(date).split(' ');
                return dateTime[1];
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onPost() {
                // AXIOS post 전달
                ChatService.message.postMessage({
                    attachedImgUrl: "",
                    message: this.inputValue,
                    orderNo: this.orderNo,
                }, function (error) {
                    if (!error) {
                        //post 성공시 작업 진행
                        this.message.push(postMessage);
                    } else {
                        console.log("POST ERROR ::::::: " + error);
                        //실패 시 alert 창 표출
                    }
                });

                var postMessage = {
                    isLogin: true,
                    color: 'red',
                    nickName: 'Max',
                    message: this.inputValue,
                    register_member_no: this.member_no,
                    register_datetime: '2018-07-30 14:01:00',
                };

                this.inputValue = "";


            },
            scrollBottom() {
                var chatWrapper = document.getElementById("contentsWrapper");
                chatWrapper.scrollTop = chatWrapper.scrollHeight;
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
</style>