<template>
    <div class="myPage-box">

        <!--결제수단 추가 모달-->
        <my-page-modal :show="showModal"
                       :type="modalType"
                       :phoneNumber="phoneVerification.phoneNumber"
                       :email="emailVerification.email"
                       v-on:close="onClose"
                       v-on:paymentMethod="getPaymentMethod"
                       v-on:turnon="onTurnOn"
                       v-on:nickName="myInfo.nickname"
        />

        <!-- Header -->
        <div class="otherInfo-header">
            <h4>{{ $str('paymentMethod') }}</h4>
            <div class="header-detail">
                <p class="caption mt-3">{{ $str('paymentMethodExplain') }}</p>
            </div>
        </div>

        <!-- Body : isEmpty -->
        <div class="ta-center py-3" v-if="paymentMethod === ''">
            <p class="pt-2 pb-3 color-darkgray">{{ $str('nullPaymentMethod') }}</p>
            <a class="a-txt pb-2 ml-0" @click="onModal('addPayment')">{{ $str('addPayment') }}</a>
        </div>

        <!-- Body : !isEmpty -->
        <div v-else>
                    <span v-for="item in paymentMethod">
                        <payment-item
                                :data="item"
                        />
                    </span>
            <div class="ta-center py-3">
                <btn-mypage
                        @click="onModal('addPayment')"
                        :txt="$str('addPayment')"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import PaymentItem from "./item/PaymentItem";
    import BtnMypage from "./item/BtnMypage";
    import MyPageModal from "./myPageItem/MyPageModal";

    export default {
        components: {
            MyPageModal,
            BtnMypage,
            PaymentItem
        },
        name: "my-payment",
        props: {
            paymentMethod: {},
            phoneVerification: {},
            emailVerification: {},
            myInfo: {},
        },
        data() {
            return {
                showModal: false,
                modalType: '',
            }
        },
        methods: {
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
            },
            onClose() {
                this.showModal = false;
                this.modalType = '';
            },
            onTurnOn() {
                // phone 인증 정보 AXIOS GET
                this.showModal = false;
            },
            goTurnOff(type) {
                let url = "/turnOff";
                if (type === 'email') {
                    url += '?email';
                } else {
                    url += '?phone';
                }
                this.$router.push(url);

            },
            //결제수단 추가 모달 data get 및 결제수단 표시 설정
            getPaymentMethod(value) {
                //하기 코드 미사용 가능성 존재
                if (value === 'alipay') {
                    this.alipay_use = 'y';
                } else if (value === 'wechat') {
                    this.wechat_use = 'y';
                } else {
                    this.bank_use = 'y';
                }
                this.showModal = false;
            },
        }
    }
</script>

<style scoped>

</style>