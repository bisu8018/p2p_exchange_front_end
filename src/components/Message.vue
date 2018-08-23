<!--사용법-->
<!--<chat :orderNo="orderNo" :merchant_member_no="merchant_member_no" :customer_member_no="customer_member_no"></chat>-->


<template>
    <div :class="[isMobile() ? 'chat-wrapper-xs' : 'chat-wrapper-md']">
        <div style="border-bottom: 1px solid #d1d1d1; height: 82px; display: flex">
            <div class="pl-3 pr-3 pt-4 pb-4">
                <avatar v-if="counterPartyEmail != '' "
                        :email = counterPartyEmail
                        :chat = "'main'"
                >
                </avatar>
            </div>
            <div class="text-xs-left pt-twenty">
                <span class="h5 bold color-black">{{ counterPartyNickname }}</span><br>
                <span class="h6 color-darkgray">Trades in 30 days : {{ transactionNum }}</span>
            </div>
            <v-spacer></v-spacer>
            <div class="pt-4a pr-3 pl-3">
                <i class="material-icons color-darkgray c-pointer">stay_current_portrait</i>
            </div>
        </div>
        <div class="contents-wrapper pr-3 pl-3 pt-4 pb-4" id="contentsWrapper">
            <div v-for="data in messageList">
                <!--상대방-->
                <div class="mb-3 display-flex" v-if="data.mine === false">
                    <div>
                        <avatar v-if="counterPartyEmail !== ''"
                                :email = counterPartyEmail
                                :chat = "'sub'">
                        </avatar>
                    </div>
                    <div class="pl-2">
                        <div class="h6 color-darkgray pb-2 line-height-full text-xs-left">
                            {{ getTime(data.registerDatetime) }}
                            <!--<span>{{ getDateTime('date') }}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{ data.message }}
                        </div>
                    </div>
                </div>

                <!--자신-->
                <div class="mb-3 display-flex " v-else>
                    <v-spacer></v-spacer>
                    <div class="pr-2">
                        <div class="h6 color-darkgray text-xs-right pb-2 line-height-full">
                            {{ getTime(data.registerDatetime) }}
                            <!--<span>{{ getDateTime('date') }}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{ data.message }}
                        </div>
                    </div>
                    <div>
                        <avatar
                                :me = true>
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

            msgInterval : {},

            //파일 첨부
            file: '',
            image: '',
        }),
        computed: {
            messageList() {
                return MainRepository.Message.controller().getMsgList();
            },
            myMemberNo () {
                this.scrollBottom();
                return MainRepository.MyInfo.getUserInfo().memberNo;
            },
            myEmail() {
                return MainRepository.MyInfo.getUserInfo().email;
            },
            myNickname() {
                return MainRepository.MyInfo.getUserInfo().nickname;
            },
            counterPartyNickname () {
                let name;
                if(MainRepository.MyInfo.getUserInfo().nickname === this.order.merchantNickname){
                    name = this.order.customerNickname;
                }else{
                    name = this.order.merchantNickname;
                }
                return name;
            },
            counterPartyMemberNo () {
                let num;
                if(MainRepository.MyInfo.getUserInfo().memberNo === this.order.merchantMemberNo){
                    num = this.order.customerMemberNo;
                }else{
                    num = this.order.merchantMemberNo;
                }
                return num;
            },
            counterPartyEmail () {
                let email;
                if(MainRepository.MyInfo.getUserInfo().email === this.order.merchantEmail){
                    email = this.order.customerEmail;
                }else{
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
                    }, 3000);
                });
                this.scrollBottom();
            });
        },
        beforeDestroy() {
            clearInterval(this.msgInterval);
        },
        methods: {
            updateMsg() {
                MainRepository.Message.updateMsg(() => {
                    this.scrollBottom();
                });
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
            getTime(date) {
                let _date = new Date(date).toTimeString().substr(0,8);
                return _date;
            },
            getDate(date) {
                let dateTime = String(date).split(' ');
                return dateTime[1];
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            onPost() {
                let tmpValue = this.inputValue.trim();

                if(tmpValue !== ''){
                    MainRepository.Message.postMsg(this.inputValue, () => {
                        this.inputValue = '';
                        this.updateMsg();
                        this.scrollBottom();
                    });
                }

            },
            scrollBottom() {
                let chatWrapper = document.getElementById("contentsWrapper");
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