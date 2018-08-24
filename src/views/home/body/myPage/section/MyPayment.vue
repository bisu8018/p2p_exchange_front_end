<template>
    <div class="myPage-box">

        <!--결제수단 추가 모달-->
        <dialog-add-new-payment
                :showDialog="showModal"
                :my-info="myInfo"
                :data="paymentMethodItem"
                :edit="isEdit"
                @close="onClose"
                @done="onAddPayment"
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
                        @edit="onEdit(item)"
                />
            </span>
            <div class="ta-center py-3">
                <btn-mypage
                        @click="onModal"
                        :txt="$str('addPayment')"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import PaymentItem from "../item/PaymentItem";
    import BtnMypage from "../item/BtnMypage";
    import MyPageModal from "../item/MyPageModal";
    import MainRepository from "../../../../../vuex/MainRepository";
    import DialogAddNewPayment from "../../../../../components/dialog/DialogAddNewPayment";

    export default {
        components: {
            DialogAddNewPayment,
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
                isEdit: false,
                paymentMethodItem: {},
            }
        },
        methods: {
            onModal() {
                this.showModal = true;
                this.isEdit = false;
            },
            onClose() {
                this.showModal = false;
            },
            onAddPayment() {
                // this.$router.push('/myPage')
            },
            onEdit(item) {
                this.showModal = true;
                this.isEdit = true;
                this.paymentMethodItem = item;
            },
            // onToggle(item) {
            //     let self = this;
            //     console.log(item);
            //
            //     item.activeYn = !item.activeYn;
            //     MainRepository.MyPage.setPaymentMethod(self.MyInfo.email, item, function (data) {
            //         // 리프레시 이벤트버스 날리기~~'ㅅ'
            //     });
            // },


            // ****** 이 아래로는 무슨 Methods인지 모르겠음...ㅜㅜ
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
    .a-txt {
        font-size: 12px;
        letter-spacing: 0;
        text-align: center;
        color: #214ea1 !important;
        background-color: #fff !important;
        line-height: 1;
        padding: 10px 14px;
        display: inline-block;
        vertical-align: middle;
        -webkit-transition: all 0.1s ease-out;
        -o-transition: all 0.1s ease-out;
        transition: all 0.1s ease-out;
        border-radius: 4px;
        margin: 0 0 0 8px;
    }

    .a-txt:hover {
        opacity: 1;
    }
</style>