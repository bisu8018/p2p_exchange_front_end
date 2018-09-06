<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-id-verification_wrapper">

            <!-- 헤더, 타이틀 -->
            <h3>{{ $str('idVerification') }}</h3>
            <div class="dialog_btn-close">
                <i class="material-icons " @click="onClose">close</i>
            </div>
            <h5 class="color-darkgray mt-3 mb-4">{{ $str('nickNameExplain') }}</h5>


            <!---------------------- 국가 ---------------------->
            <h5 class="mb-2">{{ $str("nationality") }}</h5>
            <div class="p-relative mb-4">
                <input name="Last" :value="$str(getNation)" type="text" class="input-disabled" disabled>
            </div>


            <!----------------------중국 국적일 경우--------------------->
            <div v-if="getNationCode === 'CN'">

                <!-- 실명 -->
                <h5 class="mb-2">{{ $str("realName") }}</h5>
                <div class="p-relative mb-4">
                    <input name="Last" v-model="idVerification.realName" type="text" class="input"
                           @keyup="onCheck('real')" :class="{'warning-border' : warning_realName}"
                           autocomplete="off">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              :class="{'warning-text' : warning_realName}">{{ verify_warning_realName }}</span>
                    </div>
                </div>
            </div>


            <!----------------------중국 외 국적일 경우---------------------->
            <div v-else>

                <!-- 이름 -->
                <h5 class="mb-2">{{ $str("firstName") }}</h5>
                <div class="p-relative mb-4">
                    <input name="Last" v-model="firstName" type="text" class="input"
                           @keyup="onCheck('first')" :class="{'warning-border' : warning_firstName}"
                           autocomplete="off">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              :class="{'warning-text' : warning_firstName}">{{ verify_warning_firstName }}</span>
                    </div>
                </div>

                <!-- 성 -->
                <h5 class="mb-2">{{ $str("lastName") }}</h5>
                <div class="p-relative mb-4">
                    <input name="Identification" v-model="lastName" type="text" class="input"
                           @keyup="onCheck('last')" :class="{'warning-border' : warning_lastName}"
                           autocomplete="off">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              :class="{'warning-text' : warning_lastName}">{{ verify_warning_lastName }}</span>
                    </div>
                </div>
            </div>


            <!---------------------- ID Number ---------------------->
            <h5 class="mb-2">
                {{ $str("identificationNumber") }}


                <!--중국 국적 아닐 경우 설명 추가-->
                <span class="h6" v-if="getNationCode !== 'CN'">
                    ({{ $str("identificationNumberExplain")}})
                </span>
            </h5>
            <div class="p-relative mb-4">
                <input name="Identification" v-model="idVerification.idNumber" type="text" class="input"
                       @keyup="onCheck('idNum')" :class="{'warning-border' : warning_IdNum}"
                       autocomplete="off">
                <div class="warning-text-wrapper">
                    <span class="d-none" :class="{'warning-text' : warning_IdNum}">{{ verify_warning_IdNum }}</span>
                </div>
            </div>


            <!---------------------- 여권, ID 사진 업로드 ---------------------->
            <!---------------------- (중국 외 국적일 경우) ---------------------->
            <div v-if="getNationCode !== 'CN'">
                <h5 class="mb-2">{{ $str("photoIdentification") }}</h5>

                <div class="mb-4">
                    <label class="">
                        <div class="textarea-style p-relative" :class="{'warning-border' : warning_attachment_file}">

                            <!--사진 없을 경우-->
                            <div v-if="image === ''" class="ma-4a c-pointer">
                                <input type="file" id="file" ref="file"
                                       v-on:change="onCheck('file')"
                                       class="d-none"/>
                                <div class="d-inline-block mt-3 mb-1">
                                    <div class="sprite-img ic-upload"></div>
                                </div>
                                <div class="color-darkgray h6">
                                    {{ $str('identificationUpload') }}
                                </div>
                            </div>

                            <!--사진 있을 경우-->
                            <div v-else class="text-xs-center p-relative">
                                <img :src="image" class="attachment-img-style">
                                <span class="text-white-hover color-blue c-pointer vertical-center image-delete"
                                      @click="deleteFile()">
                                    {{ $str('delete') }}
                                    <i class="material-icons">close</i>
                                </span>
                            </div>

                            <!--용량 초과 경고 문구-->
                            <div class="warning-text-wrapper warning-textArea-wrapper">
                                <span class="d-none"
                                      :class="{'warning-text' : warning_attachment_file}">{{ verify_warning_attachment_file }}</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>


            <!---------------------- footer, 버튼 영역 ---------------------->
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
    import IdVerificationId from "../../vuex/model/IdVerificationId";
    import Vue from "vue";
    import {findCountryName} from "@/common/common";

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
                idVerification: new IdVerificationId(''),

                warning_realName: false,
                warning_IdNum: false,
                verify_warning_realName: "",
                verify_warning_IdNum: "",

                warning_firstName: false,
                warning_lastName: false,
                warning_attachment_file: false,
                verify_warning_firstName: "",
                verify_warning_lastName: "",
                verify_warning_attachment_file: "",
                firstName: '',
                lastName: '',
                file: '',
                image: '',
            }
        },
        computed: {
            getNation() {
                return findCountryName(MainRepository.MyInfo.getUserInfo().nationality);
            },
            getNationCode() {
                return MainRepository.MyInfo.getUserInfo().nationality;
            }
        },
        methods: {
            onCheck(type) {
                switch (type) {
                    case 'real' :
                        if (!this.idVerification.realName) {
                            this.warning_name = true;
                            return false;
                        }
                        this.warning_name = false;
                        return true;

                    case 'first' :
                        if (this.firstName === '') {
                            this.warning_firstName = true;
                            return false;
                        }
                        this.warning_firstName = false;
                        return true;

                    case 'last' :
                        if (this.lastName === '') {
                            this.warning_lastName = true;
                            return false;
                        }
                        this.warning_lastName = false;
                        return true;

                    case 'idNum' :
                        if (!this.idVerification.idNumber) {
                            this.warning_IdNum = true;
                            return false;
                        }
                        this.warning_IdNum = false;
                        return true;

                    case 'file' :
                        let fileInfo = this.$refs.file.files[0];
                        let fileSize = fileInfo.size;
                        if (fileSize > 5e+6) {
                            this.warning_attachment_file = true;
                            this.verify_warning_attachment_file = this.$str('warningAttachmentFileSize');
                            return false;
                        }
                        this.warning_attachment_file = false;
                        this.handleFileUpload(fileInfo);

                        break;
                }
            },

            onClose(item) {
                this.$emit('close');
                this.onClear();
            },
            onDone() {
                let self = this;

                // 중국 국적일때
                if(this.getNationCode === 'CN'){
                    if(this.onCheck('real') && this.onCheck('idNum')){
                        MainRepository.MyPage.postIdVerification(
                            MainRepository.MyInfo.getUserInfo().email,
                            self.idVerification
                            , (data) => {
                            });
                    }
                }
                // 중국 외 국적 일때
                else{

                }


                this.$emit('done');
                this.onClose();
                this.onClear();
            },
            onClear() {
                this.idVerification = new IdVerificationId('');
                this.verify_warning_realName = "";
                this.verify_warning_IdNum = "";
                this.verify_warning_firstName = "";
                this.verify_warning_lastName = "";
                this.verify_warning_attachment_file = "";
                this.warning_realName = false;
                this.warning_IdNum = false;
                this.warning_firstName = false;
                this.warning_lastName = false;
                this.warning_attachment_file = false;
                this.firstName = '';
                this.lastName = '';
                this.file = '';
                this.image = '';
            },
            handleFileUpload(fileInfo) {         //첨부파일 사진 등록 및 출력
                this.file = fileInfo;
                let reader = new FileReader();

                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(this.file);
            },
            submitFile() {      // 첨부파일 서버 전송
                let formData = new FormData();
                formData.append('file', this.file);
                return formData;
            },
            deleteFile() {      //뷰단 첨부파일 데이터 제거
                this.file = '';
                this.image = '';
            },
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

    .textarea-style {
        width: 100%;
        height: 152px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        resize: none;
        text-align: center;
    }

    .image-delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 9px;
    }

    .warning-textArea-wrapper {
        top: 153px !important;
    }

    .attachment-img-style {
        height: 105px;
        margin-top: 22px;
    }

</style>