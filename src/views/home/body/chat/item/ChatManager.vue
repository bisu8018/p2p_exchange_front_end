<template>
</template>

<script>
    import Vue from 'vue';
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";
    import chatServerInfo from "../../../../../config/urlList";
    import MainRepository from "../../../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'chat-manager',
        data() {
            return {
                connected: false,
                memberInterval: {},
            }
        },
        created() {
            // chat websocket connection
            this.$eventBus.$on('chatConnect', () => {
                this.connect();
            });

            // chat websocket disconnection
            this.$eventBus.$on('chatDisconnect', () => {
                this.disconnect();
            });

            // chat send message
            this.$eventBus.$on('chatSendMessage', (message,type) => {
                this.send(message,type);
            });


            this.$nextTick(function () {
                //websocket 접속
                this.connect();

                //접속자 목록 로드
                this.setMembers();
                this.memberInterval = setInterval(() => {
                    this.setMembers();
                }, 5000);
            })
        },
        methods: {
            send(message,type) {
                if (this.stompClient && this.stompClient.connected) {
                    const msg = {message: message,
                    type : type};
                    let channelId = 'all';
                    this.stompClient.send("/publish/channels/" + channelId, JSON.stringify(msg), {});
                    //this.inputValue = '';
                }
            },
            connect() {
                this.socket = new SockJS(chatServerInfo.chatServerUrl());
                this.stompClient = Stomp.over(this.socket);
                this.stompClient.debug = () => {}; //webstomp debug turn off

                this.stompClient.connect({},(result) => {
                        this.connected = true;

                        this.setMessage(()=>{});
                        this.subscribe();
                    },
                    error => {
                        console.log(error);
                        this.connected = false;
                    }
                );
            },
            subscribe() {
                let channelId = 'all';
                this.stompClient.subscribe("/subscribe/channels/" + channelId, tick => {
                    let result = JSON.parse(tick.body);
                    let chatMessage = result.message;
                    //console.log(result);

                    if(result.sender.name === 'SYSTEM'){
                        MainRepository.Chat.setChatSubscribe(chatMessage, ()=>{});
                    }else{
                        //vuex 메세지 업데이트
                        MainRepository.Chat.addChatMessage(result);
                    }
                });
            },
            setMessage(callback) {
                MainRepository.Chat.setMessage('', (result) => {
                    //vuex에 전달
                    //this.received_messages.push(result);
                    callback(result);
                });
            },
            setMembers(){
                MainRepository.Chat.setChatMembers(result => {

                });
            },
            disconnect() {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
                this.connected = false;
            },
            tickleConnection() {
                this.connected ? this.disconnect() : this.connect();
            },
        }
    })

</script>

<style scoped>

</style>