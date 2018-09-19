<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-add-new-payment_wrapper">

            <!-- 헤더, 타이틀 -->
            <h3>{{ header }}</h3>
            <div class="dialog_btn-close">
                <i class="material-icons " @click="onClose">close</i>
            </div>

            <!-- 결제 수단 Select -->
            <div class="p-relative my-4">
                <select class="comp-selectbox h6" v-model="type" :disabled="edit">
                    <option value="" disabled selected hidden>{{ $str('paymentMethodSelectboxPlaceholder') }}</option>
                    <option value="bank">{{ $str("bankAccountText") }}</option>
                    <option value="alipay">{{ $str("alipayText") }}</option>
                    <option value="wechat">{{ $str("wechatPayText") }}</option>
                </select>
                <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
            </div>

            <!-- PaymentMethod에 따라 바뀌는 영역 -->
            <div v-if="type !== ''">

                <!-- 이름 -->
                <h5 class="mb-2">{{ $str("name") }}</h5>
                <div class="p-relative mb-4">

                    <!-- Input -->
                    <input type="text" class="input"
                           :placeholder="$str('namePlaceholder')"
                           v-model="paymentMethods.ownerName"
                           :class="{'warning-border' : warning_name}"
                           @keyup="onCheck('name')"/>

                    <!-- 유효성 경고 텍스트 -->
                    <div class="warning-text-wrapper">
                        <span class="d-none" :class="{'warning-text' : warning_name}">{{ verify_warning_name }}</span>
                    </div>
                </div>

                <!-- PaymentMethod === alipay -->
                <div v-if="type === 'alipay'">
                    <h5 class="mb-2">{{ $str("alipayText") }} ID</h5>
                    <div class="p-relative mb-4">

                        <!-- Input -->
                        <input type="text" class="input"
                               :placeholder="$str('alipayPlaceholder')"
                               v-model="paymentMethods.alipayId"
                               :class="{'warning-border' : warning_alipay}"
                               @keyup="onCheck('alipay')"/>

                        <!-- 유효성 경고 텍스트 -->
                        <div class="warning-text-wrapper">
                            <span class="d-none"
                                  :class="{'warning-text' : warning_alipay}">{{ verify_warning_alipay }}</span>
                        </div>
                    </div>
                </div>

                <!-- PaymentMethod === wechat -->
                <div v-else-if="type === 'wechat'">
                    <h5 class="mb-2">{{ $str("wechatPayText") }} ID</h5>
                    <div class="p-relative mb-4">
                        <input type="text" class="input" :placeholder="$str('wechatPlaceholder')"
                               v-model="paymentMethods.wechatId"
                               v-bind:class="{'warning-border' : warning_wechat}"
                               @keyup="onCheck('wechat')">
                        <div class="warning-text-wrapper">
                            <span class="d-none"
                                  :class="{'warning-text' : warning_wechat}">{{ verify_warning_wechat }}</span>
                        </div>
                    </div>
                </div>

                <!-- PaymentMethod === bank -->
                <div v-else-if="type === 'bank' || type === 'bankaccount'">

                    <!-- 은행 이름 -->
                    <div class="mb-4">
                        <h5 class="mb-2">{{ $str("bankName") }}</h5>
                        <div class="p-relative">

                            <!-- Input -->
                            <input type="text" class="input"
                                   :placeholder="$str('bankNamePlaceholder')"
                                   v-model="paymentMethods.bankName"
                                   :class="{'warning-border' : warning_bank}"
                                   @keyup="onCheck('bank')"/>

                            <!-- 유효성 경고 텍스트 -->
                            <div class="warning-text-wrapper">
                                <span class="d-none"
                                      :class="{'warning-text' : warning_bank}">{{ verify_warning_bank }}</span>
                            </div>
                        </div>
                    </div>

                    <!--은행정보-->
                    <div class="mb-4">
                        <h5 class="mb-2">{{ $str("branchInfo") }}</h5>
                        <input type="text" class="input"
                               :placeholder="$str('branchInfoPlaceholder')"
                               v-model="paymentMethods.bankBranchInfo"/>
                    </div>

                    <!--은행계좌-->
                    <div class="mb-4">
                        <h5 class="mb-2">{{ $str("bankAccountText") }}</h5>
                        <div class="p-relative">
                            <input type="text" class="input"
                                   :placeholder="$str('bankPlaceholder')"
                                   v-model="paymentMethods.bankAccount"
                                   :class="{'warning-border' : warning_bank_accout}"
                                   @keyup="onCheck('bankAccount')">
                            <div class="warning-text-wrapper">
                                <span class="d-none" :class="{'warning-text' : warning_bank_accout}">{{ verify_warning_bank_account }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- QR Code -->
                <div v-if="type !== 'bank' && type !== 'bankaccount'">
                    <h5 class="mb-2">{{ $str("qrCode") }}</h5>

                    <div class="mb-4">
                        <label class="">
                            <div class="textarea-style p-relative" :class="{'warning-border' : warning_attachment_file}">

                                <!--사진 없을 경우-->
                                <div v-if="image === ''" class="ma-4a">
                                    <input type="file" id="file" ref="file"
                                           v-on:change="onCheck('attachmentFile')"
                                           class="d-none"/>
                                    <div class="d-inline-block mt-2">
                                        <div class="sprite-img ic-upload"></div>
                                    </div>
                                    <div class="color-darkgray h6">
                                        {{ type === 'wechat' ? $str('wechatQrCodeExplain') :
                                        $str('alipayQrCodeExplain') }} (*.jpg / *.png / *.jpeg)
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


                <!-- Trade Password -->
                <h5 class="mb-2">{{ $str("tradePwText") }}</h5>
                <div class="p-relative mb-4">
                    <input type="password" class="input"
                           :placeholder="$str('tradePwPlaceholder')"
                           v-model="paymentMethods.tradePassword"
                           :class="{'warning-border' : warning_trade_password}"
                           @keyup="onCheck('tradePassword')"/>
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              :class="{'warning-text' : warning_trade_password}">{{ verify_warning_trade_password }}</span>
                    </div>
                </div>
            </div>

            <!-- footer, 버튼 영역 -->
            <div class="dialog--footer">
                <button class="btn-rounded-white text-white-hover btn-delete" @click="onDelete" v-if="edit"><h6
                        class="color-red">{{ $str("delete") }}</h6></button>
                <button class="btn-rounded-white text-white-hover" @click="onClose"><h6>{{ $str("cancel") }}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" @click="wholeCheck"><h6>{{ $str("Done") }}</h6></button>
            </div>
        </div>
    </v-dialog>
</template>

<script>
    import MainRepository from "../../vuex/MainRepository";
    import CommonService from "../../service/common/CommonService";
    import PaymentMethod from "../../vuex/model/PaymentMethod";
    import Vue from "vue";

    export default {
        name: "dialog-add-new-payment",
        props: {
            data: {},
            showDialog: {
                type: Boolean,
                default: () => false
            },
            myInfo: {},
            edit: {
                type: Boolean,
                default: () => false
            }
        },
        data() {
            return {
                // paymentMethods: '',
                typeData: '',
                selectedType: '',

                warning_name: false,
                warning_alipay: false,
                warning_wechat: false,
                warning_bank: false,
                warning_bank_accout: false,
                warning_attachment_file: false,
                warning_trade_password: false,
                verify_warning_name: Vue.prototype.$str('warning_name'),
                verify_warning_alipay: Vue.prototype.$str('warning_alipay'),
                verify_warning_wechat: Vue.prototype.$str('warning_wechat'),
                verify_warning_bank: Vue.prototype.$str('warning_bank'),
                verify_warning_bank_account: Vue.prototype.$str('warning_name'),
                verify_warning_trade_password: Vue.prototype.$str('warning_trade_password'),
                verify_warning_attachment_file: '',
                file: '',
                image: '',
            }
        },
        computed: {
            header() {
                if (this.edit) {
                    return this.$str('editPayment');
                } else {
                    return this.$str('paymentMethod');
                }
            },
            paymentMethods() {
                // 수정모드일 때 : 기존 데이터 가져오기
                if (this.edit) {
                    return new PaymentMethod(this.data);
                } else {
                    return new PaymentMethod('');
                }
            },
            type: {
                get() {
                    // 수정모드일 때 : 기존 데이터 가져오기
                    if (this.edit) {
                        this.typeData = this.paymentMethods.type
                    }
                    return this.typeData;
                },
                set(value) {
                    if (value === 'alipay') {
                        this.typeData = 'alipay';
                    } else if (value === 'wechat') {
                        this.typeData = 'wechat';
                    } else if (value === 'bank') {
                        this.typeData = 'bank';
                    } else {
                        this.typeData = '';
                    }
                }
            },
        },
        created() {

        },
        watch: {
            typeData: function (data) {
                this.getImg();
            }
        },
        methods: {

            //값 체크 로직
            onCheck(type) {
                switch (type) {

                    // 성명 체크
                    case 'name':
                        if (this.paymentMethods.ownerName === '') {
                            this.warning_name = true;
                            return false;
                        }
                        this.warning_name = false;
                        return true;

                        break;


                    // 알리페이 아이디 체크
                    case 'alipay':
                        if (this.paymentMethods.alipayId === '') {
                            this.warning_alipay = true;
                            return false;
                        }
                        this.warning_alipay = false;

                        return true;

                        break;


                    //위챗페이 아이디 체크
                    case 'wechat':
                        if (this.paymentMethods.wechatId === '') {
                            this.warning_wechat = true;
                            return false;
                        }
                        this.warning_wechat = false;

                        return true;

                        break;


                    //은행 이름 체크
                    case 'bank':
                        if (this.paymentMethods.bankName === '') {
                            this.warning_bank = true;
                            return false;
                        }
                        this.warning_bank = false;

                        return true;

                        break;


                    //은행 계좌 체크
                    case 'bankAccount':

                        if (this.paymentMethods.bankAccount === '') {
                            this.warning_bank_accout = true;
                            return false;
                        }
                        this.warning_bank_accout = false;

                        return true;

                        break;


                    //거래 비밀번호 체크
                    case 'tradePassword':

                        if (this.paymentMethods.tradePassword === '') {
                            this.warning_trade_password = true;
                            return false;
                        }
                        this.warning_trade_password = false;
                        return true;

                        break;


                    //첨부파일 체크
                    case 'attachmentFile':

                        let fileInfo = this.$refs.file.files[0];
                        let fileSize = fileInfo.size;
                        if (fileSize > 2000000) {
                            this.warning_attachment_file = true;
                            this.verify_warning_attachment_file = this.$str('warningAttachmentFileSize');
                            return false;
                        }
                        this.warning_attachment_file = false;
                        this.handleFileUpload(fileInfo);

                        break;
                }
            },
            wholeCheck() {
                if ((this.typeData === 'alipay' && this.onCheck('alipay')) ||
                    (this.typeData === 'wechat' && this.onCheck('wechat')) ||
                    (this.typeData === 'bank' && this.onCheck('bank') && this.onCheck('bankAccount'))
                ) {
                    if (this.onCheck('name') && this.onCheck('tradePassword')) {
                        this.onDone();
                    }
                }
            },
            onClearData() {
                this.paymentMethods.activeYn = 'n';
                this.paymentMethods.alipayId = '';
                this.paymentMethods.alipayQrCodeImgUrl = '';
                this.paymentMethods.bankAccount = '';
                this.paymentMethods.bankBranchInfo = '';
                this.paymentMethods.bankName = '';
                this.paymentMethods.memberNo = null;
                this.paymentMethods.modifyDatetime = null;
                this.paymentMethods.modifyMemberNo = null;
                this.paymentMethods.ownerName = '';
                this.paymentMethods.registerDatetime = null;
                this.paymentMethods.registerMemberNo = null;
                this.paymentMethods.type = '';
                this.paymentMethods.wechatId = '';
                this.paymentMethods.wechatQrCodeImgUrl = '';
                this.paymentMethods.tradePassword = '';
                this.typeData = '';
            },
            getImg() {
                let type = this.paymentMethods.type;
                let alipay_img = this.paymentMethods.alipayQrCodeImgUrl;
                let wechat_img = this.paymentMethods.wechatQrCodeImgUrl;

                if (type === 'alipay') {
                    this.image = alipay_img;
                } else if (type === 'wechat') {
                    this.image = wechat_img;
                } else {
                    this.image = '';
                }
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
            onClose(item) {
                this.onClearData();
                this.$emit('close');
            },
            onDone() {
                this.paymentMethods.type = this.type;
                this.paymentMethods.memberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.modifyMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.registerMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;

                //파일첨부
                if (this.file !== '' && this.type != 'bank') {
                    let _purpose = '';
                    if (this.paymentMethods.type === 'alipay') {
                        _purpose = 'alipay';
                    } else if (this.type === 'wechat') {
                        _purpose = 'wechatpay'
                    }
                    MainRepository.Service.Common().fileUpload.fileUpload({
                        file: this.submitFile(),
                        purpose: _purpose
                    }, (url) => {
                        if (this.type === 'alipay') {
                            this.paymentMethods.alipayQrCodeImgUrl = url
                        } else if (this.type === 'wechat') {
                            this.paymentMethods.wechatQrCodeImgUrl = url
                        }
                        this.onPost();
                    });
                } else {
                    this.onPost();
                }

            },
            onPost() {
                MainRepository.MyPage.setPaymentMethod(this.myInfo.email, this.paymentMethods, (data) => {
                    this.$eventBus.$emit('showAlert', 2253);
                    this.onClose();
                    this.$emit('done');
                });
            },

            onDelete(item) {
                this.paymentMethods.type = this.type;
                this.paymentMethods.memberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.modifyMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.registerMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;

                MainRepository.MyPage.deletePaymentMethod(this.myInfo.email, this.paymentMethods, function (data) {
                    this.$eventBus.$emit('showAlert', 2254);
                    this.onClose();
                    this.$emit('delete');
                });
            }
        },
    }
</script>

<style scoped>
    .dialog-add-new-payment_wrapper {
        text-align: left;
        position: relative;
    }

    .dialog-add-new-payment_wrapper h3 {
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

    .dialog-add-new-payment_wrapper select:disabled {
        opacity: .5;
        cursor: not-allowed;
    }

    .btn-delete {
        position: absolute;
        left: 0;
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

    .warning-textArea-wrapper {
        top: 153px !important;
    }
</style>