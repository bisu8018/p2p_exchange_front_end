<template>
    <div class="payment-item_wrapper">

        <!-- 아이콘, 서브타이틀 -->
        <div class="payment-subtitle">
            <div v-if="data.type === 'alipay'" class="sprite-img ic-alipay"></div>
            <div v-else-if="data.type === 'wechat'" class="sprite-img ic-wechatpay"></div>
            <div v-else-if="data.type === 'bankaccount'" class="sprite-img ic-bank"></div>

            <p v-if="data.type === 'alipay'">{{ $str('alipayText') }}</p>
            <p v-else-if="data.type === 'wechat'">{{ $str('wechatPayText') }}</p>
            <p v-else-if="data.type === 'bankaccount'">{{ $str('bankAccountText') }}</p>
        </div>

        <!-- 내용 -->
        <div class="payment-caption">
            <span v-if="data.type === 'alipay'"> {{ data.alipayId }}  {{ data.ownerName }} </span>
            <span v-else-if="data.type === 'wechat'"> {{ data.wechatId }} {{ data.ownerName }} </span>
            <span v-else-if="data.type === 'bankaccount'"> {{ data.bankName }} {{ data.bankAccount }} {{ data.bankBranchInfo }} {{ data.ownerName }} </span>
        </div>

        <!-- 버튼, 토글 등 -->
        <div class="payment-toggle">
            <btn-mypage
                :txt="$str('modify')"
                @click="onEdit"
            />
            <toggle :toggle="activeYn"
                    class="ml-3 c-pointer"
                    @click="onToggle"
            />
        </div>
    </div>
</template>

<script>
    import Toggle from '@/components/Toggle.vue';
    import BtnMypage from "./BtnMypage";
    import MainRepository from "../../../../../vuex/MainRepository";
    import PaymentMethod from "../../../../../vuex/model/PaymentMethod";

    export default {
        name: "payment-item",
        components: {
            BtnMypage,
            Toggle
        },
        props: {
            data: {}
        },
        computed: {
            activeYn: {
                get() {
                    if (this.data.activeYn === 'y') {
                        return true;
                    } else {
                        return false;
                    }
                },
                set(value) {
                    return value;
                }
            }
        },
        data() {
            return{
                paymentImg: '',
                paymentTxt: '',
                id: '',
            }
        },
        methods: {
            onEdit(item) {
                this.$emit('edit', item);
            },
            onToggle(item) {
                //this.$emit('toggle', item);

                let self = this;
                let _paymentMethods = new PaymentMethod(self.data);

                if (_paymentMethods.activeYn === 'y') {
                    _paymentMethods.activeYn = 'n';
                } else {
                    _paymentMethods.activeYn = 'y';
                }

                if (_paymentMethods.type === 'bankaccount') {
                    _paymentMethods.type = 'bank';
                }

                MainRepository.MyPage.setPaymentMethod(MainRepository.MyInfo.getUserInfo().email, _paymentMethods, function (data) {
                });
            },
        },
        created() {

        }
    }
</script>

<style scoped>
    .payment-item_wrapper {
        border-bottom: 1px solid #d1d1d1;
        padding: 24px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        position: relative;
    }

    .payment-item_wrapper > div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .payment-subtitle {
       width: 30%;
    }

    .payment-subtitle p {
        color: #9294A6;
        margin-left: 16px;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
    }

    .payment-caption {
        width: 60%;
        color: #353535;
    }

    .payment-item_wrapper .payment-toggle {
        width: 25%;
        text-align: right;
        display: inline-block;
    }



    @media (max-width: 768px) {
        .payment-item_wrapper {
            display: block;
        }

        .payment-item_wrapper .payment-subtitle {
            margin-bottom: 12px;
            width: 100%;
        }

        .payment-item_wrapper .payment-caption {
            padding-left: 36px;
            width: 100%;
        }

        .payment-item_wrapper .payment-toggle {
            width: 100%;
        }


    }
</style>