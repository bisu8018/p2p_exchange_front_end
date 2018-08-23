<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-id-verification_wrapper">

            <!-- 헤더, 타이틀 -->
            <h3>{{ $str('idVerification') }}</h3>
            <div class="dialog_btn-close">
                <i class="material-icons " @click="onClose">close</i>
            </div>
            <h5 class="color-darkgray mt-3 mb-4">{{ $str('nickNameExplain') }}</h5>

            <!-- 국가 선택 Select -->
            <h5 class="mb-2">{{ $str("nationality") }}</h5>
            <div class="p-relative mb-4">
                <select class="comp-selectbox h6" id="nationality" v-model="idVerification.nationality">
                    <option v-for="country in countries" :value="country.code">
                        {{ country.country }}
                    </option>
                </select>
                <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
            </div>

            <!-- 실명 -->
            <h5 class="mb-2">{{ $str("realName") }}</h5>
            <div class="p-relative mb-4">
                <input name="Last" v-model="idVerification.firstName" type="text" class="input"
                       @blur="onCheckName" :class="{'warning-border' : warning_realName}"
                       autocomplete="off" >
                <div class="warning-text-wrapper">
                    <span class="d-none" :class="{'warning-text' : warning_realName}">{{ verify_warning_realName }}</span>
                </div>
            </div>

            <!-- ID Number -->
            <h5 class="mb-2">{{ $str("Identification Number") }}</h5>
            <div class="p-relative">
                <input name="Identification" v-model="idVerification.identificationNo" type="text" class="input"
                       @blur="onCheckIdNum" :class="{'warning-border' : warning_IdNum}"
                       autocomplete="off" >
                <div class="warning-text-wrapper">
                    <span class="d-none" :class="{'warning-text' : warning_IdNum}">{{ verify_warning_IdNum }}</span>
                </div>
            </div>

            <!-- footer, 버튼 영역 -->
            <div class="dialog--footer">
                <button class="btn-rounded-white text-white-hover" @click="onClose">
                    <h6>{{$str("cancel")}}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" @click="onDone">
                    <h6>{{$str("Done")}}</h6>
                </button>
            </div>
        </div>
    </v-dialog>
</template>

<script>
    import MainRepository from "../../vuex/MainRepository";
    import IdVerification from "../../vuex/model/IdVerification";

    export default {
        name: "dialog-id-verification",
        props: {
            showDialog: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                idVerification: new IdVerification(''),

                warning_realName : false,
                warning_IdNum : false,
                verify_warning_realName : "",
                verify_warning_IdNum : "",

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
            }
        },
        created() {
            this.idVerification.modifyMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;
            this.idVerification.registerMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;

            for (let i ; i < this.countries.length; i++) {
                if (MainRepository.MyInfo.getUserInfo().nationality === this.countries[i].code) {
                    this.idVerification.nationality = this.countries[i].country;
                }
            }
        },
        methods: {
            // 이름 유효성 체크
            onCheckName(){
                if (this.realName === '') {
                    this.verify_warning_realName = this.$str("Please enter your name");
                    this.warning_realName = true;
                    return false;
                }
                this.warning_realName = false;
                return true;
            },

            // ID 유효성 체크
            onCheckIdNum(){
                if (this.IDNum === '') {
                    this.verify_warning_IdNum = this.$str("Please enter your passport number");
                    this.warning_IdNum = true;
                    return false;
                }
                this.warning_IdNum = false;
                return true;
            },

            onClose(item) {
                this.$emit('close', item);
            },
            onDone() {
                let self = this;

                if (this.onCheckName() && this.onCheckIdNum()) {
                    MainRepository.MyPage.postIdVerification(MainRepository.MyInfo.getUserInfo().email, self.idVerification, function(data){ });
                    self.$eventBus.$emit('showAlert', 0);
                    this.onClose();
                }
            }
        },
    }
</script>

<style scoped>
    .dialog-id-verification_wrapper {
        text-align: left;
        position: relative;
    }

    .dialog-id-verification_wrapper h3 {
        font-weight: bold;
    }


</style>