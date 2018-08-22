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
            <div v-if="paymentMethod !== ''">

                <!-- 이름 -->
                <h5 class="mb-2">{{ $str("name") }}</h5>
                <div class="p-relative mb-4">
                    <input type="text" class="input" :placeholder="$str('namePlaceholder')" v-model="realName"
                           v-bind:class="{'warning-border' : warning_name}" @keyup="onCheckName">
                    <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_name}">{{verify_warning_name}}</span>
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
                <div v-else-if="paymentMethod === 'wechat'"></div>

                <!-- PaymentMethod ===  -->
                <div v-else-if="paymentMethod === 'bank'"></div>

                <!-- QR Code -->
                <h5 class="mb-2">{{ $str("qrCode") }}</h5>

                <!-- Trade Password -->
                <h5 class="mb-2">{{ $str("tradePwText") }}</h5>

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
    export default {
        name: "dialog-add-new-payment",
        props: {
            showDialog: {
                type: Boolean,
                default: () => false
            }
        },
        methods: {
            onCheckName() {

            },
            onCheckAlipay() {

            },
            onClearData() {

            },
            onClose(item) {
                this.$emit('close', item);
            },
            onDone() {
                this.onClose();
            }
        },
        data() {
            return {
                paymentMethod: '',
                realName: '',
                alipay: '',
                warning_name: false,
                warning_alipay: false,
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
</style>