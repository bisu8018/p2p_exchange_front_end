<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-add-new-payment_wrapper">

            <!-- 헤더, 타이틀 -->
            <h3>{{ $str('paymentMethod') }}</h3>
            <div class="dialog_btn-close">
                <i class="material-icons " @click="onClose">close</i>
            </div>

            <!-- 결제 수단 Select -->
            <div class="p-relative my-4">
                <select class="comp-selectbox h6" v-model="paymentMethod" @change="onClearData">
                    <option value="" disabled selected
                            hidden>{{ $str('paymentMethodSelectboxPlaceholder') }}
                    </option>
                    <option value="bank">{{ $str("bankAccountText") }}</option>
                    <option value="alipay">{{ $str("alipayText") }}</option>
                    <option value="wechat">{{ $str("wechatPayText") }}</option>
                </select>
                <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
            </div>

            <!-- PaymentMethod에 따라 바뀌는 영역 -->
            <div class="mb-4" v-if="paymentMethod !== ''">

                <!-- 이름 -->
                <h5 class="mb-2">{{ $str("name") }}</h5>
                <div class="p-relative mb-4">
                    <input type="text" class="input" :placeholder="$str('namePlaceholder')" v-model="realName"
                           v-bind:class="{'warning-border' : warning_name}" @keyup="onCheckName">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_name}">{{ verify_warning_name }}</span>
                    </div>
                </div>

                <!-- PaymentMethod === alipay -->
                <div v-if="paymentMethod === 'alipay'">
                    <h5 class="mb-2">{{ $str("alipayText") }}</h5>
                    <div class="p-relative mb-4">
                        <input type="text" class="input" :placeholder="$str('alipayPlaceholder')" v-model="alipay"
                               v-bind:class="{'warning-border' : warning_alipay}" @keyup="onCheckAlipay">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_alipay}">{{ verify_warning_alipay }}</span>
                        </div>
                    </div>
                </div>

                <!-- PaymentMethod === wechat -->
                <div v-else-if="paymentMethod === 'wechat'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{ $str("wechatPayText") }}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('wechatPlaceholder')" v-model="wechat"
                               v-bind:class="{'warning-border' : warning_wechat}" @keyup="onCheckWechat">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_wechat}">{{ verify_warning_wechat }}</span>
                        </div>
                    </div>
                </div>

                <!-- PaymentMethod === bank -->
                <div v-else-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("bankName")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('bankNamePlaceholder')" v-model="bank"
                               v-bind:class="{'warning-border' : warning_bank}" @keyup="onCheckBank">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_bank}">{{ verify_warning_bank }}</span>
                        </div>
                    </div>
                </div>

                <!-- QR Code -->
                <h5 class="mb-2">{{ $str("qrCode") }}</h5>
                <div class="mb-4">
                    <label class="">
                        <div class="textarea-style p-relative"
                             v-bind:class="{'warning-border' : warning_attachment_file}">
                            <div v-if="file === ''" class="ma-4a">
                                <input type="file" id="file" ref="file" v-on:change="onCheckAttachmentFile()"
                                       class="d-none"/>
                                <div class="d-inline-block mt-2">
                                    <div class="sprite-img ic-upload"></div>
                                </div>
                                <div class="color-darkgray h6">
                                    {{paymentMethod === 'wechat' ? $str('wechatQrCodeExplain') :
                                    $str('alipayQrCodeExplain') }} (*.jpg / *.png / *.jpeg)
                                </div>
                            </div>
                            <div v-else class="text-xs-center p-relative">
                                <img :src="image" class="attachment-img-style">
                                <span class="text-white-hover color-blue c-pointer vertical-center image-delete"
                                      @click="deleteFile()">
                                    {{$str('delete')}}
                                    <i class="material-icons ">close</i>
                                </span>
                            </div>
                            <div class="warning-text-wrapper warning-textArea-wrapper">
                                <span class="d-none"
                                      v-bind:class="{'warning-text' : warning_attachment_file}">{{verify_warning_attachment_file}}</span>
                            </div>
                        </div>
                    </label>
                </div>

                <!-- Trade Password -->
                <h5 class="mb-2">{{ $str("tradePwText") }}</h5>
                <div class="p-relative mb-4">
                    <input type="password" class="input" :placeholder="$str('tradePwPlaceholder')"
                           v-model="password"
                           v-bind:class="{'warning-border' : warning_trade_password}" @keyup="onCheckTradePassword">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_trade_password}">{{ verify_warning_trade_password }}</span>
                    </div>
                </div>
            </div>

            <!-- footer, 버튼 영역 -->
            <div class="dialog--footer">
                <button class="btn-rounded-white text-white-hover" @click="onClose">
                    <h6>{{ $str("cancel") }}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" @click="onDone">
                    <h6>{{ $str("Done") }}</h6>
                </button>
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
            showDialog: {
                type: Boolean,
                default: () => false
            },
            myInfo: {},
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
            onDone() {
                let _paymentMethod = new PaymentMethod('');
                _paymentMethod.activeYn = this.activeYn;
                _paymentMethod.alipayId = this.alipayId;
                _paymentMethod.alipayQrCodeImgUrl = this.alipayQrCodeImgUrl;


                let self = this;

                // MainRepository.MyPage.setPaymentMethod(self.myInfo.email, self.paymentMethod, function () {
                //     self.$emit('paymentMethod');
                //     this.onClearData();
                // });

                MainRepository.MyPage.setPaymentMethod('alipay', self.myInfo.email, function () {

                });

                self.$emit('paymentMethod');
                this.onClearData();

                // AccountService.Account.changePassword({
                //     email : MainRepository.MyInfo.getUserInfo().email,
                //     password: self.new_password
                // },function (result) {
                //     // 성공후 router push
                //     goMyPage();
                // });

                CommonService.fileUpload.fileUpload({
                    file: self.file,
                    purpose: _paymentMethod
                }, function () {
                    console.log('File upload success.');
                })

                self.$eventBus.$emit('showAlert', 0);
                this.onClose();
            }
        },
        data() {
            return {
                paymentMethod: '',
                paymentMethods: '',
                realName: '',
                alipay: '',
                wechat: '',
                bank: '',
                file: '',
                password: '',
                warning_name: false,
                warning_alipay: false,
                warning_wechat: false,
                warning_bank: false,
                warning_attachment_file: false,
                warning_trade_password: false,
                verify_warning_name: '',
                verify_warning_alipay: '',
                verify_warning_wechat: '',
                verify_warning_bank: '',
                verify_warning_attachment_file: '',
                verify_warning_trade_password: '',
                file: '',
            }
        }
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
</style>