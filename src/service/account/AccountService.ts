import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    Account: {
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('member', 'POST', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 인증코드 전송
        sendVerificationCode: function (type: string, data: any, callback: any) {
            let url;
            if (type === 'signup') {          //회원가입
                url = 'signUpVerification';
            } else if (type === 'email') {     //이메일 인증코드
                url = 'memberVerificaion/email'
            } else if (type === 'phone') {     //휴대전화 인증코드
                url = 'memberVerificaion/sms'
            }
            AxiosService._requestWithUrlPram(url, 'POST', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 인증코드 검증
        checkVerificationCode: function (type: string, data: any, callback: any) {
            let url;
            if (type === 'signup') {          //회원가입
                url = 'signUpVerification';
            } else if (type === 'email') {     //이메일 인증코드
                url = 'memberVerificaion/email/status'
            } else if (type === 'phone') {     //휴대전화 인증코드
                url = 'memberVerificaion/sms/status'
            }
            AxiosService._requestWithUrlPram(url, 'PUT', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 유저 정보 get
        getUserInfo: function (callback: any) {
            AxiosService._requestWithBody('member/my', 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 다른 유저 정보 get
        getOtherUsersInfo: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/them', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        //유저 로그인 상태
        isUserActive: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('isUserActive', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        //닉네임, 거래 비밀번호 설정
        setNickName: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/nickandtrade', 'PUT', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        //결제수단 설정
        addPaymentMethod: function (type: string, data: any, callback: any) {
            let url = 'payment/';
            url += type;

            AxiosService._requestWithUrlPram(url, 'POST', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        //패스워드 변경
        changePassword: function (data: any, callback: any) {
            AxiosService._requestWithBody('member/password', 'PUT', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
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
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 유저 신분증/여권 인증 정보
        idVerification: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('idverification', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
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
                function (error) {
                    console.log("ERROR :::::::  " + error);
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
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    },
    LoginHistory: {
        //유저 로그인 기록
        getLoginHistory: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('login/history', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
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
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    }
}

