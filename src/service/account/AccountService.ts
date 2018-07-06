import AxiosService from "@/service/AxiosService";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';


export default {
    Account: {
        login: function (data: any, callback: any) {
            AxiosService._requestWithBody('/signin', 'POST', data,
                function (data: any) {
                },
                function () {
                })
        },
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('/signup', 'POST', data,
                function (data: any) {
                },
                function () {
                })
        }
    }
}

