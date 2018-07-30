<!--사용법-->
<!--<chat :email="email" :merchant_member_no = "merchant_member_no" :transactionNum="transactionNum" :isLogin="isLogin" :message="message" :color="color" :orderNumber="orderNumber"></chat>-->


<template>
    <div :class="[isMobile() ? 'chat-wrapper-xs' : 'chat-wrapper-md']">
        <div style="border-bottom: 1px solid #d1d1d1; height: 82px; display: flex">
            <div class="pl-3 pr-3 pt-4 pb-4">
                <avatar
                        :name=email[0]
                        :isLogin=isLogin
                        :color=color>
                </avatar>
            </div>
            <div class="text-xs-left pt-twenty">
                <span class="h5 bold color-black">{{email}}</span><br>
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
                                :name=data.email[0]
                                :isLogin=data.isLogin
                                :color=data.color>
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
                        <div class="h6 color-darkgray text-xs-right">
                            {{getDate(data.register_datetime)}}
                            <!--<span>{{getDateTime('date')}}</span>-->
                        </div>
                        <div class="chat-content-wrapper text-xs-left color-black h6">
                            {{data.message}}
                        </div>
                    </div>
                    <div>
                        <avatar
                                :name=data.email[0]
                                :isLogin=data.isLogin
                                :color=data.color>
                        </avatar>
                    </div>
                </div>
            </div>
        </div>
        <div class="pl-3 input-wrapper">
            <input type="text" class="o-none chat-input" v-model="inputValue" :placeholder="$str('chatPlaceholder')"
                   v-on:keydown.enter="onPost()" v-on:keyup.enter="scrollBottom()"/>
            <div class="pr-3"><i class="c-pointer material-icons color-darkgray attatchment-wrapper">attachment</i>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "@/vuex/MainRepository";
    import Avatar from './Avatar.vue';

    export default Vue.extend({
        name: 'chat',
        data: () => ({
            inputValue: "",
        }),
        components: {
            Avatar
        },
        props: ['email', 'transactionNum', 'isLogin', 'message', 'color', 'orderNumber', 'member_no'],
        mounted: function () {
            this.$nextTick(function () {
                this.loadData();
                setInterval(function () {
                    this.loadData();
                }.bind(this), 30000);
            })
        },
        mounted () {
            this.scrollBottom();
        },
        computed: {
            setChatDate() {
                return this.message;
            },
        },
        methods: {
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
            loadData: function () {
                // 페이지 로딩 후 채팅 데이터 주기적 AXIOS get
                //orderNumber, message_no 파라미터 전달

                // $.get('/api/data', function (response) {
                //     this.items = response.items;
                // }.bind(this));

                // data get 성공시 this.message.push();
            },
            onPost() {
                // AXIOS post 작업 진행
                var postMessage = {
                    isLogin: true,
                    color: 'red',
                    email: 'Max',
                    message: this.inputValue,
                    register_member_no: this.member_no,
                    register_datetime: '2018-07-30 14:01:00',
                };
                this.message.push(postMessage);
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