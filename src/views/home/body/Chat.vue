<template>
    <div class="chat-wrapper">

        <!--chat header section-->
        <v-layout class="header-box" align-center>
            <i class="material-icons c-pointer " @click="clickCancel">close</i>
            <v-spacer></v-spacer>
            <h5>AllB {{$str("Chat")}}</h5>
            <v-spacer></v-spacer>
            <i class="material-icons c-pointer mr-3" @click="clickCancel">more_vert</i>
        </v-layout>
        <v-divider/>


        <!--chat contents section-->
        <div class="scroll-space">
            <div v-for="data in messageList">
                <!--상대방-->
                <div class="mb-3 display-flex" v-if="data.mine === false ">
                    <avatar v-if="counterPartyEmail !== ''" :email=counterPartyEmail :chat="'sub'"/>
                    <div v-else class="none-avatar"></div>
                    <div class="pl-2">
                        <div class="h6 color-darkgray pb-2 line-height-full text-xs-left">
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
                <div class="mb-3 display-flex " v-else>
                    <v-spacer></v-spacer>
                    <div class="pr-2">
                        <div class="h6 color-darkgray text-xs-right pb-2 line-height-full">
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


        <!--chat input section-->
        <div class="chat-div text-white-hover py-3 pr-3 vertical-center pa-2">
            <div class="chat-input-wrapper vertical-center">
                <!--파일첨부-->
                <label class="file-icon-wrapper">
                    <i class="c-pointer material-icons color-darkgray file-icon">attachment</i>
                    <input type="file" id="file" ref="file" v-on:input="onCheckAttachmentFile()"
                           class="d-none" accept="image/*" capture="camera"/>
                </label>
                <input type="text" v-model="inputValue" class="chat-input" :placeholder="$str('chatPlaceholder')"/>
            </div>
            <i class="c-pointer material-icons color-darkgray ml-3">send</i>
        </div>
    </div>
</template>

<script>
    import MainRepository from "../../../vuex/MainRepository";
    import Avatar from '../../../components/Avatar.vue';

    export default {
        name: "Chat",
        components: {
            Avatar
        },
        data: () => ({
            inputValue: "",
            st: 0,
            needScrollDown: true,
            messageList: {
                0: {
                    attachedImgUrl: "",
                    message: "전투력 3백만~?!",
                    messageNo: 0,
                    mine: true,
                    registerDatetime: 1536543933000,
                    registerMemberNo: 258,
                },
                1: {
                    attachedImgUrl: "",
                    message: "오옷!!",
                    messageNo: 1,
                    mine: true,
                    registerDatetime: 1536543954000,
                    registerMemberNo: 258,
                },
                2: {
                    attachedImgUrl: "",
                    message: "후훗.. 이것이 초사이어인",
                    messageNo: 1,
                    mine: false,
                    registerDatetime: 1536543954000,
                    registerMemberNo: 254,
                }
            },

            //파일 첨부
            file: '',
            image: '',
        }),
        computed: {},
        methods: {
            getTime(date) {
                let _date = new Date(date).toTimeString().substr(0, 8);
                return _date;
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
            clickCancel() {
                MainRepository.Chat.isClosed();
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
        }

    }
</script>

<style scoped>
    .chat-wrapper {
        position: relative;
        background-color: #ffffff;
        height: 100%;
        text-align: left;
        width: 100%;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    }

    .header-box {
        display: flex;
        background-color: #002970;
        height: 64px;
        padding: 22px 0px 22px 24px;
        color: white;
        border-left: #334B99 1px solid;
    }

    .scroll-space {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: relative;
        background-color: #ffffff;
        height: calc(100% - 53px);
        padding-top: 24px;
        padding-left: 16px;
        padding-right: 16px;
    }

    .chat-div {
        color: #214ea1;
        background-color: #ffffff;
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 62px;
        border-top: solid 1px #d1d1d1;
    }

    .chat-input-wrapper {
        border: solid 1px #d1d1d1;
        height: 40px;
        width: 100%;
        border-radius: 2px;
    }

    .chat-input {
        height: 100%;
        width: 100%;
        color: #353535;
        padding-left: 8px;
        outline: none;
    }

    .file-icon-wrapper {
        padding-left: 4px;
        padding-right: 4px;
        border-right: solid 1px #d1d1d1;
    }

    .file-icon {
        font-size: 27px;
        margin-top: 5px;
    }

    .display-flex {
        display: flex;
    }

    .none-avatar {
        width: 34px;
    }


    .chat-content-wrapper {
        width: 170px;
        padding: 8px;
        background: #d8d8d8;
        border-radius: 2px;
    }

</style>