<template>
    <div>


        <!--=========================모바일 환경=========================-->
        <div v-if="isMobile">
            <v-layout class="mt-5">
                <v-flex xs12 text-md-left text-xs-left>

                    <!--***************      첫번째       *********-->
                    <!--***************       섹션        *********-->
                    <big-avatar
                            :name=user.nick_name[0]
                            :isLogin=user.isLogin
                            :color=user.color class="f-left mr-3">
                    </big-avatar>
                    <h5 class="color-blue">{{user.nick_name}}</h5>
                    <h5 class="color-darkgray">UID: {{user.uid}}</h5>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <!--***************      두번째       *********-->
                    <!--***************       섹션        *********-->

                    <h5 class="color-darkgray">{{$str('trades')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">{{user.transaction_number}} {{$str('times')}}</span>
                    </h5>
                    <h5 class="color-darkgray">{{$str('avgRelease')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span
                            class="color-black">{{user.avg_release}} {{$str('minuteText')}}</span></h5>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <!--***************      세번째       *********-->
                    <!--***************       섹션        *********-->

                    <h5 class="color-darkgray">{{$str('accountCreatedTime')}} {{getDate(user.dateTime)}}</h5>
                    <h5 class="color-darkgray mb-5">{{getTime(user.dateTime)}} , {{$str('noRecord')}}</h5>

                    <!--***************      네번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="section-border pa-4 mb-5">
                        <v-layout column>
                            <h4 class="bold mb-3">{{$str('accountSecurity')}}</h4>
                            <h5 class="color-darkgray text-md-right mb-3">{{$str('securityLevel')}} :&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="color-red" v-if="user.kyc_level === 1">{{$str('low')}}</span>
                                <span class="color-orange" v-else-if="user.kyc_level === 2">{{$str('medium')}}</span>
                                <span class="color-green" v-else>{{$str('high')}}</span></h5>
                        </v-layout>
                        <p class="text-xs-left color-darkgray">*{{$str('securityExplain')}}</p>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-email f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('email')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-black" v-if="user.kyc_email === 'y'">
                                    {{$str('bound')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray" v-else>{{$str('unbound')}}</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3  pr-3 text-xs-right">
                                <h6 v-if="!user.kyc_email">
                                    <a class="color-blue text-white-hover c-pointer">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-darkgray text-white-hover c-pointer"
                                       v-if="user.mail_status === 'activatied' && user.phone_status === 'activatied' && user.kyc_phone === 'y'&& user.kyc_email === 'y'"
                                       @click="goTurnOff">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer"
                                       v-else-if="user.mail_status === 'deactivatied'&& user.kyc_email === 'y' "
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
                                <h5 class="mb-3 ml-4 pl-3 color-black" v-if="user.kyc_phone === 'y'">
                                    {{$str('bound')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray" v-else>{{$str('unbound')}}</h5>
                            </v-flex>
                            <v-flex xs7 class="mt-3  pr-3 text-xs-right">
                                <h6 v-if="!user.kyc_phone">
                                    <a class="color-blue">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-blue text-white-hover c-pointer " v-if="user.kyc_phone === 'n'"
                                       @click="goLink('phone')">{{$str('bind')}}</a>
                                    <a class="color-darkgray text-white-hover c-pointer" v-if="user.kyc_phone === 'y'">{{$str('changePhone')}}</a>
                                    <a class="color-darkgray text-white-hover c-pointer ml-3"
                                       v-if="user.mail_status === 'activatied' && user.phone_status === 'activatied' && user.kyc_phone === 'y'&& user.kyc_email === 'y'">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer ml-3"
                                       @click="onModal('phoneTurnOn')"
                                       v-else-if="user.kyc_phone === 'y' && user.phone_status === 'deactivatied'">{{$str('turnOn')}}</a>
                                </h6>
                            </v-flex>
                            <v-flex xs12><p class="color-darkgray">*{{$str('emailSecurityExplain')}}</p></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs12>
                                <div class="sprite-img ic-account f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('account')}}</h5><h5
                                    class="ml-4 pl-3 color-black">
                                {{user.email}}</h5></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs12>
                                <div class="sprite-img ic-uid f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">UID</h5><h5 class="ml-4 pl-3 color-black">
                                {{user.uid}}</h5>
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
                                <h5 class="mb-3 ml-4 pl-3 color-black">{{user.kyc_id === 'y'?
                                    $str('verifySliderSuccess') : $str('unverified')}}</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3 pr-2 text-xs-right">
                                <a class="color-blue c-pointer h6" v-if="!user.kyc_id">{{$str('verify')}}</a>
                                <span class="color-darkgray h6" v-else>{{$str('verifySliderSuccess')}}</span>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row>
                            <v-flex xs8>
                                <div class="sprite-img ic-advanced f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('advancedVerification')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-black" v-if="user.kyc_id_advanced === 'y'">
                                    {{$str('verified')}}</h5>
                                <h5 class="mb-3 ml-4 pl-3 color-darkgray" v-else>{{$str('unverified')}}</h5>
                            </v-flex>
                            <v-flex xs4 class="mt-3 pr-2 text-xs-right">
                                <a class="color-blue text-white-hover h6 c-pointer" v-if="user.kyc_id_advanced === 'n'">{{$str('verify')}}</a>
                                <span class="color-darkgray h6" v-else>--</span>
                            </v-flex>
                        </v-layout>
                    </div>

                    <!--***************      여섯번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-5 section-border mb-5 pa-4">
                        <v-layout column>
                            <h4 class="bold">{{$str('paymentMethod')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('paymentMethodExplain')}}</h6>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row v-if="user.alipay_use === 'y'">
                            <v-flex xs12>
                                <div class="sprite-img ic-alipay f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('alipayText')}}</h5><h5
                                    class="mb-3 ml-4 pl-3 color-black">
                                {{user.apipay_address}}</h5></v-flex>
                            <v-layout class="vertical-center">
                                <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue text-white-hover">{{$str('modify')}}</a>
                                </h6>
                                </v-flex>
                                <v-flex xs6>
                                    <span @click="onToggle('alipay')"><toggle :toggle="user.alipay_toggle_use"
                                                                              class="c-pointer"></toggle></span>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>


                        <v-layout wrap row v-if="user.wechat_use === 'y'">
                            <v-flex xs12>
                                <div class="sprite-img ic-wechatpay f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('wechatPayText')}}</h5><h5
                                    class="mb-3 ml-4 pl-3 color-black">
                                {{user.wechat_address}}</h5></v-flex>
                            <v-layout class="vertical-center">
                                <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">{{$str('modify')}}</a>
                                </h6>
                                </v-flex>
                                <v-flex xs6>
                                    <span @click="onToggle('wechatPay')"><toggle :toggle="user.wechat_toggle_use"
                                                                                 class="c-pointer"></toggle></span>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>


                        <v-layout wrap row v-if="user.bank_use === 'y'">
                            <v-flex xs12>
                                <div class="sprite-img ic-bank f-left mr-3"></div>
                                <h5 class="color-darkgray mb-3">{{$str('bankAccountText')}}</h5><h5
                                    class="mb-3 ml-4 pl-3 color-black">
                                {{user.bank_address}}</h5></v-flex>
                            <v-layout class="vertical-center">
                                <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">{{$str('modify')}}</a>
                                </h6>
                                </v-flex>
                                <v-flex xs6>
                                    <span @click="onToggle('bankAccount')"><toggle :toggle="user.bank_toggle_use"
                                                                                   class="c-pointer"></toggle></span>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center">
                            <v-flex md12>
                                <h5 class="text-xs-center">
                                    <a class="color-blue text-white-hover c-pointer" @click="onModal('addPayment')">{{$str('addPayment')}}</a>
                                </h5></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      일곱번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-5 section-border pt-4 pr-4 pl-4 mb-5">
                        <v-layout column mb-4>
                            <h4 class="bold">{{$str('blockList')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('blockListExplain')}}</h6>
                        </v-layout>
                        <v-layout wrap row class="vertical-center flex-divide-top" v-for="block in block_list">
                            <v-flex xs8 class="vertical-center">
                                <avatar :name=block.nick_name[0]
                                        :isLogin=block.isLogin
                                        :color=block.color class="mr-3 f-left"></avatar>
                                <h5 class="color-blue text-white-hover c-pointer">{{block.nick_name}}</h5></v-flex>
                            <v-flex xs4 text-xs-right pr-3><h6><a class="color-blue text-white-hover c-pointer">{{$str('unblock')}}</a>
                            </h6></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      여덞번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-5 section-border pa-4 mb-6">
                        <v-layout column>
                            <h4 class="bold">{{$str('history')}}</h4>
                            <v-layout class="vertical-center mt-4">
                                <div class="history-wrapper ">
                                    <div class="selection selection-border-login" @click="onSelection('login')"
                                         v-bind:class="{'selection-selected' : selection_login}">{{$str('loginText')}}
                                    </div>
                                    <div class="selection selection-border-security" @click="onSelection('security')"
                                         v-bind:class="{'selection-selected' : selection_security}">
                                        {{$str('securitySettings')}}
                                    </div>
                                </div>
                            </v-layout>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>

                        <!--로그인 선택 시-->
                        <span v-if=" selection_login === true">
                        <v-layout wrap row flex-divide-bottom mb-4 pb-4 v-for="data in login_history">
                            <v-flex xs12 class="text-xs-left">
                                <div class="vertical-center mb-2">
                                    <v-flex xs4 class="flex-pl-0 vertical-center">
                                        <h5 class="color-darkgray text-xs-left">{{$str('date')}}:</h5>
                                    </v-flex>
                                    <v-flex xs8 class="flex-pr-0">
                                        <h5 class="color-black">{{data.dateTime}}</h5>
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

                        <!--보안 설정 선택 시-->
                        <span v-else>
                        <v-layout wrap row flex-divide-bottom mb-4 pb-4 v-for="data in security_history">
                            <v-flex xs12 class="text-xs-left">
                                <div class="vertical-center mb-2">
                                    <v-flex xs4 class="flex-pl-0 vertical-center">
                                        <h5 class="color-darkgray text-xs-left">{{$str('date')}}:</h5>
                                    </v-flex>
                                    <v-flex xs8 class="flex-pr-0">
                                        <h5 class="color-black">{{data.dateTime}}</h5>
                                    </v-flex>
                                </div>
                                <div class="vertical-center mb-2">
                                    <v-flex xs4 class="flex-pl-0 vertical-center">
                                        <h5 class="color-darkgray text-xs-left">{{$str('securitySettings')}}:</h5>
                                    </v-flex>
                                    <v-flex xs8 class="flex-pr-0">
                                        <h5 class="color-black">{{data.security_setting}}</h5>
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
                        <Pagination class="text-xs-center mb-4"></Pagination>
                    </div>
                </v-flex>
            </v-layout>
        </div>


        <!--=========================데스크탑 환경=========================-->
        <div v-else>
            <v-layout class="mt-5">

                <!--***************      첫번째       *********-->
                <!--***************       섹션        *********-->
                <v-flex md3 text-md-left text-xs-left>
                    <big-avatar
                            :name=user.email[0]
                            :isLogin=user.isLogin
                            :color=user.color class="f-left mr-3">
                    </big-avatar>
                    <h5 class="color-blue">{{user.nick_name}}</h5>
                    <h5 class="color-darkgray">UID: {{user.uid}}</h5>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <h5 class="color-darkgray">{{$str('trades')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">{{user.transaction_number}} {{$str('times')}}</span>
                    </h5>
                    <h5 class="color-darkgray">{{$str('avgRelease')}} :&nbsp;&nbsp;&nbsp;&nbsp;<span
                            class="color-black">{{user.avg_release}} {{$str('minuteText')}}</span></h5>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <h5 class="color-darkgray">{{$str('accountCreatedTime')}} {{getDate(user.dateTime)}}</h5>
                    <h5 class="color-darkgray mb-5">{{getTime(user.dateTime)}} , {{$str('noRecord')}}</h5>
                </v-flex>


                <v-flex md9 wrap row text-md-left text-xs-left>
                    <div class="section-border ml-3 mr-3 mb-3 pa-4 mb-5">
                        <v-layout>
                            <h4 class="bold">{{$str('accountSecurity')}}</h4>
                            <v-spacer></v-spacer>
                            <h5 class="color-darkgray text-md-right mb-3">{{$str('securityLevel')}} :&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="color-red" v-if="user.kyc_level === 1">{{$str('low')}}</span>
                                <span class="color-orange" v-else-if="user.kyc_level === 2">{{$str('medium')}}</span>
                                <span class="color-green" v-else>{{$str('high')}}</span></h5>
                        </v-layout>
                        <p class="text-md-right color-darkgray">*{{$str('securityExplain')}}</p>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-email f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('email')}}</h5></v-flex>
                            <v-flex md3>
                                <h5 class="color-black" v-if="user.kyc_email === 'y'">{{$str('bound')}}</h5>
                                <h5 class="color-darkgray" v-else>{{$str('unbound')}}</h5>
                            </v-flex>
                            <v-flex md4><p class="color-darkgray">{{$str('emailSecurityExplain')}}</p></v-flex>
                            <v-flex md1><h6 v-if="!user.kyc_email">
                                <a class="color-blue text-white-hover c-pointer">{{$str('bound')}}</a>
                            </h6>
                                <h6 v-else>
                                    <a class="color-darkgray text-white-hover c-pointer"
                                       v-if="user.mail_status === 'activatied' && user.phone_status === 'activatied' && user.kyc_phone === 'y'&& user.kyc_email === 'y'"
                                       @click="goTurnOff">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer"
                                       v-else-if="user.mail_status === 'deactivatied'&& user.kyc_email === 'y' "
                                       @click="onModal('emailTurnOn')">{{$str('turnOn')}}</a>
                                </h6></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-phone f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('phone')}}</h5></v-flex>
                            <v-flex md3><h5 class="color-black" v-if="user.kyc_phone === 'y'">{{$str('bound')}}</h5>
                                <h5 class="color-darkgray" v-else>{{$str('unbound')}}</h5></v-flex>
                            <v-flex md4><p class="color-darkgray">*{{$str('emailSecurityExplain')}}</p></v-flex>
                            <v-flex md1>
                                <h6 v-if="!user.kyc_phone">
                                    <a class="color-blue">{{$str('bound')}}</a>
                                </h6>
                                <h6 v-else>
                                    <a class="color-blue text-white-hover c-pointer " v-if="user.kyc_phone === 'n'"
                                       @click="goLink('phone')">{{$str('bind')}}</a>
                                    <a class="color-darkgray text-white-hover c-pointer" v-if="user.kyc_phone === 'y'">{{$str('changePhone')}}</a>
                                    <a class="color-darkgray text-white-hover c-pointer ml-3"
                                       v-if="user.mail_status === 'activatied' && user.phone_status === 'activatied' && user.kyc_phone === 'y'&& user.kyc_email === 'y'">{{$str('turnOff')}}</a>
                                    <a class="color-blue text-white-hover c-pointer ml-3"
                                       @click="onModal('phoneTurnOn')"
                                       v-else-if="user.kyc_phone === 'y' && user.phone_status === 'deactivatied'">{{$str('turnOn')}}</a>
                                </h6>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-account f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('account')}}</h5></v-flex>
                            <v-flex md3><h5>{{user.email}}</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md1></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-uid f-left mr-3"></div>
                                <h5 class="color-darkgray">UID</h5></v-flex>
                            <v-flex md3><h5>{{user.uid}}</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md1></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-password f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('password')}}</h5></v-flex>
                            <v-flex md3><h5 class="color-darkgray">******</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md1><h6><a @click="goChangePassword"
                                               class="color-blue text-white-hover c-pointer">{{$str('modify')}}</a></h6>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-password f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('tradePwText')}}</h5></v-flex>
                            <v-flex md3><h5 class="color-darkgray">*******</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md1><h6><a class="color-blue text-white-hover c-pointer" @click="goReset">{{$str('reset')}}</a>
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
                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-id f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('idVerification')}}</h5></v-flex>
                            <v-flex md3><h5 class="color-black">{{user.kyc_id === 'y'?
                                $str('verifySliderSuccess') : $str('unverified')}}</h5></v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md1><a class="color-blue c-pointer h6" v-if="!user.kyc_id">{{$str('verify')}}</a>
                                <span class="color-darkgray h6" v-else>{{$str('verifySliderSuccess')}}</span></v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>

                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-advanced f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('advancedVerification')}}</h5></v-flex>
                            <v-flex md3>
                                <h5 class="color-black" v-if="user.kyc_id_advanced === 'y'">{{$str('verified')}}</h5>
                                <h5 class="color-darkgray" v-else>{{$str('unverified')}}</h5>
                            </v-flex>
                            <v-flex md4></v-flex>
                            <v-flex md1></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      세번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-6 section-border ma-3 mb-5 pa-4">
                        <v-layout column>
                            <h4 class="bold">{{$str('paymentMethod')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('paymentMethodExplain')}}</h6>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center" v-if="user.alipay_use === 'y'">
                            <v-flex md4>
                                <div class="sprite-img ic-alipay f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('alipayText')}}</h5></v-flex>
                            <v-flex md6><h5 class="color-black">{{user.apipay_address}}</h5></v-flex>
                            <v-flex md1><h6><a class="color-blue text-white-hover">{{$str('modify')}}</a></h6></v-flex>
                            <v-flex md1>
                                <span @click="onToggle('alipay')"><toggle :toggle="user.alipay_toggle_use"
                                                                          class="c-pointer"></toggle></span>
                            </v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center" v-if="user.wechat_use === 'y'">
                            <v-flex md4>
                                <div class="sprite-img ic-wechatpay f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('wechatPayText')}}</h5></v-flex>
                            <v-flex md6><h5 class="color-black">{{user.wechat_address}}</h5></v-flex>
                            <v-flex md1><h6><a class="color-blue">{{$str('modify')}}</a></h6></v-flex>
                            <v-flex md1>
                                <span @click="onToggle('wechatPay')"><toggle :toggle="user.wechat_toggle_use"
                                                                             class="c-pointer"></toggle></span>
                            </v-flex>
                        </v-layout>

                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center">
                            <v-flex md4>
                                <div class="sprite-img ic-bank f-left mr-3"></div>
                                <h5 class="color-darkgray">{{$str('bankAccountText')}}</h5></v-flex>
                            <v-flex md6><h5 class="color-black">{{user.bank_address}}</h5></v-flex>
                            <v-flex md1><h6><a class="color-blue">{{$str('modify')}}</a></h6></v-flex>
                            <v-flex md1>
                                <span @click="onToggle('bankAccount')"><toggle :toggle="user.bank_toggle_use"
                                                                               class="c-pointer"></toggle></span>
                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-4 mb-4"></v-divider>
                        <v-layout wrap row class="vertical-center">
                            <v-flex md12>
                                <h5 class="text-md-center">
                                    <a class="color-blue text-white-hover c-pointer" @click="onModal('addPayment')">{{$str('addPayment')}}</a>
                                </h5></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      네번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-6 section-border ma-3  pt-4 pr-4 pl-4 mb-5">
                        <v-layout column mb-4>
                            <h4 class="bold">{{$str('blockList')}}</h4>
                            <h6 class="color-darkgray mt-3">{{$str('blockListExplain')}}</h6>
                        </v-layout>
                        <v-layout wrap row class="vertical-center flex-divide-top" v-for="block in block_list">
                            <v-flex md11 class="vertical-center">
                                <avatar :name=block.nick_name[0]
                                        :isLogin=block.isLogin
                                        :color=block.color class="mr-3 f-left"></avatar>
                                <h5 class="color-darkgray">{{block.nick_name}}</h5></v-flex>
                            <v-flex md1><h6><a class="color-blue text-white-hover c-pointer">{{$str('unblock')}}</a>
                            </h6></v-flex>
                        </v-layout>
                    </div>

                    <!--***************      다섯번째       *********-->
                    <!--***************       섹션        *********-->

                    <div class="mt-6 section-border ma-3 pa-4 mb-5">
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
                        <span v-if=" selection_login === true">
                            <v-layout   class="vertical-center flex-divide-bottom pb-2">
                                <v-flex md4><div class="color-darkgray h5">{{$str('date')}}</div></v-flex>
                                <v-flex md3><div class="color-darkgray h5">{{$str('Type')}}</div></v-flex>
                                <v-flex md3><div class="color-darkgray h5">IP</div></v-flex>
                                <v-flex md2><div class="color-darkgray h5 text-xs-right">{{$str('status')}}</div></v-flex>
                            </v-layout>
                             <v-layout   class="vertical-center flex-divide-bottom pt-4 pb-4" v-for="data in login_history">
                                <v-flex md4><div class="color-black h5">{{data.dateTime}}</div></v-flex>
                                <v-flex md3><div class="color-black h5">{{data.type}}</div></v-flex>
                                <v-flex md3><div class="color-black h5">{{data.ip}}</div></v-flex>
                                <v-flex md2><div class="color-black h5 text-xs-right">{{data.status === 'success' ? $str('successful') : $str('failed')}}</div></v-flex>
                            </v-layout>
                        </span>

                        <!--보안 설정 선택 시-->
                        <span v-else>
                            <v-layout   class="vertical-center flex-divide-bottom pb-2">
                                <v-flex md4><div class="color-darkgray h5">{{$str('date')}}</div></v-flex>
                                <v-flex md5><div class="color-darkgray h5">{{$str('securitySettings')}}</div></v-flex>
                                <v-flex md3><div class="color-darkgray h5">IP</div></v-flex>
                            </v-layout>
                               <v-layout   class="vertical-center flex-divide-bottom pt-4 pb-4" v-for="data in security_history">
                                <v-flex md4><div class="color-black h5">{{data.dateTime}}</div></v-flex>
                                <v-flex md5><div class="color-black h5">{{data.security_setting}}</div></v-flex>
                                <v-flex md3><div class="color-black h5">{{data.ip}}</div></v-flex>
                            </v-layout>
                        </span>



                        <Pagination class="text-md-center mt-5 mb-4"></Pagination>
                    </div>
                </v-flex>
            </v-layout>
        </div>

        <!--결제수단 추가 모달-->
        <my-page-modal :show="showModal" :type="modalType" :phoneNo="user.phone_no" :email="user.email"
                       v-on:close="onClose" v-on:paymentMethod="getPaymentMethod"
                       v-on:turnon="onTurnOn" v-on:nickName="getNickName"></my-page-modal>

    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import BigAvatar from '@/components/BigAvatar.vue';
    import Avatar from '@/components/Avatar.vue';
    import Pagination from '@/components/Pagination.vue';
    import Toggle from '@/components/Toggle.vue';
    import MyPageModal from './myPageItem/MyPageModal.vue';

    export default {
        name: "MyPage",
        components: {BigAvatar, Avatar, Pagination, Toggle, MyPageModal},
        data: () => ({
            selection_login: true,
            selection_security: false,
            showModal: false,
            modalType: '',
            user: {
                mail_status: 'activatied',
                phone_status: 'deactivated',
                member_no: 1,
                uid: 15198155,
                nick_name: '',
                real_name: 'Kay',
                id_no: '36**********51',
                trade_no: 408125,
                avg_release: 21,
                transaction_number: 5,
                dateTime: '2018-07-31 19:10:00',
                kyc_level: 3,
                kyc_email: 'y',
                kyc_phone: 'n',
                kyc_id: 'y',
                kyc_id_advanced: 'n',
                alipay_use: 'y',
                wechat_use: 'y',
                bank_use: 'y',
                alipay_toggle_use: false,
                wechat_toggle_use: false,
                bank_toggle_use: false,
                apipay_address: '18529612778 未绑定 Alipay',
                wechat_address: '1852961277 未绑定 Wechatpay',
                bank_address: '6214856562128938 未绑定 未绑定未 绑定未绑定未绑定',
                phone_no: '01048789415',
                email: 'Charles@naver.com',
                isLogin: true,
                color: '#8869CA',
            },
            block_list: [{
                member_no: 100,
                nick_name: 'Max',
                color: '#8869CA',
                isLogin: true,
            }, {
                member_no: 101,
                nick_name: 'Jack',
                color: '#B0D63E',
                isLogin: true,
            }, {
                member_no: 102,
                nick_name: 'Ab',
                color: '#E25422',
                isLogin: false,
            }, {
                member_no: 103,
                nick_name: 'Ryan',
                color: '#E05543',
                isLogin: false,
            },
            ],
            security_history: [{
                dateTime: '2018-07-23 10:05:32',
                security_setting: 'reset password',
                ip: '210.91.70.158'
            }, {
                dateTime: '2018-07-24 11:02:07',
                security_setting: 'reset password',
                ip: '210.91.70.158'
            }, {
                dateTime: '2018-07-24 23:01:13',
                security_setting: 'reset password',
                ip: '210.91.70.158'
            }, {
                dateTime: '2018-07-25 00:01:45',
                security_setting: 'reset password',
                ip: '210.91.70.158'
            },
            ],
            login_history: [{
                dateTime: '2018-02-12 10:05:32',
                type: 'Web',
                ip: '210.91.70.158',
                status: 'success'
            }, {
                dateTime: '2018-03-11 11:02:07',
                type: 'Mobile',
                ip: '210.91.70.158',
                status: 'success'
            }, {
                dateTime: '2018-05-20 00:01:13',
                type: 'Mobile',
                ip: '210.91.70.158',
                status: 'success'
            }, {
                dateTime: '2018-07-05 07:05:45',
                type: 'Web',
                ip: '210.91.70.158',
                status: 'success'
            },
            ]
        }),
        mounted() {
            if (this.user.nick_name === '') {
                this.modalType = 'nickName';
                this.showModal = true;
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
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
                // 결제수단 정보 AXIOS GET

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
            getNickName() {
                // 전체 정보 AXIOS GET 성공 후 진행
                this.showModal = false;
            }
        }
    }
</script>

<style scoped>
    .flex-pl-0 {
        padding-left: 0px;
    }

    .flex-divide-top {
        border-top: solid 1px #d1d1d1;
        height: 82px;
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