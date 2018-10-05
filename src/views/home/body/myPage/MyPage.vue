<template>
    <div class="mypage-wrapper" :class="[!isMobile() ? 'mr-3 ml-3' : '']">

        <!-- 좌측 내 정보 -->
        <div class="myInfo-wrapper">
            <my-info
                :my-info="myInfo"
                :my-order-stat="myOrderStat"
            />
        </div>

        <!-- 우측 세부 정보 -->
        <div class="otherInfo-wrapper">

            <!-- 1. Account & Security -->
            <my-account-security
                :email="emailVerification"
                :phone="phoneVerification"
                :my-info="myInfo"
            />

            <!-- 2. ID Verification -->
            <my-id-verification
                :id-verification="idVerification"
            />

            <!-- 3. Payment Methods -->
            <my-payment
                :payment-method="paymentMethod"
                :email-verification="emailVerification"
                :phone-verification="phoneVerification"
                :my-info="myInfo"
            />

            <!-- 4. Block List -->
            <my-block-list
               :block-list="blockList"
               @onBlockPage="onBlockPage"
            />

            <!-- 5. History -->
            <my-history
                :login-history="loginHistory"
                :security-settings="securitySettings"
                @onLoginPage="onLoginPage"
                @onHistoryPage="onHistoryPage"
            />

            <nick-name-modal
                :show="showNicknameModal"
                :option="'mypage'"

            />
        </div>
    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import Pagination from '@/components/Pagination.vue';
    import Toggle from '@/components/Toggle.vue';
    import IdVerification from "../../../../vuex/model/IdVerification";
    import EmailVerification from "../../../../vuex/model/EmailVerification";
    import PhoneVerification from "../../../../vuex/model/PhoneVerification";
    import PaymentItem from "./item/PaymentItem";
    import BtnMypage from "./item/BtnMypage";
    import BlockListItem from "./item/BlockListItem";
    import DialogIdVerification from "../../../../components/dialog/DialogIdVerification";
    import MyIdVerification from "./section/MyIdVerification";
    import MyAccountSecurity from "./section/MyAccountSecurity";
    import MyInfo from "./section/MyInfo";
    import MyPayment from "./section/MyPayment";
    import MyBlockList from "./section/MyBlockList";
    import MyHistory from "./section/MyHistory";
    import NickNameModal from "../../../../components/NickNameModal";

    export default {
        name: "MyPage",
        components: {
            NickNameModal,
            MyHistory,
            MyBlockList,
            MyPayment,
            MyInfo,
            MyAccountSecurity,
            MyIdVerification,
            DialogIdVerification,
            BlockListItem,
            BtnMypage,
            PaymentItem,
            Pagination, Toggle,
        },
        data: () => ({
            showModal: false,
            modalType: '',
            myOrderStat: '',
            idVerification: new IdVerification(''),
            emailVerification: new EmailVerification(''),
            phoneVerification: new PhoneVerification(''),
            blockList: '',
            loginHistory: '',
            securitySettings: '',
            showNicknameModal: false,
        }),
        computed: {
            myInfo() {
                return MainRepository.MyInfo.getUserInfo();
            },
            paymentMethod () {
                return MainRepository.MyInfo.getMyPaymentMethods();
            },
        },
        created() {
            this.init();
            this.$eventBus.$on('refreshMypage', () => {
                this.init();
            })
        },
        beforeDestroy() {
            this.$eventBus.$off('refreshMypage');
        },
        mounted() {
            // 처음 가입하고, 닉네임이 없을 때: <닉네임 설정 modal>이 떠야 한다ㅇㅁㅇ
            if (this.myInfo.nickname === '' || this.myInfo.nickname === null) {
                this.showNicknameModal = true;
            }
        },
        methods: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            init() {
                let self = this;

                // *********** NEW CREATED ************* //
                // 로그인 확인 -> Login 으로
                if (!MainRepository.MyInfo.isLogin()) {
                    MainRepository.router().goLogin();
                    return;
                }

                MainRepository.MyInfo.loadMyInfo(() => {});

                // GET My Order Stat
                MainRepository.MyOrder.getMyOrderStat(self.myInfo.email, function(data) {
                    self.myOrderStat = data;
                });

                // GET User Verification Info
                MainRepository.MyPage.getMemberVerification(function (email, phone) {
                    self.emailVerification = email;
                    self.phoneVerification = phone;
                });

                // GET User Id Verification
                MainRepository.MyPage.getIdVerification(function (idVerification) {
                    self.idVerification = idVerification;
                });

                // 유저 결제수단 정보 GET
                MainRepository.MyInfo.loadMyPaymentMethods(() => {});

                // GET Block List
                MainRepository.MyPage.getBlockList(1,function (blockList) {
                    self.blockList = blockList;
                });

                // GET Login History
                MainRepository.MyPage.getLoginHistory(1, function (loginHistory) {
                    self.loginHistory = loginHistory;
                });

                // GET Security Settings
                MainRepository.MyPage.getSecuritySettings(1, function (securitySettings) {
                    self.securitySettings = securitySettings;
                });
            },
            onLoginPage(num) {
                let self = this;
                MainRepository.MyPage.getLoginHistory(num, function (loginHistory) {
                    self.loginHistory = loginHistory;
                });
            },
            onBlockPage(num) {
                let self = this;
                MainRepository.MyPage.getBlockList(num, function (blockList) {
                    self.blockList = blockList;
                });
            },
            onHistoryPage(num) {
                let self = this;
                MainRepository.MyPage.getSecuritySettings(num, function (securitySettings) {
                    self.securitySettings = securitySettings;
                });
            },
        }
    }
</script>

<style scoped>

    /* My Page CSS */
    .mypage-wrapper {
        text-align: left;
        padding-top: 48px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
    }

    .mypage-wrapper a {
        font-size: 12px;
        letter-spacing: 0;
        text-align: center;
        color: #214ea1;
        line-height: 1;
        padding: 10px 14px;
        display: inline-block;
        vertical-align: middle;
        -webkit-transition: all 0.1s ease-out;
        -o-transition: all 0.1s ease-out;
        transition: all 0.1s ease-out;
        border-radius: 4px;
    }

    .mypage-wrapper a:hover {
        background-color: #214ea1 !important;
        color: #fff !important;
    }

    /* 우측 나의 정보 레이아웃 */
    .myInfo-wrapper {
        width: 282px;
        position: relative;
    }

    /* 좌측 기타 정보 레이아웃 */
    .otherInfo-wrapper {
        width: calc(100% - 282px);
        padding-left: 24px;
        height: auto;
        position: relative;
    }

    /* 모바일 레이아웃 */
    @media (max-width: 940px) {
        .mypage-wrapper {
            display: block;
            padding: 0 3px;
        }

        .myInfo-wrapper {
            width: 100%;
            padding: 48px 0 0;
        }

        .otherInfo-wrapper {
            width: 100%;
            padding: 48px 0 0;
        }

        .otherInfo-header {
            justify-content: flex-start;
        }

        .account-header .header-detail,
        .otherInfo-header .header-detail {
            text-align: left;
        }

    }
</style>