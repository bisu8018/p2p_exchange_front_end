<!--사용법-->
<!--<chat :orderNo="orderNo" :merchant_member_no="merchant_member_no" :customer_member_no="customer_member_no"></chat>-->


<template>
    <div :class="[isMobile() ? 'chat-wrapper-xs' : 'chat-wrapper-md']">
        <div style="border-bottom: 1px solid #d1d1d1; height: 82px; display: flex">
            <div class="pl-3 pr-3 pt-4 pb-4">
                <avatar
                        :email = counterPartyMemberNo>
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
                <!--상대방-->
                <div class="mb-3 display-flex" v-if="data.register_member_no === counterPartyMemberNo">
                    <div>
                        <avatar
                                :email = counterPartyMemberNo>
                        </avatar>
                    </div>
                    <div class="pl-2">
                        <div class="h6 color-darkgray pb-2 line-height-full text-xs-left">
                            {{getDate(data.registerDatetime)}}
                            <!--<span>{{getDateTime('date')}}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{data.message}}
                        </div>
                    </div>
                </div>

                <!--자신-->
                <div class="mb-3 display-flex " v-else>
                    <v-spacer></v-spacer>
                    <div class="pr-2">
                        <div class="h6 color-darkgray text-xs-right pb-2 line-height-full">
                            {{getDate(data.registerDatetime)}}
                            <!--<span>{{getDateTime('date')}}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{data.message}}
                        </div>
                    </div>
                    <div>
                        <avatar
                                :email = myMemberNo>
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
    import {abUtils} from "../common/utils";

    export default Vue.extend({
        name: 'chat',
        components: {
            Avatar
        },
        props: ['orderNo','merchant_member_no','customer_member_no'],
        data: () => ({
            inputValue: "",
            transactionNum: '',

            message : [],

            //파일 첨부
            file: '',
            image: '',
        }),

        created() {
            //유저 정보 GET AXIOS
            MainRepository.Users.getOtherUsers(this.email, function (result) {

            });

        },

        mounted: function () {
            this.scrollBottom();
            this.$nextTick(function () {
                this.getMessage();
                setInterval(function () {
                    this.getMessage();
                }.bind(this), 5000);
            })
        },
        computed: {
            myMemberNo () {
              return MainRepository.MyInfo.getUserInfo().memberNo;
            },
            counterPartyMemberNo () {
                let num;
                if(MainRepository.MyInfo.getUserInfo().memberNo === this.merchant_member_no){
                    num = this.customer_member_no;
                }else{
                    num = this.merchant_member_no;
                }
                return num;
            }
        },
        methods: {
            getMessage: function () {
                let self = this;
                // 메세지 AXIOS GET
                ChatService.message.getMessage({
                        email: MainRepository.MyInfo.getUserInfo().email,  //VUEX userInfo.nickName
                        dateTime:  abUtils.getDateTime(),
                        orderNo : self.orderNo
                    }, function (result) {
                    self.message = result;
                    }
                )
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
                let self = this;
                // AXIOS post 전달
                ChatService.message.postMessage({
                    attachedImgUrl: "",
                    message: self.inputValue,
                    orderNo: self.orderNo,
                    mine: true,
                    registerMemberNo: MainRepository.MyInfo.getUserInfo().memberNo
                }, function () {
                    //post 성공시 작업 진행
                    self.message.push(postMessage);
                });

                var postMessage = {
                    message: this.inputValue,
                    register_member_no: this.myMemberNo,
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