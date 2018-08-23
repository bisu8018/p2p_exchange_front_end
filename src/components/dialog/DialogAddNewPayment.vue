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
            <div>

                <!-- 이름 -->
                <h5 class="mb-2">{{ $str("name") }}</h5>
                <div class="p-relative mb-4">

                    <!-- Input -->
                    <input type="text" class="input"
                           :placeholder="$str('namePlaceholder')"
                           v-model="paymentMethods.ownerName"
                           :class="{'warning-border' : warning_name}"
                           @keyup="onCheckName" />

                    <!-- 유효성 경고 텍스트 -->
                    <div class="warning-text-wrapper">
                        <span class="d-none" :class="{'warning-text' : warning_name}">{{ verify_warning_name }}</span>
                    </div>
                </div>

                <!-- PaymentMethod === alipay -->
                <div v-if="type === 'alipay'">
                    <h5 class="mb-2">{{ $str("alipayText") }}</h5>
                    <div class="p-relative mb-4">

                        <!-- Input -->
                        <input type="text" class="input"
                               :placeholder="$str('alipayPlaceholder')"
                               v-model="paymentMethods.alipayId"
                               :class="{'warning-border' : warning_alipay}"
                               @keyup="onCheckAlipay" />

                        <!-- 유효성 경고 텍스트 -->
                        <div class="warning-text-wrapper">
                            <span class="d-none" :class="{'warning-text' : warning_alipay}">{{ verify_warning_alipay }}</span>
                        </div>
                    </div>
                </div>

                <!-- PaymentMethod === wechat -->
                <div v-else-if="type === 'wechat'">
                    <h5 class="mb-2">{{ $str("wechatPayText") }}</h5>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('wechatPlaceholder')"
                               v-model="paymentMethods.wechatId"
                               v-bind:class="{'warning-border' : warning_wechat}" @keyup="onCheckWechat">
                        <div class="warning-text-wrapper">
                            <span class="d-none" :class="{'warning-text' : warning_wechat}">{{ verify_warning_wechat }}</span>
                        </div>
                    </div>
                </div>

                <!-- PaymentMethod === bank -->
                <div v-else-if="type === 'bank'">

                    <!-- 은행 이름 -->
                    <div class="mb-4">
                        <h5 class="mb-2">{{ $str("bankName") }}</h5>
                        <div class="p-relative">

                            <!-- Input -->
                            <input type="text" class="input"
                                   :placeholder="$str('bankNamePlaceholder')"
                                   v-model="paymentMethods.bankName"
                                   :class="{'warning-border' : warning_bank}"
                                   @keyup="onCheckBank" />

                            <!-- 유효성 경고 텍스트 -->
                            <div class="warning-text-wrapper">
                                <span class="d-none" :class="{'warning-text' : warning_bank}">{{ verify_warning_bank }}</span>
                            </div>
                        </div>
                    </div>

                    <!--은행정보-->
                    <div class="mb-4">
                        <h5 class="mb-2">{{ $str("branchInfo") }}</h5>
                        <input type="text" class="input"
                               :placeholder="$str('branchInfoPlaceholder')"
                               v-model="paymentMethods.bankBranchInfo" />
                    </div>

                    <!--은행계좌-->
                    <div class="mb-4">
                        <h5 class="mb-2">{{ $str("bankAccountText") }}</h5>
                        <div class="p-relative">
                            <input type="text" class="input"
                                   :placeholder="$str('bankPlaceholder')"
                                   v-model="paymentMethods.bankAccount"
                                   :class="{'warning-border' : warning_bank_accout}"
                                   @keyup="onCheckBankAccount">
                            <div class="warning-text-wrapper">
                                <span class="d-none" :class="{'warning-text' : warning_bank_accout}">{{ verify_warning_bank_account }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- QR Code -->
                <div v-if="type !== 'bank'">
                    <h5 class="mb-2">{{ $str("qrCode") }}</h5>
                    <div class="mb-4">
                        <label class="">
                            <div class="textarea-style p-relative"
                                 :class="{'warning-border' : warning_attachment_file}">
                                <div v-if="file === ''" class="ma-4a">
                                    <input type="file" id="file" ref="file"
                                           v-on:change="onCheckAttachmentFile()"
                                           class="d-none" />
                                    <div class="d-inline-block mt-2">
                                        <div class="sprite-img ic-upload"></div>
                                    </div>
                                    <div class="color-darkgray h6">
                                        {{ type === 'wechat' ? $str('wechatQrCodeExplain') :
                                        $str('alipayQrCodeExplain') }} (*.jpg / *.png / *.jpeg)
                                    </div>
                                </div>
                                <div v-else class="text-xs-center p-relative">
                                    <img :src="image" class="attachment-img-style">
                                    <span class="text-white-hover color-blue c-pointer vertical-center image-delete"
                                          @click="deleteFile()">
                                    {{ $str('delete') }}
                                    <i class="material-icons">close</i>
                                </span>
                                </div>
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
                           v-model="paymentMethods.password"
                           :class="{'warning-border' : warning_trade_password}"
                           @keyup="onCheckTradePassword" />
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              :class="{'warning-text' : warning_trade_password}">{{ verify_warning_trade_password }}</span>
                    </div>
                </div>
            </div>

            <!-- footer, 버튼 영역 -->
            <div class="dialog--footer">
                <button class="btn-rounded-white text-white-hover btn-delete" @click="onDelete" v-if="edit"><h6 class="color-red">{{ $str("delete") }}</h6></button>
                <button class="btn-rounded-white text-white-hover" @click="onClose"><h6>{{ $str("cancel") }}</h6></button>
                <button class="btn-rounded-blue btn-blue-hover" @click="onDone"><h6>{{ $str("Done") }}</h6></button>
            </div>
        </div>
    </v-dialog>
</template>

<script>
    import MainRepository from "../../vuex/MainRepository";
    import CommonService from "../../service/common/CommonService";
    import PaymentMethod from "../../vuex/model/PaymentMethod";
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

                warning_name: false,
                warning_alipay: false,
                warning_wechat: false,
                warning_bank: false,
                warning_bank_accout: false,
                warning_attachment_file: false,
                warning_trade_password: false,
                verify_warning_name: '',
                verify_warning_alipay: '',
                verify_warning_wechat: '',
                verify_warning_bank: '',
                verify_warning_attachment_file: '',
                verify_warning_trade_password: '',
                verify_warning_bank_account: '',
                file: '',
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
            }
        },
        created() {
        },
        methods: {
            onCheckName() {

            },
            onCheckAlipay() {

            },
            onCheckWechat() {

            },
            onCheckBank() {

            },
            onClearData() {

            },
            onCheckBankAccount() {

            },
            onCheckAttachmentFile() {
                //첨부파일 타입, 확장자, 용량 체크
                let fileInfo = this.$refs.file.files[0];
                let fileSize = fileInfo.size;
                if (fileSize > 5e+6) {
                    this.warning_attachment_file = true;
                    this.verify_warning_attachment_file = this.$str('warningAttachmentFileSize');
                    return false;
                }
                this.warning_attachment_file = false;
                this.handleFileUpload(fileInfo);
            },
            handleFileUpload(fileInfo) {
                //첨부파일 사진 등록 및 출력
                this.file = fileInfo;
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(this.file);
            },
            onCheckTradePassword() {

            },
            onClose(item) {
                this.$emit('close', item);
            },
            onDone(item) {
                let self = this;
                this.paymentMethods.type = this.type;
                this.paymentMethods.memberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.modifyMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.registerMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;

                MainRepository.MyPage.setPaymentMethod(this.myInfo.email, this.paymentMethods, function (data) {
                    // 이벤트버스 날리기~~'ㅅ'
                });

                this.$emit('paymentMethod');
                this.onClearData();

                CommonService.fileUpload.fileUpload({
                    file: this.file,
                    purpose: this.paymentMethods
                }, function () {
                    console.log('File upload success.');
                })

                this.$eventBus.$emit('showAlert', 0);
                this.onClose();
                this.$emit('done', item);
            },

            onDelete() {
                this.paymentMethods.type = this.type;
                this.paymentMethods.memberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.modifyMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                this.paymentMethods.registerMemberNo = MainRepository.MyInfo.getUserInfo().memberNo;

                MainRepository.MyPage.deletePaymentMethod(this.myInfo.email, this.paymentMethods, function (data) {
                    // 이벤트버스 날리기~~'ㅅ'
                });

                this.$eventBus.$emit('showAlert', 0);
                this.onClose();
                this.$emit('delete', item);
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
</style>