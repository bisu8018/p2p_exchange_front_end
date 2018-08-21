<template>
    <div class="mypage-wrapper">

        <!-- 좌측 내 정보 -->
        <div class="myInfo-wrapper">
            <my-info
                    :my-info="myInfo"
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

            <!--  2. ID Verification -->
            <my-id-verification
                :id-verification="idVerification"
            />

            <!-- ############### 3. Payment Methods ############### -->
            <div class="myPage-box">

                <!-- Header -->
                <div class="otherInfo-header">
                    <h4>{{$str('paymentMethod')}}</h4>
                    <div class="header-detail">
                        <p class="caption mt-3">{{$str('paymentMethodExplain')}}</p>
                    </div>
                </div>

                <!-- Body : isEmpty -->
                <div class="ta-center py-3" v-if="paymentMethod === ''">
                    <p class="pt-2 pb-3 color-darkgray">{{$str('nullPaymentMethod')}}</p>
                    <a class="a-txt pb-2 ml-0" @click="onModal('addPayment')">{{$str('addPayment')}}</a>
                </div>

                <!-- Body : !isEmpty -->
                <div v-else>
                    <span v-for="item in paymentMethod">
                        <payment-item
                                :data="item"
                        />
                    </span>
                    <div class="ta-center py-3">
                        <a class="a-txt pb-2 ml-0" @click="onModal('addPayment')">{{$str('addPayment')}}</a>
                    </div>
                </div>
            </div>

            <!-- ###############  4. Block List ###############  -->
            <div class="myPage-box">

                <!-- Header -->
                <div class="otherInfo-header">
                    <h4>{{$str('blockList')}}</h4>
                    <div class="header-detail">
                        <p class="caption mt-3">{{$str('blockListExplain')}}</p>
                    </div>
                </div>

                <!-- Body : isEmpty -->
                <div class="ta-center py-3" v-if="blockList.length === 0">
                    <p class="pt-2 pb-3 color-darkgray">{{$str('noMoreRecords')}}</p>
                </div>

                <!-- Body : !isEmpty -->
                <div v-else>
                    <div class="blocked-user-item" v-for="block in blockList">
                        <block-list-item
                                :data="block"
                        />

                    </div>
                </div>
            </div>

            <!-- #################  5. History ################# -->
            <div class="myPage-box pb-4">

                <!-- Header -->
                <div class="otherInfo-header history-header">
                    <h4>{{$str('history')}}</h4>
                    <div class="history-tab_wrapper">
                        <h5 class="color-darkgray mr-4" v-bind:class="{'active-history' : selection_login}"
                            @click="onSelection('login')">
                            {{$str('loginText')}}
                        </h5>
                        <v-divider class="d-inline-block" inset vertical />
                        <h5 class="color-darkgray ml-4" v-bind:class="{'active-history' : selection_security}"
                            @click="onSelection('security')">
                            {{$str('securitySettings')}}
                        </h5>
                    </div>
                </div>

                <!-- 로그인 선택 시 -->
                <div v-if=" selection_login  && tempLogin !== ''">

                    <!-- menu -->
                    <div class="history-login mobile-hide">
                        <div>{{$str('date')}}</div>
                        <div>{{$str('Type')}}</div>
                        <div>IP</div>
                        <div>{{$str('status')}}</div>
                    </div>

                    <!-- 내용 -->
                    <div v-for="data in tempLogin">
                        <div class="history-login history-login-detail">
                            <div>
                                <span class="label-mobile-history">{{$str('date')}}: </span> {{data.register_datetime}}
                            </div>
                            <div>
                                <span class="label-mobile-history">{{$str('Type')}}: </span> {{data.type}}
                            </div>
                            <div>
                                <span class="label-mobile-history">IP: </span> {{data.ip}}
                            </div>
                            <div>
                                <span class="label-mobile-history">{{$str('status')}}: </span> {{data.status === 'success' ? $str('successful') : $str('failed')}}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import BigAvatar from '@/components/BigAvatar.vue';
    import Avatar from '@/components/Avatar.vue';
    import Pagination from '@/components/Pagination.vue';
    import Toggle from '@/components/Toggle.vue';
    import MyPageModal from './myPageItem/MyPageModal.vue';
    import IdVerification from "../../../../vuex/model/IdVerification";
    import EmailVerification from "../../../../vuex/model/EmailVerification";
    import PhoneVerification from "../../../../vuex/model/PhoneVerification";
    import MyPaymentItem from "./item/ex/MyPaymentItem"
    import PaymentItem from "./item/PaymentItem";
    import BtnMypage from "./item/BtnMypage";
    import BlockListItem from "./item/BlockListItem";
    import DialogIdVerification from "../../../../components/dialog/DialogIdVerification";
    import MyIdVerification from "./MyIdVerification";
    import MyAccountSecurity from "./MyAccountSecurity";
    import MyInfo from "./MyInfo";

    export default {
        name: "MyPage",
        components: {
            MyInfo,
            MyAccountSecurity,
            MyIdVerification,
            DialogIdVerification,
            BlockListItem,
            BtnMypage,
            PaymentItem,
            BigAvatar, Avatar, Pagination, Toggle, MyPageModal, MyPaymentItem},
        data: () => ({
            selection_login: true,
            selection_security: false,

            idVerification: new IdVerification(''),
            paymentMethods: '',
            blockList: '',
            loginHistory: '',
            securitySettings: '',
            tempLogin: [
                {
                    register_datetime : '00:00:00',
                    type: 'web',
                    ip: '000.000.000.000',
                    status: 'successful'
                },
                {
                    register_datetime : '00:00:00',
                    type: 'web',
                    ip: '000.000.000.000',
                    status: 'successful'
                }
            ],



            // *********** NEW DATA ************* //
            showModal: false,
            modalType: '',

            myInfo: '',
            emailVerification: new EmailVerification(''),
            phoneVerification: new PhoneVerification(''),

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

            // ************** NEW COMPUTED ************** //
            paymentMethod () {
                return MainRepository.MyInfo.getMyPaymentMethods();
            },
        },
        created() {
            let self = this;

            // 유저 ID 인증 정보 GET
            MainRepository.MyPage.getIdVerification(function (idVerification) {
                self.idVerification = idVerification;
            });

            // 유저 결제수단 정보 GET
            MainRepository.MyInfo.loadMyPaymentMethods();

            // 로그인 기록 정보 GET
            MainRepository.MyPage.getLoginHistory(function (loginHistory) {
                self.loginHistory = loginHistory;
            });

            // 보안 설정 정보 GET
            MainRepository.MyPage.getSecuritySettings(function (securitySettings) {
                self.securitySettings = securitySettings;
            });

            // *********** NEW CREATED ************* //
            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }

            // GET My Info
            self.myInfo = MainRepository.MyInfo.getUserInfo();

            // GET User Verification Info
            MainRepository.MyPage.getMemberVerification(function (email, phone) {
                self.emailVerification = email;
                self.phoneVerification = phone;
            });

            // GET User Id Verification
            MainRepository.MyPage.getIdVerification(function (idVerification) {
                self.idVerification = idVerification;
            });

            // GET Block List
            MainRepository.MyPage.getBlockList(function (blockList) {
                self.blockList = blockList;
            });
        },
        mounted() {
            if (this.myInfo.nickname === '') {
                this.modalType = 'nickName';
                this.showModal = true;
            }
        },
        methods: {
            onClose() {
                this.showModal = false;
                this.modalType = '';
            },
            getDate(date) {
                let dateTime = String(date).split(' ');
                return dateTime[0];
            },
            getTime(date) {
                let dateTime = String(date).split(' ');
                return dateTime[1];
            },
            onSelection(type) {
                if (type === 'login') {
                    this.selection_security = false;
                    this.selection_login = true;
                } else {
                    this.selection_login = false;
                    this.selection_security = true;
                }
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
            onTurnOn() {
                // phone 인증 정보 AXIOS GET
                this.showModal = false;
            },
            goTurnOff(type) {
                var url = "/turnOff";
                if (type === 'email') {
                    url += '?email';
                } else {
                    url += '?phone';
                }
                this.$router.push(url);

            },
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
            },

            // *********** NEW METHODS ************* //

            onUnblock() {
                alert('블록 푸는 거 API 보내야함');
            },
        }
    }
</script>

<style scoped>
    /*
        New CSS
    */
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

    /* 우측 나의 정보 */
    .myInfo-wrapper {
        width: 282px;
        position: relative;
    }

    /* 좌측 기타 정보 */
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

    @media (max-width: 768px) {
        .btn-wrapper span {
            display: block;
        }

        .mypage-wrapper a {
            font-size: 12px;
            letter-spacing: 0;
            text-align: center;
            background-color: #214ea1 !important;
            color: #fff !important;
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

        .mypage-wrapper .a-txt {
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

        .mypage-wrapper a:hover {
            opacity: .6;
        }

        .mypage-wrapper .a-txt:hover {
            opacity: 1;
        }
    }



    /*
        New CSS END
    */




    .flex-pl-0 {
        padding-left: 0px;
    }

    .flex-divide-bottom-block {
        border-bottom: solid 1px #d1d1d1;
        height: 82px;
    }

    .flex-divide-top-block {
        border-top: solid 1px #d1d1d1;
        padding-top: 20px;
        margin-top: 20px;
    }

    .flex-divide-bottom {
        border-bottom: solid 1px #d1d1d1;
    }

    .flex-pr-0 {
        padding-right: 0px;
    }

    .section-border {

    }

    .v-divider--vertical {
        height: 26px !important;
    }

    .active-history {
        color: #214ea1;
        text-decoration: underline;
        font-weight: bold;
    }

    .history-wrapper {
        display: inherit;
        width: 100%;
        height: 36px;
    }

    .selection-selected {
        background: #214ea1 !important;
        color: white !important;
    }

    .selection {
        border: 1px solid #214ea1;
        background: white;
        color: #214ea1;
        height: 100%;
        width: 50%;
        font-size: 12px;
        text-align: center;
        padding-top: 8px;
        cursor: pointer;
    }

    .selection-border-login {
        border-radius: 22px 0 0 22px;
    }

    .selection-border-security {
        border-radius: 0 22px 22px 0;
    }



</style>