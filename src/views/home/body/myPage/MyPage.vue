<template>
    <div>
        <!--=========================모바일 환경=========================-->
        <div v-if="isMobile">
            <v-layout class="mt-5">
                <v-flex xs12 text-md-left text-xs-left>

                    <!--***************      첫번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--사용자 정보-->

                    <big-avatar
                            :me=true
                            class="f-left mr-3">
                    </big-avatar>
                    <h5 class="color-blue">{{nickName}}</h5>
                    <h5 class="color-darkgray">UID: {{member_no}}</h5>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <!--***************      두번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--거래 횟수-->

                    <h5 class="color-darkgray">{{$str('trades')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">99999999999999 {{$str('times')}}</span>
                    </h5>
                    <h5 class="color-darkgray">{{$str('avgRelease')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span
                            class="color-black">99999999999999 {{$str('minuteText')}}</span></h5>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <!--***************      세번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--계정생성시간-->

                    <h5 class="color-darkgray">{{$str('accountCreatedTime')}} {{register_datetime}}</h5>
                    <h5 class="color-darkgray mb-5">99999999999999 , {{$str('noRecord')}}</h5>

                    <!--***************      네번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--계정 및 보안-->

                    <div class="section-border pa-4 mb-5">
                        <v-layout column>
                            <h4 class="bold mb-3">{{$str('accountSecurity')}}</h4>
                            <h5 class="color-darkgray text-md-right mb-3">{{$str('securityLevel')}} :&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="color-red" v-if="getSecurityLevel === 1">{{$str('low')}}</span>
                                <span class="color-orange" v-else-if="getSecurityLevel === 2">{{$str('medium')}}</span>
                                <span class="color-green" v-else>{{$str('high')}}</span></h5>
                        </v-layout>
                        <p class="text-xs-left color-darkgray">*{{$str('securityExplain')}}</p>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-email f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('email')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-black" v-if="!emailVerification.isNull()">
                                    {{$str('bound')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray" v-else>{{$str('unbound')}}</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3  pr-3 text-xs-right">
                                <h6 v-if="!emailVerification.isNull()">
                                    <a class="color-blue text-white-hover c-pointer">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-darkgray text-white-hover c-pointer"
                                       v-if="emailVerification.status === 'turn_on' && phoneVerification.status === 'turn_on'"
                                       @click="goTurnOff">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer"
                                       v-else-if="emailVerification != 'turn_on'"
                                       @click="onModal('emailTurnOn')">{{$str('turnOn')}}</a>
                                </h6>
                            </v-flex>
                            <v-flex xs12><p class="color-darkgray">*{{$str('emailSecurityExplain')}}</p></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs5>
                                <div class="sprite-img ic-phone f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('phone')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-black" v-if="!phoneVerification.isNull()">
                                    {{$str('bound')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray" v-else>{{$str('unbound')}}</h5>
                            </v-flex>
                            <v-flex xs7 class="mt-3  pr-3 text-xs-right">
                                <h6 v-if="!phoneVerification.isNull()">
                                    <a class="color-blue">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-blue text-white-hover c-pointer " v-if="phoneVerification.isNull()"
                                       @click="goLink('phone')">{{$str('bind')}}</a>
                                    <a class="color-blue text-white-hover c-pointer" v-if="!phoneVerification.isNull()">{{$str('changePhone')}}</a>
                                    <a class="color-darkgray text-white-hover c-pointer ml-3"
                                       v-if="emailVerification.status === 'turn_on' && phoneVerification.status === 'turn_on'">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer ml-3"
                                       @click="onModal('phoneTurnOn')"
                                       v-else-if="!phoneVerification.isNull() && phoneVerification.status != 'turn_on'">{{$str('turnOn')}}</a>
                                </h6>
                            </v-flex>
                            <v-flex xs12><p class="color-darkgray">*{{$str('phoneSecurityExplain')}}</p></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs12>
                                <div class="sprite-img ic-account f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('account')}}</h5><h5
                                    class="ml-4 pl-3 color-black">
                                {{emailVerification.email}}</h5></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs12>
                                <div class="sprite-img ic-uid f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">UID</h5><h5 class="ml-4 pl-3 color-black">
                                {{member_no}}</h5>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-password f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('password')}}</h5><h5
                                    class="ml-4 pl-3 color-black">
                                ******</h5></v-flex>
                            <v-flex xs4 class="mt-3 pr-3 text-xs-right"><h6><a @click="goChangePassword"
                                                                               class="color-blue text-white-hover c-pointer">{{$str('modify')}}</a>
                            </h6></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-password f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('tradePwText')}}</h5>
                                <h5 class="ml-4 pl-3 color-black">******</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3 pr-3 text-xs-right"><h6><a
                                    class="color-blue text-white-hover c-pointer" @click="goReset">{{$str('reset')}}</a>
                            </h6></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      다섯번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--신분증 인증-->

                    <div class="mt-5 section-border mb-5 pa-4">
                        <v-layout column>
                            <h4 class="bold">{{$str('idVerification')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('idVerificationExplain')}}</h6>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>

                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-id f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('idVerification')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-black"
                                    v-if="!idVerification.isNull()">
                                    {{idVerification.firstName}} {{idVerification.lastName}}, {{getSecuredIdNo}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray" v-else>{{$str('unverified')}}</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3 pr-2 text-xs-right">
                                <span class="color-darkgray h6"
                                      v-if="!idVerification.isNull() && idVerification.identification_no != undefined">{{$str('verifySliderSuccess')}}</span>
                                <a class="color-blue c-pointer h6" v-else>{{$str('verify')}}</a>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-advanced f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('advancedVerification')}}</h5>
                                <!--<h5 class="mb-3 ml-4 pl-3 color-black" >{{$str('verifySliderSuccess')}}</h5>-->
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray">{{$str('unverified')}}</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3 pr-2 text-xs-right">
                                <a class="color-blue text-white-hover h6 c-pointer">{{$str('verify')}}</a>
                                <!--<span class="color-darkgray h6" >- -</span>-->
                            </v-flex>
                        </v-layout>
                    </div>

                    <!--***************      여섯번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--결제수단 목록-->

                    <div class="mt-5 section-border mb-5 pa-4">
                        <v-layout column>
                            <h4 class="bold">{{$str('paymentMethod')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('paymentMethodExplain')}}</h6>
                        </v-layout>

                        <span v-if="paymentMethod != ''">
                            <!--알리페이-->
                            <v-layout wrap row v-if="paymentMethod.alipay">
                                <v-divider class="mt-4 mb-4"></v-divider>
                                <v-flex xs12>
                                    <div class="sprite-img ic-alipay f-left mr-3"></div>
                                    <h5 class="color-darkgray mb-3">{{$str('alipayText')}}</h5><h5
                                        class="mb-3 ml-4 pl-3 color-black">
                                    {{paymentMethod.alipay.id}} {{paymentMethod.alipay.owner_name}} {{paymentMethod.alipay.alipay_id}}</h5></v-flex>
                                <v-layout class="vertical-center">
                                    <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue text-white-hover">{{$str('modify')}}</a>
                                    </h6>
                                    </v-flex>
                                    <v-flex xs6>
                                        <span @click="onToggle('alipay')"><toggle :toggle="paymentMethod.alipay.active_yn"
                                                                                  class="c-pointer"></toggle></span>
                                    </v-flex>
                                </v-layout>
                            </v-layout>

                            <!--위챗페이-->
                            <v-layout wrap row v-if="paymentMethod.wechat">
                                <v-divider class="mt-4 mb-4"></v-divider>
                                <v-flex xs12>
                                    <div class="sprite-img ic-wechatpay f-left mr-3"></div>
                                    <h5 class="color-darkgray mb-3">{{$str('wechatPayText')}}</h5><h5
                                        class="mb-3 ml-4 pl-3 color-black">
                                    {{paymentMethod.wechat.id}} {{paymentMethod.wechat.owner_name}} {{paymentMethod.wechat.wechat_id}}</h5></v-flex>
                                <v-layout class="vertical-center">
                                    <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">{{$str('modify')}}</a>
                                    </h6>
                                    </v-flex>
                                    <v-flex xs6>
                                        <span @click="onToggle('wechatPay')"><toggle
                                                :toggle="paymentMethod.wechat.active_yn"
                                                class="c-pointer"></toggle></span>
                                    </v-flex>
                                </v-layout>
                            </v-layout>

                            <!--은행계좌-->
                            <v-layout wrap row v-if="paymentMethod.bank">
                                <v-divider class="mt-4 mb-4"></v-divider>
                                <v-flex xs12>
                                    <div class="sprite-img ic-bank f-left mr-3"></div>
                                    <h5 class="color-darkgray mb-3">{{$str('bankAccountText')}}</h5><h5
                                        class="mb-3 ml-4 pl-3 color-black">
                                    {{paymentMethod.bank_account}} {{paymentMethod.bank.owner_name}} {{paymentMethod.bank_name}} {{paymentMethod.bank_branch_info}}</h5></v-flex>
                                <v-layout class="vertical-center">
                                    <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">{{$str('modify')}}</a>
                                    </h6>
                                    </v-flex>
                                    <v-flex xs6>
                                        <span @click="onToggle('bankAccount')"><toggle
                                                :toggle="paymentMethod.bank.active_yn"
                                                class="c-pointer"></toggle></span>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </span>

                        <v-divider class="mt-4 mb-4"></v-divider>
                        <span v-if="paymentMethod === ''">
                          <h5 class="color-darkgray mb-3 mt-4 text-xs-center">{{$str('nullPaymentMethod')}}</h5>
                        </span>

                        <!--결제수단 추가-->
                        <v-layout wrap row class="vertical-center">
                            <v-flex md12>
                                <h5 class="text-xs-center">
                                    <a class="color-blue text-white-hover c-pointer" @click="onModal('addPayment')">{{$str('addPayment')}}</a>
                                </h5></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      일곱번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--차단 목록-->

                    <div class="mt-5 section-border pt-4 pr-4 pl-4 mb-5 pb-4">
                        <v-layout column mb-4>
                            <h4 class="bold">{{$str('blockList')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('blockListExplain')}}</h6>
                        </v-layout>
                        <span v-if="blockList != ''">
                            <v-layout wrap row class="vertical-center flex-divide-top-block"
                                      v-for="block in blockList">
                                <v-flex xs8 class="vertical-center">
                                    <avatar :email="block.email" class="mr-3 f-left"></avatar>
                                    <h5 class="color-blue text-white-hover c-pointer">{{block.nickName}}</h5></v-flex>
                                <v-flex xs4 text-xs-right pr-3><h6><a class="color-blue text-white-hover c-pointer">{{$str('unblock')}}</a>
                                </h6></v-flex>
                            </v-layout>
                        </span>
                        <span v-else>
                            <div class="color-darkgray text-md-center text-xs-center flex-divide-top-block">{{$str('noMoreRecords')}}</div>
                        </span>
                    </div>

                    <!--***************      여덞번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-5 section-border pa-4 ">
                        <v-layout column>
                            <h4 class="bold">{{$str('history')}}</h4>
                            <v-layout class="vertical-center mt-4">
                                <h4 class="color-darkgray medium mr-4a">
                                    <a class="color-darkgray" @click="onSelection('login')"
                                       v-bind:class="{'active-history' : selection_login}">{{$str('loginText')}}</a>
                                </h4>
                                <v-divider inset vertical></v-divider>
                                <h4 class="color-darkgray medium  ml-4">
                                    <a class="color-darkgray" @click="onSelection('security')"
                                       v-bind:class="{'active-history' : selection_security}">{{$str('securitySettings')}}</a>
                                </h4>
                            </v-layout>
                        </v-layout>


                        <!--로그인 선택 시-->
                        <span v-if=" selection_login  && loginHistory != ''">
                            <v-layout wrap row flex-divide-bottom mb-4 pb-4 v-for="data in loginHistory">
                                <v-flex xs12 class="text-xs-left">
                                    <div class="vertical-center mb-2">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">{{$str('date')}}:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.register_datetime}}</h5>
                                        </v-flex>
                                    </div>
                                    <div class="vertical-center mb-2">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">{{$str('Type')}}:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.type}}</h5>
                                        </v-flex>
                                    </div>
                                    <div class="vertical-center mb-2">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">IP:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.ip}}</h5>
                                        </v-flex>
                                    </div>
                                    <div class="vertical-center">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">{{$str('status')}}:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.status === 'success' ? $str('successful') : $str('failed')}}</h5>
                                        </v-flex>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </span>
                        <span v-else>
                             <div class="color-darkgray  mt-4a text-md-center text-xs-center">{{$str('noMoreRecords')}}</div>
                        </span>

                        <!--보안 설정 선택 시-->
                        <span v-else-if=" !selection_login && securitySettings != ''">
                            <v-layout wrap row flex-divide-bottom mb-4 pb-4 v-for="data in securitySettings">
                                <v-flex xs12 class="text-xs-left">
                                    <div class="vertical-center mb-2">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">{{$str('date')}}:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.register_datetime}}</h5>
                                        </v-flex>
                                    </div>
                                    <div class="vertical-center mb-2">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">{{$str('securitySettings')}}:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.type}}</h5>
                                        </v-flex>
                                    </div>
                                    <div class="vertical-center mb-2">
                                        <v-flex xs4 class="flex-pl-0 vertical-center">
                                            <h5 class="color-darkgray text-xs-left">IP:</h5>
                                        </v-flex>
                                        <v-flex xs8 class="flex-pr-0">
                                            <h5 class="color-black">{{data.ip}}</h5>
                                        </v-flex>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </span>
                        <span v-else>
                             <div class="color-darkgray  mt-4a text-md-center text-xs-center">{{$str('noMoreRecords')}}</div>
                        </span>


                        <span v-if="blockList != ''" >
                            <Pagination class="text-md-center mt-5 mb-4"></Pagination>
                        </span>
                    </div>
                </v-flex>
            </v-layout>
        </div>


        <!--=========================데스크탑 환경=========================-->
        <div v-else>
            <v-layout class="mt-5">

                <!--***************      첫번째       *********-->
                <!--***************       섹션        *********-->

                <!--사용자 정보-->

                <v-flex md3 text-md-left text-xs-left>
                    <big-avatar
                            :me=true
                            class="f-left mr-3">
                    </big-avatar>
                    <h5 class="color-blue">{{nickName}}</h5>
                    <h5 class="color-darkgray">UID: {{member_no}}</h5>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <h5 class="color-darkgray">{{$str('trades')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">99999999999999 {{$str('times')}}</span>
                    </h5>
                    <h5 class="color-darkgray">{{$str('avgRelease')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span
                            class="color-black">99999999999999 {{$str('minuteText')}}</span></h5>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <h5 class="color-darkgray">{{$str('accountCreatedTime')}} {{register_datetime}}</h5>
                    <h5 class="color-darkgray mb-5">99999999999999 , {{$str('noRecord')}}</h5>
                </v-flex>


                <v-flex md9 wrap row text-md-left text-xs-left>
                    <div class="section-border ml-3 mr-3 mb-3 pa-4 mb-5">
                        <v-layout>
                            <h4 class="bold">{{$str('accountSecurity')}}</h4>
                            <v-spacer></v-spacer>
                            <h5 class="color-darkgray text-md-right mb-3">{{$str('securityLevel')}} :&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="color-red" v-if="getSecurityLevel === 1">{{$str('low')}}</span>
                                <span class="color-orange" v-else-if="getSecurityLevel === 2">{{$str('medium')}}</span>
                                <span class="color-green" v-else>{{$str('high')}}</span></h5>
                        </v-layout>
                        <p class="text-md-right color-darkgray">*{{$str('securityExplain')}}</p>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--이메일 연동-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-email f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('email')}}</h5></v-flex>
                            <v-flex md2>
                                <h5 class="color-black" v-if="!emailVerification.isNull()">{{$str('bound')}}</h5>
                                <h5 class="color-darkgray" v-else>{{$str('unbound')}}</h5>
                            </v-flex>
                            <v-flex md4><p class="color-darkgray">*{{$str('emailSecurityExplain')}}</p></v-flex>
                            <v-flex md2 text-xs-right>
                                <h6 v-if="emailVerification.isNull()">
                                    <a class="color-blue text-white-hover c-pointer">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-darkgray text-white-hover c-pointer"
                                       v-if="emailVerification.status === 'turn_on' && phoneVerification.status === 'turn_on'"
                                       @click="goTurnOff">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer"
                                       v-else-if="emailVerification != 'turn_on'"
                                       @click="onModal('emailTurnOn')">{{$str('turnOn')}}</a>
                                </h6>
                            </v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--전화 연동-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-phone f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('phone')}}</h5></v-flex>
                            <v-flex md2><h5 class="color-black" v-if="!phoneVerification.isNull()">{{$str('bound')}}</h5>
                                <h5 class="color-darkgray" v-else>{{$str('unbound')}}</h5></v-flex>
                            <v-flex md4><p class="color-darkgray">*{{$str('phoneSecurityExplain')}}</p></v-flex>
                            <v-flex md2 text-xs-right>
                                <h6 v-if="phoneVerification.isNull()">
                                    <a class="color-blue">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-blue text-white-hover c-pointer " v-if="phoneVerification.isNull()"
                                       @click="goLink('phone')">{{$str('bind')}}</a>
                                    <a class="color-blue text-white-hover c-pointer" v-if="!phoneVerification.isNull()">{{$str('changePhone')}}</a>
                                    <a class="color-blue text-white-hover c-pointer ml-3"
                                       v-if="emailVerification.status === 'turn_on' && phoneVerification.status === 'turn_on'">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer ml-3"
                                       @click="onModal('phoneTurnOn')"
                                       v-else-if="!phoneVerification.isNull() && phoneVerification.status != 'turn_on'">{{$str('turnOn')}}</a>
                                </h6>
                            </v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--계정-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-account f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('account')}}</h5></v-flex>
                            <v-flex md2><h5>{{emailVerification.email}}</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md2></v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--UID-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-uid f-left mr-3"></div>
                                <h5 class="color-darkgray">UID</h5></v-flex>
                            <v-flex md2><h5>{{member_no}}</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md2></v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--비밀번호-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-password f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('password')}}</h5></v-flex>
                            <v-flex md2><h5 class="color-darkgray">******</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md2 text-xs-right ><h6><a @click="goChangePassword"
                                               class="color-blue text-white-hover c-pointer">{{$str('modify')}}</a></h6>
                            </v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--거래 비밀번호-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-password f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('tradePwText')}}</h5></v-flex>
                            <v-flex md2><h5 class="color-darkgray">******</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md2 text-xs-right><h6><a class="color-blue text-white-hover c-pointer" @click="goReset">{{$str('reset')}}</a>
                            </h6></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      두번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-6 section-border ma-3 mb-5 pa-4">
                        <v-layout column>
                            <h4 class="bold">{{$str('idVerification')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('idVerificationExplain')}}</h6>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--신분증 인증-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-id f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('idVerification')}}</h5></v-flex>
                            <v-flex md2 >
                                <h5 class="color-black" v-if="!idVerification.isNull()">
                                    {{idVerification.firstName}} {{idVerification.lastName}}, {{getSecuredIdNo}}</h5>
                                <h5 class="color-darkgray" v-else>{{$str('unverified')}}</h5>
                            </v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md2 text-xs-right>
                                <span class="color-darkgray h6"
                                      v-if="!idVerification.isNull() && idVerification.identification_no != undefined">{{$str('verifySliderSuccess')}}</span>
                                <a class="color-blue c-pointer h6 " v-else>{{$str('verify')}}</a>
                            </v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--고급인증-->

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-advanced f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('advancedVerification')}}</h5></v-flex>
                            <v-flex md2>
                                <!--<h5 class="mb-3 ml-4 pl-3 color-black" >{{$str('verifySliderSuccess')}}</h5>-->
                                <h5 class="color-darkgray">{{$str('unverified')}}</h5>
                            </v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md2></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      세번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--결제수단 목록-->

                    <div class="mt-6 section-border ma-3 mb-5 pa-4">
                        <v-layout column>
                            <h4 class="bold">{{$str('paymentMethod')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('paymentMethodExplain')}}</h6>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <span v-if="paymentMethod != ''">
                            <!--알리페이-->
                            <v-layout wrap row class="vertical-center" v-if="paymentMethod.alipay">
                                <v-flex md4>
                                    <div class="sprite-img ic-alipay f-left mr-3"></div>
                                    <h5 class="color-darkgray">{{$str('alipayText')}}</h5></v-flex>
                                <v-flex md6><h5 class="color-black">
                                    {{paymentMethod.alipay.id}} {{paymentMethod.alipay.owner_name}}
                                    {{paymentMethod.alipay.alipay_id}}
                                </h5></v-flex>
                                <v-flex md1><h6><a class="color-blue text-white-hover">{{$str('modify')}}</a></h6></v-flex>
                                <v-flex md1>
                                    <span @click="onToggle('alipay')"><toggle :toggle="paymentMethod.alipay.active_yn"
                                                                              class="c-pointer"></toggle></span>
                                </v-flex>
                            </v-layout>

                            <!--위챗페이-->
                            <v-layout wrap row class="vertical-center" v-if="paymentMethod.wechat">
                                <v-divider class="mt-4 mb-4"></v-divider>
                                <v-flex md4>
                                    <div class="sprite-img ic-wechatpay f-left mr-3"></div>
                                    <h5 class="color-darkgray">{{$str('wechatPayText')}}</h5></v-flex>
                                <v-flex md6><h5 class="color-black">
                                    {{paymentMethod.wechat.id}} {{paymentMethod.wechat.owner_name}}
                                    {{paymentMethod.wechat.wechat_id}}</h5></v-flex>
                                <v-flex md1><h6><a class="color-blue">{{$str('modify')}}</a></h6></v-flex>
                                <v-flex md1>
                                    <span @click="onToggle('wechatPay')"><toggle :toggle="paymentMethod.wechat.active_yn"
                                                                                 class="c-pointer"></toggle></span>
                                </v-flex>
                            </v-layout>

                            <!--은행계좌-->
                            <v-layout wrap row class="vertical-center" v-if="paymentMethod.bank">
                                <v-divider class="mt-4 mb-4"></v-divider>
                                <v-flex md4>
                                    <div class="sprite-img ic-bank f-left mr-3"></div>
                                    <h5 class="color-darkgray">{{$str('bankAccountText')}}</h5></v-flex>
                                <v-flex md6><h5 class="color-black">
                                    {{paymentMethod.bank_account}} {{paymentMethod.bank.owner_name}}
                                    {{paymentMethod.bank_name}} {{paymentMethod.bank_branch_info}}</h5></v-flex>
                                <v-flex md1><h6><a class="color-blue">{{$str('modify')}}</a></h6></v-flex>
                                <v-flex md1>
                                    <span @click="onToggle('bankAccount')"><toggle :toggle="paymentMethod.bank.active_yn"
                                                                                   class="c-pointer"></toggle></span>
                                </v-flex>
                            </v-layout>
                        </span>

                        <!--결제수단 추가-->
                        <v-layout wrap row class="vertical-center">
                            <v-divider class="mt-4 mb-4"></v-divider>
                            <v-flex md12>
                                <h5 class="text-md-center">
                                    <h5 class="color-darkgray mb-3" v-if="paymentMethod === ''">
                                        {{$str('nullPaymentMethod')}}</h5>
                                    <a class="color-blue text-white-hover c-pointer" @click="onModal('addPayment')">{{$str('addPayment')}}</a>
                                </h5>
                            </v-flex>
                        </v-layout>
                    </div>

                    <!--***************      네번째       *********-->
                    <!--***************       섹션        *********-->

                    <!--차단목록-->

                    <div class="mt-6 section-border ma-3  pt-4 pr-4 pl-4 pb-4 mb-5">
                        <v-layout column mb-4>
                            <h4 class="bold">{{$str('blockList')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('blockListExplain')}}</h6>
                        </v-layout>

                        <span v-if="blockList != ''">
                            <div class="color-darkgray mt-5 mb-4 text-md-center " v-if="blockList === ''">
                                {{$str('noMoreRecords')}}
                            </div>
                            <v-layout wrap row class="vertical-center flex-divide-top-block" v-for="block in blockList">
                                <v-flex md10 class="vertical-center">
                                    <avatar :email="block.email" class="mr-3 f-left"></avatar>
                                    <h5 class="color-blue c-pointer text-white-hover ">{{block.nickName}}</h5></v-flex>
                                <v-flex md2><a class="h6 color-blue text-white-hover c-pointer">{{$str('unblock')}}</a>
                                </v-flex>
                            </v-layout>
                         </span>
                        <span v-else>
                            <div class="color-darkgray mt-4a  text-md-center text-xs-center flex-divide-top-block">{{$str('noMoreRecords')}}</div>
                        </span>
                    </div>

                    <!--***************      다섯번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-6 section-border ma-3 pa-4 ">
                        <v-layout column>
                            <h4 class="bold">{{$str('history')}}</h4>
                            <v-layout class="vertical-center mb-5 mt-4">
                                <h4 class="color-darkgray medium mr-4a">
                                    <a class="color-darkgray" @click="onSelection('login')"
                                       v-bind:class="{'active-history' : selection_login}">{{$str('loginText')}}</a>
                                </h4>
                                <v-divider inset vertical></v-divider>
                                <h4 class="color-darkgray medium mr-4a ml-4">
                                    <a class="color-darkgray" @click="onSelection('security')"
                                       v-bind:class="{'active-history' : selection_security}">{{$str('securitySettings')}}</a>
                                </h4>
                            </v-layout>
                        </v-layout>

                        <!--로그인 선택 시-->
                        <span v-if="selection_login  && loginHistory != ''">
                            <v-layout class="vertical-center flex-divide-bottom-block pb-2">
                                <v-flex md4><div class="color-darkgray h5">{{$str('date')}}</div></v-flex>
                                <v-flex md3><div class="color-darkgray h5">{{$str('Type')}}</div></v-flex>
                                <v-flex md3><div class="color-darkgray h5">IP</div></v-flex>
                                <v-flex md2><div
                                        class="color-darkgray h5 text-xs-right">{{$str('status')}}</div></v-flex>
                            </v-layout>
                             <v-layout class="vertical-center flex-divide-bottom-block pt-4 pb-4"
                                       v-for="data in loginHistory">
                                <v-flex md4><div class="color-black h5">{{data.register_datetime}}</div></v-flex>
                                <v-flex md3><div class="color-black h5">{{data.type}}</div></v-flex>
                                <v-flex md3><div class="color-black h5">{{data.ip}}</div></v-flex>
                                <v-flex md2><div class="color-black h5 text-xs-right">{{data.status === 'success' ? $str('successful') : $str('failed')}}</div></v-flex>
                            </v-layout>
                        </span>

                        <!--보안 설정 선택 시-->
                        <span v-else-if=" !selection_login && securitySettings != ''">
                            <v-layout class="vertical-center flex-divide-bottom pb-2">
                                <v-flex md4><div class="color-darkgray h5">{{$str('date')}}</div></v-flex>
                                <v-flex md5><div class="color-darkgray h5">{{$str('securitySettings')}}</div></v-flex>
                                <v-flex md3><div class="color-darkgray h5">IP</div></v-flex>
                            </v-layout>
                               <v-layout class="vertical-center flex-divide-bottom pt-4 pb-4"
                                         v-for="data in securitySettings">
                                <v-flex md4><div class="color-black h5">{{data.register_datetime}}</div></v-flex>
                                <v-flex md5><div class="color-black h5">{{data.type}}</div></v-flex>
                                <v-flex md3><div class="color-black h5">{{data.ip}}</div></v-flex>
                            </v-layout>
                        </span>

                        <span v-if="blockList === ''" >
                            <div class="color-darkgray mt-5 mb-4 text-md-center text-xs-center">{{$str('noMoreRecords')}}</div>
                        </span>
                        <span v-else>
                            <Pagination class="text-md-center mt-5 mb-4"></Pagination>
                        </span>
                    </div>
                </v-flex>
            </v-layout>
        </div>

        <!--결제수단 추가 모달-->
        <my-page-modal :show="showModal" :type="modalType" :phoneNumber="phoneVerification.phoneNumber"
                       :email="emailVerification.email"
                       v-on:close="onClose" v-on:paymentMethod="getPaymentMethod"
                       v-on:turnon="onTurnOn" v-on:nickName="nickName"></my-page-modal>
    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
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

    export default {
        name: "MyPage",
        components: {BigAvatar, Avatar, Pagination, Toggle, MyPageModal},
        data: () => ({
            selection_login: true,
            selection_security: false,
            showModal: false,
            modalType: '',

            member_no: MainRepository.Login.getUserInfo().memberNo,
            nickName: MainRepository.Login.getUserInfo().nickname,
            register_datetime: MainRepository.Login.getUserInfo().createDatetime,

            emailVerification: new EmailVerification(''),
            phoneVerification: new PhoneVerification(''),
            idVerification: new IdVerification(''),
            paymentMethod: '',
            blockList: '',
            loginHistory: '',
            securitySettings: '',
        }),
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.Login.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }

            // 유저 인증 정보 GET
            let self = this;
            MainRepository.MyPage.getMemberVerification(function (email, phone) {
                self.emailVerification = email;
                self.phoneVerification = phone;
            });

            // 유저 ID 인증 정보 GET
            MainRepository.MyPage.getIdVerification(function (idVerification) {
                self.idVerification = idVerification;
            });

            // 유저 결제수단 정보 GET
            MainRepository.Common.getPaymentMethod(function (paymentMethod) {
                self.paymentMethod = paymentMethod;
            });

            // 차단 리스트 정보 GET
            MainRepository.MyPage.getBlockList(function (blockList) {
                self.blockList = blockList;
                console.log(blockList);
            });

            // 로그인 기록 정보 GET
            MainRepository.MyPage.getLoginHistory(function (loginHistory) {
                self.loginHistory = loginHistory;
            });

            // 보안 설정 정보 GET
            MainRepository.MyPage.getSecuritySettings(function (securitySettings) {
                self.securitySettings = securitySettings;
            });
        },
        mounted() {
            if (this.nickName === '') {
                this.modalType = 'nickName';
                this.showModal = true;
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            getSecurityLevel() {
                let level = 1;
                if (!this.phoneVerification.isNull()) {
                    ++level;
                }
                if (this.nickName != '') {
                    ++level;
                }
                return level;
            },
            getSecuredIdNo() {
                let noLength = this.idVerification.identification_no.length;
                let securedIdNo = this.idVerification.identification_no.substr(0, 2) + '*********' + this.idVerification.identification_no.substr(noLength - 2, 2);
                return securedIdNo;
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
            onToggle: function (type) {

                // 결제수단 별 토글버튼 on/off 로직
                if (type === 'alipay') {
                    if (this.user.alipay_toggle_use === false) {
                        this.user.alipay_toggle_use = true;
                    } else {
                        this.user.alipay_toggle_use = false;
                    }
                } else if (type === 'wechatPay') {
                    if (this.user.wechat_toggle_use === false) {
                        this.user.wechat_toggle_use = true;
                    } else {
                        this.user.wechat_toggle_use = false;
                    }
                } else {
                    if (this.user.bank_toggle_use === false) {
                        this.user.bank_toggle_use = true;
                    } else {
                        this.user.bank_toggle_use = false;
                    }
                }
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

        }
    }
</script>

<style scoped>
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
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;

        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
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