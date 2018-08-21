<template>
    <div class="mypage-wrapper">

        <!-- 좌측 내 정보 -->
        <div class="myInfo-wrapper">
            <!-- 닉네임, 아바타 -->
            <div class="pt-0">
                <big-avatar :me="true" />
                <div class="ml-3">
                    <p class="color-blue mb-1">{{ myInfo.nickname }}</p>
                    <p class="color-darkgray">UID: {{ myInfo.memberNo }}</p>
                </div>
            </div>

            <!-- 트레이드 횟수, 평균 시간 -->
            <div class="d-block">
                <p class="mb-1">
                    <span class="color-darkgray mr-2">{{$str('trades')}}:</span>
                    <span class="color-black color-red"> 수정필요 {{$str('times')}}</span>
                </p>
                <p>
                    <span class="color-darkgray mr-2">{{$str('avgRelease')}}:</span>
                    <span class="color-black color-red"> 수정필요 {{$str('minuteText')}}</span>
                </p>
            </div>

            <!-- Create Account Time -->
            <div class="color-darkgray d-block">
                <p class="d-block">{{$str('accountCreatedTime')}} {{toTimeFormat(myInfo.createDatetime)}}, </p>
                <p class="color-red">수정필요</p>
            </div>
        </div>

        <!-- 우측 세부 정보 -->
        <div class="otherInfo-wrapper">

            <!-- ############## 1. Account & Security ############## -->
            <div class="section-border">

                <!-- Header -->
                <div class="account-header">
                    <h4>{{$str('accountSecurity')}}</h4>
                    <div class="header-detail">
                        <p class="h6 mb-3">
                            {{$str('securityLevel')}} :
                            <span class="color-red" v-if="getSecurityLevel === 1">{{$str('low')}}</span>
                            <span class="color-orange" v-else-if="getSecurityLevel === 2">{{$str('medium')}}</span>
                            <span class="color-green" v-else>{{$str('high')}}</span>
                        </p>
                        <p class="caption">*{{$str('securityExplain')}}</p>
                    </div>
                </div>

                <!-- Body -->
                <!-- 1. Email -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-email"></div> <p>{{$str('email')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">
                        <span class="color-black" v-if="!emailVerification.isNull()">{{$str('bound')}}</span>
                        <span class="color-darkgray" v-else>{{$str('unbound')}}</span>
                        <span class="caption pl-4"> *{{$str('emailSecurityExplain')}}</span>
                    </li>

                    <!-- 버튼, 토글 등 -->
                    <li class="btn-wrapper">
                        <span v-if="!emailVerification.isNull()">
                            <a>{{$str('bound')}}</a>
                        </span>
                        <span v-else>
                            <a v-if="emailVerification.status === 'turn_on' && phoneVerification.status === 'turn_on'"
                               @click="goTurnOff">
                                {{$str('turnOff')}}
                            </a>
                            <a v-else-if="emailVerification != 'turn_on'"
                               @click="onModal('emailTurnOn')">
                                {{$str('turnOn')}}
                            </a>
                        </span>
                    </li>
                </ul>

                <!-- 2. Phone -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-phone"></div> <p>{{$str('phone')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">
                        <span class="color-black" v-if="!phoneVerification.isNull()">{{$str('bound')}}</span>
                        <span class="color-darkgray" v-else>{{$str('unbound')}}</span>
                        <span class="caption pl-4"> *{{$str('phoneSecurityExplain')}}</span>
                    </li>

                    <!-- 버튼, 토글 등 -->
                    <li class="btn-wrapper">
                        <span v-if="!phoneVerification.isNull()">
                            <a>{{$str('bound')}}</a>
                        </span>
                        <span v-else>
                            <a v-if="phoneVerification.isNull()"
                               @click="goLink('phone')">
                                {{$str('bind')}}
                            </a>
                             <a v-else-if="!phoneVerification.isNull()">
                                {{$str('changePhone')}}
                            </a>
                            <a v-if="emailVerification.status === 'turn_on' && phoneVerification.status === 'turn_on'">
                                {{$str('turnOff')}}
                            </a>
                            <a v-else-if="!phoneVerification.isNull() && phoneVerification.status !== 'turn_on'"
                             @click="onModal('phoneTurnOn')">
                                {{$str('turnOn')}}
                            </a>
                        </span>
                    </li>
                </ul>

                <!-- 3. Account -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-account"></div> <p>{{$str('account')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">
                        <span class="color-black">{{myInfo.email}}</span>
                    </li>
                    <li></li>
                </ul>

                <!-- 4. UID -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-uid"></div> <p>UID</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">
                        <span class="color-black">{{ myInfo.memberNo }}</span>
                    </li>
                    <li></li>
                </ul>

                <!-- 5. Password -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-password"></div> <p>{{$str('password')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">
                        <span class="color-black"> ****** </span>
                    </li>

                    <!-- 버튼, 토글 등 -->
                    <li class="btn-wrapper">
                        <span @click="goChangePassword">
                            <a>{{$str('modify')}}</a>
                        </span>
                    </li>
                </ul>

                <!-- 6. Trade Password -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-password"></div> <p>{{$str('tradePwText')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">
                        <span class="color-black">******</span>
                    </li>

                    <!-- 버튼, 토글 등 -->
                    <li class="btn-wrapper">
                        <span @click="goReset">
                            <a>{{$str('reset')}}</a>
                        </span>
                    </li>
                </ul>
            </div>

            <!--  ############## 2. ID Verification ##############  -->
            <div class="section-border">

                <!-- Header -->
                <div class="otherInfo-header">
                    <h4>{{$str('idVerification')}}</h4>
                    <div class="header-detail">
                        <p class="caption mt-3">{{$str('idVerificationExplain')}}</p>
                    </div>
                </div>

                <!-- Body -->
                <!-- 1. ID Verification -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-id"></div> <p>{{$str('idVerification')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">

                        <!-- ID Verification 되었을 때 -->
                        <span class="color-darkgray" v-if="!idVerification.isNull()">
                            {{idVerification.firstName}} {{idVerification.lastName}}, {{getSecuredIdNo}}
                        </span>

                        <!-- ID Verification 안 되었을 때 -->
                        <span class="color-darkgray" v-else>
                            {{$str('unverified')}}
                        </span>
                    </li>

                    <!-- 버튼, 토글 등 -->
                    <li class="btn-wrapper">
                        <span v-if="!idVerification.isNull() && idVerification.identification_no !== undefined">
                            {{$str('verifySliderSuccess')}}
                        </span>
                        <span v-else>
                            <a>{{$str('verify')}}</a>
                        </span>
                    </li>
                </ul>

                <!-- 2. Advanced Verification -->
                <ul class="otherInfo-body">
                    <!-- 아이콘, 서브타이틀 -->
                    <li class="otherInfo-subtitle">
                        <div class="sprite-img ic-advanced"></div> <p>{{$str('advancedVerification')}}</p>
                    </li>

                    <!-- 내용 -->
                    <li class="caption-wrapper">

                        <!-- Advanced Verification 되었을 때 -->
                        <span class="color-darkgray"> {{$str('unverified')}} </span>
                    </li>

                    <!-- 버튼, 토글 등 -->
                    <li class="btn-wrapper">
                        <span v-if="!idVerification.isNull() && idVerification.identification_no !== undefined">
                            {{$str('verifySliderSuccess')}}
                        </span>
                        <span v-else>
                            <a>{{$str('verify')}}</a>
                        </span>
                    </li>
                </ul>
            </div>

            <!-- ############### 3. Payment Methods ############### -->
            <div class="section-border">

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
            <div class="section-border">

                <!-- Header -->
                <div class="otherInfo-header">
                    <h4>{{$str('blockList')}}</h4>
                    <div class="header-detail">
                        <p class="caption mt-3">{{$str('blockListExplain')}}</p>
                    </div>
                </div>

                <!-- Body : isEmpty -->
                <div class="ta-center py-3" v-if="blockList === ''">
                    <p class="pt-2 pb-3 color-darkgray">{{$str('noMoreRecords')}}</p>
                </div>

                <!-- Body : !isEmpty -->
                <div v-else>
                    <div class="blocked-user-item" v-for="block in blockList">
                        <div>
                            <avatar :email="block.email"></avatar>
                            <p class="color-blue text-white-hover c-pointer">{{block.nickName}}</p>
                        </div>
                        <div>
                            <a>{{$str('unblock')}}</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- #################  5. History ################# -->
            <div class="section-border pb-4">

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
                <div v-if=" selection_login  && tempLogin != ''">

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
    import {abUtils} from "../../../../common/utils";
    import BigAvatar from '@/components/BigAvatar.vue';
    import Avatar from '@/components/Avatar.vue';
    import Pagination from '@/components/Pagination.vue';
    import Toggle from '@/components/Toggle.vue';
    import MyPageModal from './myPageItem/MyPageModal.vue';
    import PaymentMethod from "../../../../vuex/model/PaymentMethod";
    import IdVerification from "../../../../vuex/model/IdVerification";
    import LoginHistory from "../../../../vuex/model/LoginHistory";
    import Block from "../../../../vuex/model/Block";
    import SecuritySettings from "../../../../vuex/model/SecuritySettings";
    import EmailVerification from "../../../../vuex/model/EmailVerification";
    import PhoneVerification from "../../../../vuex/model/PhoneVerification";
    import MyPaymentItem from "./item/ex/MyPaymentItem"
    import PaymentItem from "./item/PaymentItem";

    export default {
        name: "MyPage",
        components: {
            PaymentItem,
            BigAvatar, Avatar, Pagination, Toggle, MyPageModal, MyPaymentItem},
        data: () => ({
            selection_login: true,
            selection_security: false,
            showModal: false,
            modalType: '',


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
            myInfo: '',
            emailVerification: new EmailVerification(''),
            phoneVerification: new PhoneVerification(''),

        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            getSecuredIdNo() {
                let noLength = this.idVerification.identification_no.length;
                let securedIdNo = this.idVerification.identification_no.substr(0, 2) + '*********' + this.idVerification.identification_no.substr(noLength - 2, 2);
                return securedIdNo;
            },

            // ************** NEW COMPUTED ************** //
            getSecurityLevel() {
                let level = 1;
                if (!this.phoneVerification.isNull()) {
                    ++level;
                }
                if (this.myInfo.nickname != '') {
                    ++level;
                }
                return level;
            },
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
            onModal(type) {
                this.showModal = true;
                this.modalType = type;
            },
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
            goChangePassword() {
                this.$router.push("/changePassword");
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
            goLink(type) {
                var url = "/linkAccount";
                if (type === 'email') {
                    url += '?email';
                } else {
                    url += '?phone';
                }
                this.$router.push(url);
            },
            goReset() {
                this.$router.push('/resetTradePassword');
            },

            // *********** NEW METHODS ************* //
            // 시간 포멧으로 바꿔줌
            toTimeFormat(time) {
                return abUtils.toTimeFormat(time);
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

    .sprite-img {
        display: inline-block;
        vertical-align: middle;
    }

    .mypage-wrapper p {
        font-size: 14px;
    }

    .mypage-wrapper h4 {
        font-weight: bold;
        color: #353535;
        height: 24px;
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

    .mypage-wrapper .caption {
        font-size: 10px;
        color: #9294a6;
    }

    .mypage-wrapper .color-black,
    .mypage-wrapper .color-darkgray {
        white-space: nowrap;
    }

    /* 우측 나의 정보 */
    .myInfo-wrapper {
        width: 282px;
        position: relative;
    }

    .myInfo-wrapper > div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: solid 1px #d1d1d1;
        padding: 24px 0;
    }

    .myInfo-wrapper > div:last-child {
        border-bottom: none;
    }

    /* 좌측 기타 정보 */
    .otherInfo-wrapper {
        width: calc(100% - 282px);
        padding-left: 24px;
        height: auto;
        position: relative;
    }

    .otherInfo-wrapper .section-border {
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        padding: 0 24px;
        margin-bottom: 48px;
    }

    .otherInfo-wrapper ul,
    .account-header,
    .blocked-user-item {
        border-bottom: 1px solid #d1d1d1;
        padding: 24px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .otherInfo-header {
        border-bottom: 1px solid #d1d1d1;
        padding: 24px 0;
        display: block;
        position: relative;
    }

    .otherInfo-wrapper ul:last-child,
    .blocked-user-item:last-child {
       border-bottom: none;
    }

    .blocked-user-item p {
        display: inline-block;
        font-size: 14px;
        color: #214ea1;
        margin-left: 16px;
    }

    .account-header .header-detail {
        text-align: right;
    }

    ul > li {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    ul > li:first-child {
        width: 30%;
    }

    ul .caption-wrapper {
        width: 60%;
    }

    ul > li:last-child {
        width: 25%;
        text-align: right;
        display: inline-block;
    }

    .otherInfo-subtitle p {
        color: #9294A6;
        margin-left: 16px;
        display: inline-block;
        vertical-align: middle;
    }

    /* 모바일 레이아웃 */
    @media (max-width: 940px) {
        .mypage-wrapper {
            display: block;
            padding: 0 3px;
        }
        .myInfo-wrapper,
        .otherInfo-wrapper {
            width: 100%;
            padding: 48px 0 0;
        }

        .myInfo-wrapper > div {
            display: block;
        }

        .myInfo-wrapper > div:first-child {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }

        .section-border > div {
            display: block;
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
        .otherInfo-wrapper ul {
            display: block;
        }

        ul > li {
            display: block;
            width: 100%;
        }

        ul > li:first-child {
            width: 100%;
            margin-bottom: 12px;
        }

        ul > li:last-child {
            width: 100%;
            margin-top: 12px;
        }

        ul .caption-wrapper {
            width: 100%;
            padding-left: 40px;
        }

        ul > li:last-child span {
            display: block;
        }

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

    .history-header {
        border-bottom: none;
    }

    .history-tab_wrapper {
        padding-top: 18px;
    }

    .history-tab_wrapper h5 {
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;
    }

    .history-login {
        display: flex;
        color: #9294a6;
        border-bottom: 1px solid #d1d1d1;
        padding-bottom: 8px;
    }

    .history-login-detail{
        color: #353535;
        padding: 26px 0;
        border-bottom: 1px solid #d1d1d1;
    }

    .history-login > div:nth-of-type(1) {
        width: 30%;
    }

    .history-login > div:nth-of-type(2) {
        width: 25%;
    }

    .history-login > div:nth-of-type(3) {
        width: 25%;
    }

    .history-login > div:nth-of-type(4) {
        width: 20%;
        text-align: right;
    }

    .label-mobile-history {
        display: none;
    }

    @media (max-width: 768px) {
        .mobile-hide {
            overflow: hidden;
            display: block;
            height: 1px;
            background-color: #d1d1d1;
            padding: 0;
        }

        .label-mobile-history {
            color: #9294a6;
            display: inline-block;
            min-width: 80px;
        }

        .history-login-detail{
           display: block;
        }

        .history-login > div:nth-of-type(1),
        .history-login > div:nth-of-type(2),
        .history-login > div:nth-of-type(3),
        .history-login > div:nth-of-type(4) {
            width: 100%;
            text-align: left;
            padding: 8px 0;
        }
    }


</style>