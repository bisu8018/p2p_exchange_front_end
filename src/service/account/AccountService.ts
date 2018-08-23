import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";
import PaymentMethod from "@/vuex/model/PaymentMethod.ts"
import axios from "axios";
import IdVerification from "@/vuex/model/IdVerification";

export default {
    Account: {
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('member', 'POST', data,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        },
        // 인증코드 전송
        sendVerificationCode: function (type: string, data: any, callback: any) {
            let url;
            let _type;
            if (type === 'signup') {          //회원가입
                url = 'signUpVerification';
                _type = 'POST';
            } else if (type === 'email') {     //이메일 인증코드
                url = 'memberVerification/email';
                _type = 'PUT';
            } else if (type === 'phone') {     //휴대전화 인증코드
                url = 'memberVerification/sms';
                _type = 'PUT';
            } else if (type === 'deposit') {     //출금시 이메일 인증코드
                url = 'deposit/email';
                _type = 'POST';
            }
            AxiosService._requestWithUrlPram(url, _type, data,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        },
        // 인증코드 검증
        checkVerificationCode: function (type: string, data: any, callback: any) {
            let url;
            if (type === 'signup') {          //회원가입
                url = 'signUpVerification';
            } else if (type === 'email') {     //이메일 인증코드
                url = 'memberVerification/email/status'
            } else if (type === 'phone') {     //휴대전화 인증코드
                url = 'memberVerification/sms/status'
            } else if (type === 'deposit') {     //출금시 이메일 인증코드
                url = 'deposit/email'
            }
            AxiosService._requestWithUrlPram(url, 'PUT', data,
                function (data: any) {
                    callback(data)
                },
                function () {
                })
        },
        // 로그인 체크
        checkLogin: function (success: any, failure: any) {
            axios({
                method: 'GET',
                url: AxiosService.getRootUrlWithApi() + 'member/my',
                data: '',
                headers: {
                    'Content-Type': 'application/json',
                }

            })
                .then((response) => {
                    if (response.data.code === 0) {
                        success(response.data.result);
                    }
                })
                .catch((error) => {
                    failure()
                }).then(() => {
            })
        },
        // 유저 정보 get
        getUserInfo: function (callback: any) {
            AxiosService._requestWithBody('member/my', 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        // 다른 유저 정보 get
        getOtherUsersInfo: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/them/byEmail', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        getOtherUsersInfobyMemberNo: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/them/byMemberNo', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        //유저 로그인 상태
        isUserActive: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('isUserActive', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        //닉네임, 거래 비밀번호 설정
        setNickName: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/nickandtrade', 'PUT', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        //결제수단 설정
        addPaymentMethod: function (email: string, paymentMethod: PaymentMethod, callback: any) {
            let url = 'payment/';
            url += paymentMethod.type;

            AxiosService._requestWithBodyAndEmail(url, 'POST', paymentMethod,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },

        //패스워드 변경
        changePassword: function (data: any, callback: any) {
            AxiosService._requestWithBody('member/password', 'PUT', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        }
    },
    Verification: {
        // 유저인증정보
        memberVerification: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('memberVerification', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        // 유저 신분증/여권 인증 정보
        idVerification: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('idverification', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        // 유저 신분증/여권 인증 정보 POST
        postIdVerification: function (email: string, _idverification: IdVerification, callback: any) {
            AxiosService._requestWithBodyAndEmail('idverification', 'POST', _idverification,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        }
    },
    PaymentMethod: {
        // 유저 결제수단 정보
        getPaymentMethod: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('payment', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        setPaymentMethod: function (data : any, callback: any) {
            AxiosService._requestWithUrlPram('payment', 'GET', data,
                function (data) {
                    callback(data);
                    return;
                },
                function () {
                })
        }
    },
    BlockList: {
        //유저 차단 리스트 정보
        getBlockList: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/block', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        postBlockUser: function (data: any, callback: any) {
            AxiosService._requestWithBodyAndEmail('member/block', 'POST', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
        deleteBlockUser: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/block', 'DELETE', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        },
    },
    LoginHistory: {
        //유저 로그인 기록
        getLoginHistory: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('login/history', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () {
                })
        }
    },
    SecuritySettings: {
        //유저 보안 설정 변경 기록
        getSecuritySettings: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('security/history', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function () { })
        }
    }
}

