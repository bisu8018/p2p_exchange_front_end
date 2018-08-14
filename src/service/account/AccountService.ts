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
        sendVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('signUpVerification', 'POST', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 인증코드 검증
        checkVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('signUpVerification', 'PUT', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 유져 정보 get
        getUserInfo: function (callback: any) {
            AxiosService._requestWithBody('member/my', 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        getOtherUsersInfo: function (data: any, callback: any){
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
        getLoginHistory: function (data:any, callback:any) {
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
        getSecuritySettings: function (data:any, callback:any) {
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

