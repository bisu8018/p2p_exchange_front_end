<template>
    <div class=" mt-5">
        <v-flex xs12 class="text-xs-left h2 mb-4  bold">
            {{ $str("myToken") }}
            <v-divider class="mt-4"></v-divider>
        </v-flex>


        <!--***************      토큰 이름       *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 mb-5>
                <div class="img-circle-border vertical-center p-relative">
                    <div class="sprite-img2 ic-mytoken-default " v-if="file === ''"></div>
                    <img :src="image" class="attachment-img-style" v-else>
                    <label>
                        <div class="sprite-img2 ic-mytoken-add mytoken-add-css"></div>
                        <!--파일첨부-->
                        <input type="file" id="file" ref="file" v-on:input="onCheckAttachmentFile()"
                               class="d-none" accept="image/*"/>
                    </label>
                </div>
            </v-flex>

            <v-flex xs12 md3 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('tokenName') }}
            </v-flex>
            <div v-else class="mb-2 vertical-center">
                {{ $str('tokenName') }}
                <div class="sprite-img2 ic_postad_help ml-2 c-pointer tooltip">
                        <span class="tooltip-content">{{ $str("tokenNameExplain") }}</span>
                </div>
            </div>

            <!--토큰명 입력-->
            <v-flex xs12 md4>
                <div class="mb-3 p-relative">
                    <input type="text" class="input" v-model="tokenName" maxlength="5"
                           @blur="onCheck('tokenName')" v-bind:class="{'warning-border' : warning_tokenName}">
                    <div class="warning-text-wrapper">
                    <span class="d-none"
                          v-bind:class="{'warning-text' : warning_tokenName}">{{ verify_warning_tokenName }}</span>
                    </div>
                </div>
            </v-flex>

            <!--토큰명 설명-->
            <v-flex md5 v-if="!isMobile">
                <div class="text-xs-left input-explain color-darkgray">{{ $str("tokenNameExplain") }}
                </div>
            </v-flex>
        </v-layout>


        <!--***************      소수점 자리       *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md3 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('decimals') }}
            </v-flex>
            <div v-else class="mb-2 vertical-center">
                {{ $str('decimals') }}
                <div class="sprite-img2 ic_postad_help ml-2 c-pointer tooltip">
                    <span class="tooltip-content">{{ $str("decimalsExplain") }}</span>
                </div>
            </div>

            <!--소수점 자리수 입력-->
            <v-flex xs12 md4>
                <div class="mb-3 p-relative">
                    <input type="text" class="input" v-model="decimals" maxlength="2"
                           @keyup="onCheck('decimals')" @blur="onCheck('decimals')"
                           v-bind:class="{'warning-border' : warning_decimals}">
                    <div class="warning-text-wrapper">
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_decimals}">{{ verify_warning_decimals }}</span>
                    </div>
                </div>
            </v-flex>

            <!--소수점 자리수 설명-->
            <v-flex md5 v-if="!isMobile">
                <div class="text-xs-left input-explain color-darkgray">{{ $str("decimalsExplain") }}
                </div>
            </v-flex>
        </v-layout>

        <!--***************      설명       *********-->

        <!--설명 입력-->
        <v-layout wrap row mb-4>
            <v-flex xs12 md3 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('description') }}
            </v-flex>
            <div v-else class="mb-2">
                {{ $str('description') }}
            </div>

            <!--설명 입력-->
            <v-flex xs12 md4>
                <div class="p-relative">
                <textarea class="description-wrapper common-textarea"
                          v-model="description" maxlength="300"
                          @blur="onCheck('description')"
                          :placeholder="isMobile ? $str('descriptionExplain') : ''"
                          v-bind:class="{'warning-border' : warning_description}">

                </textarea>
                    <div class="warning-textarea-wrapper">
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_description}">{{ verify_warning_description }}</span>
                    </div>
                </div>
            </v-flex>

            <!--설명-->
            <v-flex md5 v-if="!isMobile">
                <div class="text-xs-left input-explain color-darkgray">{{ $str("descriptionExplain") }}

                </div>
            </v-flex>

            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      토큰 발행량       *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md3 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('totalToken') }}
            </v-flex>
            <div v-else class="mb-2 vertical-center">
                {{ $str('decimals') }}
                <div class="sprite-img2 ic_postad_help ml-2 c-pointer tooltip">
                    <span class="tooltip-content">{{ $str("totalTokenExplain") }}</span>
                </div>
            </div>

            <!--토큰 발행량 입력-->
            <v-flex xs12 md4>
                <div class="mb-3 p-relative">
                    <input type="text" class="input" v-model="totalToken" maxlength="10"
                           @blur="onCheck('totalToken')"
                           @keyup="onCheck('totalToken')"
                           v-bind:class="{'warning-border' : warning_totalToken}">
                    <div class="warning-text-wrapper">
                    <span class="d-none"
                          v-bind:class="{'warning-text' : warning_totalToken}">{{ verify_warning_totalToken }}</span>
                    </div>
                </div>
            </v-flex>

            <!--토큰 발행량 설명-->
            <v-flex md5 v-if="!isMobile">
                <div class="text-xs-left">
                    <div class="input-explain color-darkgray mt-2">{{ $str("totalTokenExplain") }}
                    </div>
                </div>
            </v-flex>

            <!--토큰 재발행 여부-->
            <v-flex xs12 md9 offset-md3>
                <div class="text-xs-left mt-2 vertical-center">
                    <input type="checkbox" id="reissuable" v-model="reissuable"/>
                    <label for="reissuable">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                        <h5 class="d-inline-block">{{ $str("reissuable") }}</h5>
                    </label>
                </div>
            </v-flex>

            <!--메인넷-->
            <v-flex xs6 md2 offset-md3>
                <div class="text-xs-left mt-4 vertical-center">
                    <input type="radio" id="mainnet" value="main" name="tokenServer" v-model="tokenServer"/>
                    <label for="mainnet">
                        <span>
                              <i class="material-icons">brightness_1</i>
                        </span>
                        <h5 class="d-inline-block">{{ $str("mainnet") }}</h5>
                    </label>
                    <div class="sprite-img2 ic_postad_help ml-2 c-pointer tooltip" v-if="isMobile">
                        <span class="tooltip-content">{{ $str("tokenServerExplain") }}</span>
                    </div>
                </div>
            </v-flex>

            <!--테스트넷-->
            <v-flex xs6 md2>
                <div class="text-xs-left mt-4 vertical-center">
                    <input type="radio" id="testnet" value="test" name="tokenServer" v-model="tokenServer"/>
                    <label for="testnet">
                            <span>
                                  <i class="material-icons">brightness_1</i>
                            </span>
                        <h5 class="d-inline-block">{{ $str("testnet") }}</h5>
                    </label>
                </div>
            </v-flex>

            <!--토큰 서버 설명-->
            <v-flex md5 v-if="!isMobile">
                <div class="text-xs-left mt-4 input-explain color-darkgray">{{ $str("tokenServerExplain") }}
                </div>
            </v-flex>

            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      거래 비밀번호       *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md3 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('tradePwText') }}
            </v-flex>
            <div v-else class="mb-2">
                {{ $str('tradePwText') }}
            </div>

            <!--토큰 발행량 입력-->
            <v-flex xs12 md4>
                <div class="mb-3 p-relative">
                    <input type="password" class="input" v-model="tradePassword" maxlength="20"
                           v-bind:class="{'warning-border' : warning_tradePassword}"
                           @keyup="onCheck('tradePassword')"
                           @blur="onCheck('tradePassword')"
                    >
                    <div class="warning-text-wrapper">
                    <span class="d-none"
                          v-bind:class="{'warning-text' : warning_tradePassword}">{{ verify_warning_tradePassword }}</span>
                    </div>
                </div>
            </v-flex>

            <v-flex xs12>
                <v-divider class="mt-3"></v-divider>
            </v-flex>
        </v-layout>


        <!--***************      버튼       *********-->

        <v-layout wrap row >
            <v-flex xs12 md2 mt-2 order-md4>
                <button  class="btn-blue btn-blue-hover" @click="onCheck('all')">
                    {{ $str("create") }}
                </button>

            </v-flex>
            <v-flex xs12 md2 offset-md4 mt-2>
                <button  class="btn-white btn-white-hover" @click="goWallet()">
                    {{ $str("cancel") }}
                </button>
            </v-flex>


        </v-layout>
        <my-token-modal :show="showModal" @close="onClose()" @confirm="onPostFile()"></my-token-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import {abUtils} from "../../../../common/utils";
    import MyTokenModal from "./item/MyTokenModal.vue";

    export default Vue.extend({
        name: 'myToken',
        components: {MyTokenModal},
        data: () => ({
            tokenName: '',
            warning_tokenName: false,
            verify_warning_tokenName: '',

            decimals: '',
            warning_decimals: false,
            verify_warning_decimals: '',

            description: '',
            warning_description: false,
            verify_warning_description: '',

            totalToken: '',
            warning_totalToken: false,
            verify_warning_totalToken: '',

            tradePassword: '',
            warning_tradePassword: false,
            verify_warning_tradePassword: '',

            reissuable: false,
            tokenServer: 'main',
            showModal: false,
            modalType: 'warning',   //warning -> confirm

            //파일 첨부
            file: '',
            image: '',
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        created() {
          this.init();
        },
        methods: {
            init() {
                let tokenInfo = MainRepository.MyToken.controller().getMyToken();
                if (!tokenInfo.isNull()) {
                    MainRepository.router().goMyToken();
                }
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
                //this.onPostImg();
            },
            submitFile() {      // 첨부파일 서버 전송
                let formData = new FormData();
                formData.append('file', this.file);
                return formData;
            },
            onCheckTradePassword() {
                //거래 비밀번호 체크
                let tradePassword = Number(this.tradePassword);
                if (tradePassword === 0 || tradePassword === undefined) {
                    this.warning_trade_password = true;
                    this.verify_warning_trade_password = Vue.prototype.$str("warning_trade_password");
                    return false;
                }
                this.warning_trade_password = false;
                return true;
            },
            onCheck(type) {
                //값 숫자 형식 체크
                let temp;
                switch (type) {
                    // 고정가격
                    case 'tokenName' :
                        if (this.tokenName === '') {
                            this.warning_tokenName = true;
                            this.verify_warning_tokenName = Vue.prototype.$str('warning_token_name_null');
                            return false;
                        }
                        if (this.tokenName > 5 || this.tokenName < 3) {
                            this.warning_tokenName = true;
                            this.verify_warning_tokenName = Vue.prototype.$str('warning_token_name_length');
                            return false;
                        }
                        this.verify_warning_tokenName = '';
                        this.warning_tokenName = false;
                        return true;

                    case 'decimals' :
                        if (this.decimals === '') {
                            this.warning_decimals = true;
                            this.verify_warning_decimals = Vue.prototype.$str('warning_decimals_null');
                            return false;
                        } else if (!abUtils.isInteger(this.decimals) || this.decimals[0] === '-') {
                            this.decimals = '';
                            this.warning_decimals = true;
                            this.verify_warning_decimals = Vue.prototype.$str('warning_decimals_number');
                            return false;
                        }
                        if (this.decimals > 18 ) {
                            this.warning_decimals = true;
                            this.verify_warning_decimals = Vue.prototype.$str('warning_decimals_range');
                            return false;
                        }

                        this.verify_warning_decimals = '';
                        this.warning_decimals = false;
                        return true;

                    case 'description' :
                        if (this.description === '') {
                            this.warning_description = true;
                            this.verify_warning_description = Vue.prototype.$str('warning_description_null');
                            return false;
                        }

                        this.verify_warning_description = '';
                        this.warning_description = false;
                        return true;

                    case 'totalToken' :
                        if (this.totalToken === '') {
                            this.warning_totalToken = true;
                            this.verify_warning_totalToken = Vue.prototype.$str('warning_total_token_null');
                            return false;
                        } else if (!abUtils.isInteger(this.totalToken) || this.totalToken[0] === '-') {
                            this.totalToken = '';
                            this.warning_totalToken = true;
                            this.verify_warning_totalToken = Vue.prototype.$str('warning_total_token_number');
                            return false;
                        }

                        this.verify_warning_totalToken = '';
                        this.warning_totalToken = false;
                        return true;

                    case 'tradePassword' :
                        if (this.tradePassword === '') {
                            this.warning_tradePassword = true;
                            this.verify_warning_tradePassword = Vue.prototype.$str('warning_trade_password');
                            return false;
                        }

                        this.verify_warning_tradePassword = '';
                        this.warning_tradePassword = false;
                        return true;

                    case 'tokenImg' :
                        if (this.file === '') {
                            Vue.prototype.$eventBus.$emit('showAlert', 4013);
                            return false;
                        }
                        return true;

                    case 'all' :
                    if (this.onCheck('tokenName') && this.onCheck('decimals') && this.onCheck('description') && this.onCheck('totalToken') && this.onCheck('tradePassword') && this.onCheck('tokenImg')) {

                        //모달 출력
                        this.modalType = 'warning';
                        this.showModal=  true;
                    } else {
                        return false;
                    }
                }
            },
            onClose() {
                this.showModal = false;
            },
            onPostFile() {
                MainRepository.Service.Common().fileUpload.fileUpload({
                    file: this.submitFile(),
                    purpose: 'customtoken'
                }, (url) => {
                    this.onPost(url);
                });
            },
            onPost(url) {
                this.showModal = false;
                let mainnetYn = this.tokenServer === 'main' ? 'y' : 'n';
                let reissueYn = this.reissuable ? 'y' : 'n';
                MainRepository.MyToken.generateToken({
                    decimalCount: this.decimals,
                    description: this.description,
                    mainnetYn: mainnetYn,
                    reissueYn: reissueYn,
                    status: "registered",
                    symbolImgUrl: url,
                    tokenName: this.tokenName,
                    tradeTokens: this.totalToken,
                    tradePassword : this.tradePassword
                }, result => {
                    //다음 페이지 이동
                    Vue.prototype.$eventBus.$emit('showAlert', 2004);

                }, err => {
                    return false;
                })
            },
            goWallet() {
                MainRepository.router().goWallet();
            }
        }
    });
</script>
<style scoped>
    .warning-text {
        text-align: right;
    }

    .img-circle-border {
        width: 86px;
        height: 86px;
        border: 1px solid #8d8d8d;
        border-radius: 50px;
        margin: auto;
        padding-left: 9px;
        position: relative;
    }

    .mytoken-add-css {
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: pointer;
    }

    /*tooltip 수정*/
    :hover.tooltip .tooltip-content {
        width: 200px !important;
        top: 25px;
        height: fit-content;
        text-align: left;
        line-height: 1.4;
        left: 77px;
    }

    .tooltip .tooltip-content:after {
        left: 16% !important;
        bottom: 100% !important;
        top: -9% !important;
        border-top: 0px !important;
        border-bottom: 10px solid #545c6a !important;
    }

    .tooltip {
        display: inline-block;
    }

    .description-wrapper {
        border: 1px solid #8d8d8d;
    }

    .description-wrapper:hover, .description-wrapper:focus {
        border: solid 1px #316ee4;
    }

    .attachment-img-style {
        position: absolute;
        width: 86px;
        height: 86px;
        border-radius: 45px;
        left: -1px;
    }

    .warning-textarea-wrapper {
        position: absolute !important;
        bottom: 6px !important;
        right: 0 !important;
        top: 91px !important;
    }


    /*textarea css*/
    textarea::-webkit-input-placeholder {
        color: #9294a6;
    }

    textarea:-moz-placeholder { /* Firefox 18- */
        color: #9294a6;
    }

    textarea::-moz-placeholder { /* Firefox 19+ */
        color: #9294a6;
    }

    textarea:-ms-input-placeholder {
        color: #9294a6;
    }
</style>

