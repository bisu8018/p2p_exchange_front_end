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
                <div class="section-border-depth pt-5 pb-5">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3">{{$str("Advertising")}}</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">{{$str("Merchants are able to post advertisements, flexible and covenient to trade.")}}</h4>
                </div>
            </v-flex>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3">
                <div class="section-border-depth pt-5 pb-5">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3 medium">{{$str("Exclusive logo")}}</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">{{$str("Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.")}}</h4>
                </div>
            </v-flex>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3">
                <div class="section-border-depth pt-5 pb-72">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3">{{$str("One-to-one Service")}}</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">{{$str("Merchants will enjoy our one-to-one exclusive service.")}}</h4>
                </div>
            </v-flex>

        </v-layout>
        <!--merchant 등록을 안했을때 나오는 기본화면-->
        <div v-if="!alreadySuccess">
            <v-layout mt-4a mb-3 align-center justify-center row wrap>
                    <div class=" p-relative vertical-center">
                        <input type="checkbox" v-model="isAgree" id="termsCheckbox">
                        <label for="termsCheckbox"><span><i class="material-icons">done</i></span></label>
                        <h5 class="d-inline-block mr-3 color-darkgray">{{$str("agreeTermsExplain")}}</h5>
                    </div>
                    <button>
                        <span class="color-blue">&lt;{{$str("OTC Trading Terms and Conditions")}}&gt;</span>
                    </button>
            </v-layout>
            <v-layout>
                <v-flex xs12 md12 class="mb-6 mt-1">
                    <!--위의 checkbox를 눌렀을때에만 버튼 활성화-->
                    <button class="pl-4 pr-4 btn-apply " :class="{'btn-blue btn-blue-hover ': isAgree, 'inactive' : !isAgree}"
                            @click="showDialog">
                        {{$str("ApplyNow")}}
                    </button>
                </v-flex>
            </v-layout>
        </div>
        <!-- 인증 제출을 이미 했을시 뜨는 화면-->
        <div v-else>
            <v-layout row wrap align-center fill-height justify-center mt-4a mb-3>
                <v-flex xs12 md1 pr-3 pt-2 text-md-right>
                    <i class="material-icons">schedule</i>
                </v-flex>
                <v-flex xs12 md4 text-md-left pl-0><h2>{{$str("Your application is under review.")}}</h2></v-flex>
            </v-layout>
            <v-layout justify-center mb-6>
                <v-flex md5 xs12>
                    <h4> {{$str("Your application has been successfully submitted. We will complete the review within 2 working days.")}}</h4>
                </v-flex>
            </v-layout>
        </div>
        <!--첫번째로 뜨는 정보 입력 dialog-->
        <v-dialog v-model="showVeriModal" persistent>
            <v-layout row wrap>
                <!--header-->
                <v-flex xs6 text-xs-left >
                    <h3 class="bold">{{$str("ID_Verification")}}</h3>
                </v-flex>
                <v-flex xs6 text-xs-right>
                    <button><i class="material-icons " @click="showVeriModal = false">close</i></button>
                </v-flex>
                <v-flex xs12 color-darkgray text-xs-left mt-3 mb-4>
                    {{$str("For safety reasons, please complete the transaction information")}}
                </v-flex>
                <!-- 1. Nationality 창-->
                <v-flex xs12 text-xs-left>
                    {{$str("nationality")}}
                </v-flex>
                <v-flex xs12  mt-2 mb-4 >
                    <div class="p-relative">
                        <select class="comp-selectbox h6" id="nationality" v-model="nationality">
                            <option v-for="country in countries" v-bind:value="country.code">{{country.country}}
                            </option>
                        </select>
                        <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                    </div>
                </v-flex>
                <!-- 2. First Name-->
                <v-flex xs12 text-xs-left>{{$str("First Name")}}</v-flex>
                <v-flex xs12 mt-2 mb-4>
                    <div class="p-relative">
                        <input name="First" v-model="FirstName" type="text" class="input"
                               @blur="onCheckFirst" :class="{'warning-border' : warning_first}"
                              autocomplete="off" >
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_first}">{{verify_warning_first}}</span>
                        </div>
                    </div>
                </v-flex>
                <!-- 3. Last Name 창-->
                <v-flex xs12 text-xs-left>{{$str("Last Name")}}</v-flex>
                <v-flex xs12 mt-2 mb-4>
                    <div class="p-relative">
                        <input name="Last" v-model="LastName" type="text" class="input"
                               @blur="onCheckLast" :class="{'warning-border' : warning_last}"
                               autocomplete="off" >
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_last}">{{verify_warning_last}}</span>
                        </div>
                    </div>
                </v-flex>
                <!--Identification Number-->
                <v-flex xs12 text-xs-left>{{$str("Identification Number")}}</v-flex>
                <v-flex xs12 text-xs-left color-darkgray>
                    <h6>({{$str("e.g. Passport, ID or Driver's License")}})</h6>
                </v-flex>
                <v-flex xs12 mt-2 mb-4>
                    <div class="p-relative">
                        <input name="Identification" v-model="IDNum" type="text" class="input"
                               @blur="onCheckIdNum" :class="{'warning-border' : warning_IdNum}"
                               autocomplete="off" >
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_IdNum}">{{verify_warning_IdNum}}</span>
                        </div>
                    </div>
                </v-flex>
                <!-- Photo 올리기-->
                <v-flex xs12 text-xs-left>{{$str("Photo of Identification")}}</v-flex>
                <v-flex xs12 mt-2 mb-4>
                    <div class="photobox input">
                        <input name="IdPhoto" type="file" @change="onFileChange"
                               class=" "
                              autocomplete="off" placeholder="Upload photo of identification">
                        <div class="sprite-img ic-upload"> </div>
                        <h6>{{$str("Upload photo of identiication")}}</h6>
                    </div>
                </v-flex>
                <v-flex xs12 text-xs-right>
                    <button class="btn-rounded-white text-white-hover" @click="showVeriModal = false" >
                        <h6>{{$str("cancel")}}</h6>
                    </button>
                    <button class="btn-rounded-blue btn-blue-hover" @click="goDone">
                        <h6>{{$str("Done")}}</h6>
                    </button>
                </v-flex>
            </v-layout>
        </v-dialog>
        <!-- 정보 입력시 뜨는 공지창-->
        <v-dialog v-model="showSuccessModal" persistent>
            <v-layout row wrap>
                <!--header-->
                <v-flex xs12 text-xs-right>
                    <button><i class="material-icons " @click="showSuccessModal = false">close</i></button>
                    <h3 class="sprite-img ic-watch horizontal-center"></h3>
                </v-flex>
                <v-flex xs12 text-xs-center mt-4 mb-4>
                    <h3 class="bold">{{$str("Your application is under review")}}</h3>
                </v-flex>
                <v-flex xs12 text-xs-center mb-4 color-darkgray>
                    {{$str("Authentication has been successfully submitted.")}}
                    {{$str("We will complete the review within 2 working days")}}
                </v-flex>
                <v-flex xs12 text-xs-right>
                    <button class="btn-rounded-blue btn-blue-hover" @click="showSuccessModal = false; alreadySuccess = true">
                        <h6>{{$str("confirm")}}</h6>
                    </button>
                </v-flex>
            </v-layout>
        </v-dialog>

    </div>

</template>

<script>
    import Vue from 'vue';
    export default {
        name: "merchant",
        data: () => ({
            isAgree : false,
            showVeriModal : false,
            showSuccessModal : false,
            alreadySuccess : false,
            FirstName : '',
            LastName : '',
            IDNum : '',
            nationality: "CN",
            verify_warning_first : "",
            verify_warning_last : "",
            verify_warning_IdNum : "",
            warning_first : false,
            warning_last : false,
            warning_IdNum : false,
            countries: [
                {country: 'China', code: 'CN'},
                {country: 'Singapore', code: 'SG'},
                {country: 'India', code: 'IN'},
                {country: 'Vietnam', code: 'VN'},
                {country: 'Canada', code: 'CA'},
                {country: 'Australia', code: 'AU'},
                {country: 'Korea', code: 'KR'},
                {country: 'Switzerland', code: 'CH'},
                {country: 'Netherlands', code: 'NL'},
                {country: 'Taiwan', code: 'TW'},
                {country: 'Russia', code: 'RU'},
                {country: 'United Kingdom', code: 'UK'},
                {country: 'Hong Kong(china)', code: 'HK'},
                {country: 'Nigeria', code: 'NG'},
                {country: 'Indonesia', code: 'ID'},
                {country: 'Philippines', code: 'PH'},
                {country: 'Cambodia', code: 'KH'}
            ],

        }),
        methods :{
            showDialog(){
                if(this.isAgree == true){
                    this.showVeriModal = true;
                }

            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            goDone(){
                if (this.onCheckFirst() && this.onCheckLast() && this.onCheckIdNum()) {
                    this.showVeriModal = false;
                    this.showSuccessModal = true;

                }
            },
            onCheckFirst(){
                if (this.FirstName === "") {
                    this.verify_warning_first= Vue.prototype.$str("Please enter your first name");
                    this.warning_first = true;
                    return false;
                }
                this.warning_first = false;
                return true;
            },
            onCheckLast(){
                if (this.LastName === "") {
                    this.verify_warning_last= Vue.prototype.$str("Please enter your last name");
                    this.warning_last = true;
                    return false;
                }
                this.warning_last = false;
                return true;

            },
            onCheckIdNum(){
                if (this.IDNum === "") {
                    this.verify_warning_IdNum= Vue.prototype.$str("Please enter your passport number");
                    this.warning_IdNum = true;
                    return false;
                }
                this.warning_IdNum = false;
                return true;
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
    .photobox{
        height: 148px;
    }
    .photobox::-webkit-input-placeholder{
        color : #9294a6;
        text-align: center;

    }


</style>