<template>
    <div class="myPage-box">

        <!-- Header -->
        <div class="account-header">
            <h4>{{ $str('accountSecurity') }}</h4>
            <div class="header-detail">
                <p class="h6 mb-3">
                    {{ $str('securityLevel') }} :
                    <span class="color-red" v-if="getSecurityLevel === 1">{{ $str('low') }}</span>
                    <span class="color-orange" v-else-if="getSecurityLevel === 2">{{ $str('medium') }}</span>
                    <span class="color-green" v-else>{{ $str('high') }}</span>
                </p>
                <p class="caption">* {{ $str('securityExplain') }}</p>
            </div>
        </div>

        <!-- 1. Email -->
        <ul class="otherInfo-body">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-email"></div>
                <p>{{ $str('email') }}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">
                <span class="color-black" v-if="!email.isNull()">{{ $str('bound') }}</span>
                <span class="color-darkgray" v-else>{{ $str('unbound') }}</span>
                <span class="caption pl-4"> * {{ $str('emailSecurityExplain') }}</span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">

                <!--비활성화 버튼-->
                <btn-mypage v-if="email.status === 'turn_on' && phone.status === 'turn_on'"
                            :txt="$str('turnOff')"
                            @click="goTurnOff('email')"
                />

                <!--비활성화 불가 버튼-->
                <div v-else-if="email.status === 'turn_on' && phone.status !== 'turn_on'" class="btn-disabled-gray d-inline-block-none-middle">
                    {{ $str('turnOff') }}
                </div>

                <!--활성화 버튼-->
                <btn-mypage v-if="!email.isNull() && email.status !== 'turn_on'"
                            :txt="$str('turnOn')"
                            @click="onTurnOn('email')"
                />
            </li>
        </ul>

        <!-- 2. Phone -->
        <ul class="otherInfo-body">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-phone"></div>
                <p>{{ $str('phone') }}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">
                <span class="color-black" v-if="!phone.isNull()">{{ $str('bound') }}</span>
                <span class="color-darkgray" v-else>{{ $str('unbound') }}</span>
                <span class="caption pl-4"> * {{ $str('phoneSecurityExplain') }}</span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">

                <!-- 등록이 되어 있을 때 -->
                <span v-if="!phone.isNull()">

                     <!-- 핸드폰 번호 바꾸기 버튼 -->
                    <btn-mypage v-if="!phone.isNull()"
                                :txt="$str('changePhone')"
                                @click="goChangePhone"
                    />

                    <!--비활성화 버튼-->
                    <btn-mypage v-if="email.status === 'turn_on' && phone.status === 'turn_on'"
                                :txt="$str('turnOff')"
                                @click="goTurnOff('phone')"
                    />

                    <!--비활성화 불가 버튼-->
                    <div v-else-if="email.status !== 'turn_on' && phone.status === 'turn_on'"
                         class="btn-disabled-gray d-inline-block-none-middle">
                        {{ $str('turnOff') }}
                    </div>


                    <!--활성화 버튼-->
                    <btn-mypage v-if="!phone.isNull() && phone.status !== 'turn_on'"
                                :txt="$str('turnOn')"
                                @click="onTurnOn('phone')"
                    />
                </span>

                <!-- 등록이 되어 있지 않을 때 -->
                <span v-else>
                    <!-- 연동하기 버튼 -->
                    <btn-mypage v-if="phone.isNull()"
                                :txt="$str('bind')"
                                @click="goLink('phone')"
                    />
                </span>
            </li>
        </ul>

        <!-- 3. Account -->
        <ul class="otherInfo-body">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-account"></div>
                <p>{{$str('account')}}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">
                <span class="color-black">{{ myInfo.email }}</span>
            </li>
            <li></li>
        </ul>

        <!-- 4. UID -->
        <ul class="otherInfo-body">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-uid"></div>
                <p>UID</p>
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
                <div class="sprite-img ic-password"></div>
                <p>{{ $str('password') }}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">
                <span class="color-black"> ****** </span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">
                <btn-mypage
                        :txt="$str('modify')"
                        @click="goChangePassword"
                />
            </li>
        </ul>

        <!-- 6. Trade Password -->
        <ul class="otherInfo-body bd-btm-none">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-password"></div>
                <p>{{ $str('tradePwText') }}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">
                <span class="color-black">******</span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">
                <btn-mypage
                        :txt="$str('reset')"
                        @click="goReset"
                />
            </li>
        </ul>

        <!-- Turn On Dialog -->
        <dialog-turn-on
                :show-dialog="showTurnOn"
                :phone-number="phone.phoneNumber"
                :email="email.email"
                :modalType="modalType"
                @done="done"
                @close="offDialog"
        />

    </div>
</template>

<script>
    import BtnMypage from "../item/BtnMypage";
    import DialogTurnOn from "../../../../../components/dialog/DialogTurnOn";
    import MainRepository from "../../../../../vuex/MainRepository";

    export default {
        name: "my-account-security",
        components: {
            DialogTurnOn,
            BtnMypage
        },
        props: {
            email: {},
            phone: {},
            myInfo: {},
        },
        data() {
            return {
                showTurnOn: false,
                modalType: '',
            }
        },
        computed: {
            getSecurityLevel() {
                let level = 1;
                if (!this.phone.isNull()) {
                    ++level;
                }
                if (this.myInfo.nickname !== '') {
                    ++level;
                }
                return level;
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        methods: {
            goLink(type) {
                let url = "/linkAccount";
                if (type === 'email') {
                    url += '?email';
                } else {
                    url += '?phone';
                }
                this.$router.push(url);
            },
            goChangePassword() {
                MainRepository.router().goChangePassword();
            },
            goChangePhone() {
                MainRepository.router().goChangePhone()
            },
            goReset() {
                MainRepository.router().goResetTradePassword();
            },
            goTurnOff(type) {
                MainRepository.router().goTurnOff(type);
            },
            onTurnOn(type) {
                this.modalType = type;
                this.showTurnOn = true;
            },
            offDialog() {
                this.showTurnOn = false;
            },
            done() {
                this.email.status = 'turn_on'
            }

        }
    }
</script>

<style scoped>

</style>