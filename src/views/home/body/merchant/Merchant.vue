<template>
    <div>
        <v-layout>
            <v-flex xs12 md12 text-md-left text-xs-left class="mt-5">
                <h1 class="bold">{{$str("Merchant")}}</h1>
                <h5 class="mt-4">{{$str("Apply to be Merchant")}}</h5>
            </v-flex>
        </v-layout>

        <v-layout wrap row>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3">
                <div class="section-border-depth pt-5 pb-5 cardBox">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3">{{$str("Advertising")}}</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">
                        {{$str("Merchants are able to post advertisements, flexible and convenient to trade.")}}
                    </h4>
                </div>
            </v-flex>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3 ">
                <div class="section-border-depth pt-5 pb-5 cardBox">
                    <div class="sprite-img ic-merchant-logo-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3 medium">{{$str("Exclusive logo")}}</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">{{$str("Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.")}}</h4>
                </div>
            </v-flex>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3 ">
                <div class="section-border-depth pt-5 pb-72 cardBox">
                    <div class="sprite-img ic-merchant-service-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3">{{$str("One-to-one Service")}}</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">{{$str("Merchants will enjoy our one-to-one exclusive service.")}}</h4>
                </div>
            </v-flex>
        </v-layout>

        <!-- Registerd : 신청 대기 중 -->
        <div v-if="myMerchantInfo.isRegistered()">
            <v-layout row wrap align-center fill-height justify-center mt-4a mb-3>
                <v-flex xs12 md4 pl-0>
                    <i class="material-icons d-inline-block pt-1 pr-2">schedule</i>
                    <h2 class="d-inline-block">{{$str("Your application is under review.")}}</h2>
                </v-flex>
            </v-layout>
            <v-layout justify-center mb-6>
                <v-flex md5 xs12>
                    <h4> {{$str("Your application has been successfully submitted. We will complete the review within 2 working days.")}}</h4>
                </v-flex>
            </v-layout>
        </div>
        <!-- Verified : 신청 완료 -->
        <div v-else-if="myMerchantInfo.isVerified()">
            <v-layout row wrap align-center fill-height justify-center mt-4a mb-3>
                <v-flex xs12 md5 pl-0>
                    <i class="material-icons d-inline-block pt-1 pr-2 check-icon">check_circle</i>
                    <h4 class="d-inline-block">{{$str("OTC Merchant application is approved.")}}</h4>
                </v-flex>
            </v-layout>
            <v-layout justify-center mb-6>
                <v-flex md5 xs12>
                    <h5 class="color-darkgray"> {{$str("Your Merchant application has been successfully approved. You can post advertisement in OTC Demo!")}}</h5>
                </v-flex>
            </v-layout>
        </div>
        <!-- Unregisterd : 미등록 -->
        <div v-else>
            <v-layout mt-4a mb-3 align-center justify-center row wrap>
                <div class=" p-relative vertical-center mb-2">
                    <input type="checkbox" v-model="isAgree" id="termsCheckbox">
                    <label for="termsCheckbox"><span><i class="material-icons">done</i></span>
                        <h5 class="d-inline-block mr-3 color-darkgray">{{$str("agreeTermsExplain")}}</h5>
                    </label>
                </div>
                <span class="color-blue mb-2 c-pointer" @click="go_Terms_of_Service">
                    &lt;{{$str("OTC Trading Terms and Conditions")}}&gt;</span>
            </v-layout>
            <v-layout>
                <v-flex xs12 md12 class="mb-6">
                    <!--위의 checkbox를 눌렀을때에만 버튼 활성화-->
                    <button class="pl-4 pr-4 btn-apply " :class="{'btn-blue btn-blue-hover ': isAgree, 'inactive' : !isAgree}"
                            @click="checkValidity">
                        {{$str("ApplyNow")}}
                    </button>
                </v-flex>
            </v-layout>
        </div>

        <v-dialog v-model="showUnverifiedModal">
            <v-layout row wrap>
                <!--header-->
                <v-flex xs12 text-xs-right>
                    <button><i class="material-icons " @click="showUnverifiedModal = false">close</i></button>
                    <h3 class="sprite-img2 ic-appeal-octa-lg horizontal-center"></h3>
                </v-flex>
                <v-flex xs12 text-xs-center mt-4 mb-4>
                    <h3 class="bold">{{$str("To apply merchant, you should complete the verification.")}}</h3>
                </v-flex>
                <v-flex xs12 text-xs-center mb-4 mr-4a ml-4a>
                    <h5 class="color-darkgray">{{$str("Please set nickname and verify ID to apply merchant.")}}</h5>
                </v-flex>
                <v-flex><v-divider></v-divider></v-flex>

                <v-flex xs12 text-xs-right mt-4 mb-4>
                    <v-layout justify-center>
                        <div class="verify-item mr-4a">
                            <div class = mr-2 :class="nicknameVerifiedImg"></div>
                            {{$str("Nickname Setting")}}
                        </div>
                        <div class="verify-item">
                            <div class = mr-2 :class="IDVerifiedImg"></div>
                            {{$str("ID_Verification")}}
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex xs12 text-xs-right>
                    <button class="btn-rounded-white text-white-hover" @click="showUnverifiedModal = false">
                        <h6>{{$str("cancel")}}</h6>
                    </button>
                    <button class="btn-rounded-blue btn-blue-hover" @click="goMypage">
                        <h6>{{$str("verify")}}</h6>
                    </button>
                </v-flex>
            </v-layout>
        </v-dialog>

        <div v-if="myInfo"></div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import NickNameModal from '@/components/NickNameModal.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import IdVerification from "../../../../vuex/model/IdVerification"
    import DialogIdVerification from "../../../../components/dialog/DialogIdVerification";

    export default {
        name: "merchant",
        components:{
            DialogIdVerification,
            NickNameModal},
        data: () => ({
            idVerification: new IdVerification(''),
            isAgree : false,        //term에 대해 check click 한 경우
            showVeriModal : false,  //apply now 클릭했을때
            showSuccessModal : false,   //form 입력 성공했을때 띄우는 dialog
            alreadySuccess : false,     //이미 제출해놨을때 대체하여 띄워지는 하단부를 보여줌
            showNickNameModal : false,      //nickname modal을 띄울려면 true로.
            showUnverifiedModal : false,
            nicknameVerifiedImg : 'sprite-img ic-success-sm',
            IDVerifiedImg : 'sprite-img ic-success-sm',
        }),
        computed: {
            myMerchantInfo() {
                return MainRepository.Merchant.getMyInfo();
            },
            getNickName(){
                //nickname이 없으면 false, 설정이미 했으면 true
                return (MainRepository.MyInfo.getUserInfo().nickname !== '')
            },
            myInfo() {
                return MainRepository.MyInfo.getUserInfo();
            },
        },
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
            MainRepository.Merchant.loadMyMerchantInfo(function () {});

            // GET User Id Verification
            MainRepository.MyPage.getIdVerification(function (idVerification) {
                self.idVerification = idVerification;
            });
        },
        methods :{
            checkValidity() {
                if (this.isAgree){
                    if(!this.myInfo.isIdVerified) {
                        this.showUnverifiedModal = true;
                        this.IDVerifiedImg = 'sprite-img2 ic-cancel-red-sm'
                        if(this.myInfo.nickname === ""){
                            this.nicknameVerifiedImg = 'sprite-img2 ic-cancel-red-sm'
                        }
                    }
                    else {
                        MainRepository.Merchant.postMerchant(() => {
                            //post 완료되면 바로 화면 update 됨.
                            MainRepository.Merchant.loadMyMerchantInfo(() =>{
                                Vue.prototype.$eventBus.$emit('showAlert', 2350);
                            });

                        });
                    }
                }
            },
            goMypage(){
                MainRepository.router().goMyPage();
            },
            go_Terms_of_Service(){
         /*       if(this.currentLang =='EN'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='ZH'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else if(this.currentLang =='HK'){
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }
                else{
                    var URL = "https://allbglobal.zendesk.com/hc/en-us/articles/360012379132";
                    window.open(URL, "_blank");
                }*/
            },
        },

    }
</script>

<style scoped>

    .pb-72 {
        padding-bottom: 72px;
    }
    .inactive{
        /*사각형 파랑배경 흰색폰트 버튼*/
        height: 40px;
        width: 100%;
        background: #d1d1d1;
        color: white;
        border-radius: 3px;
    }


    .btn-apply {
        width: auto !important;
    }
    .cardBox{
        height: 378px;
    }
    .photobox{
        height: 148px;
    }
    .photobox::-webkit-input-placeholder{
        color : #9294a6;
        text-align: center;

    }
    .textarea-style {
        width: 100%;
        height: 152px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        resize: none;
    }

    .attachment-img-style {
        height: 105px;
        margin-top: 22px;
    }

    .image-delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 9px;
    }

    .warning-text-wrapper-photo {
        position: absolute !important;
        bottom : -20px !important;
        right: 0px;
    }

    .status-icon {
        width: 24px;
        height: 24px;
    }

    .check-icon {
        color: #71aa3a;
    }

    .verify-item{
        display: flex;
        align-items: center;

    }
</style>