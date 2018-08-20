import axios from 'axios'
import qs from 'qs';
import Vue from "vue";
import MainRepository from "@/vuex/MainRepository";

export default {
    init: function () {
    },
    getRootUrl: function () {
        /*  if (window.location.hostname == 'localhost') {
            return window.location.protocol + '//' + 'localhost' + ':' + '8080' //window.location.port
          } else {
            return window.location.protocol + '//' + window.location.hostname
          }*/
        return '';
    },
    getRootUrlWithApi: function () {
        return this.getRootUrl() + '/api/'
    },
    DEBUG: function () {
        return false
    },
    _request: function (url: string, type: string, data: any, success: any, failure: any) {
        let self = this;
        if (this.DEBUG()) {
            console.log('[request]\nurl: ' + url + '\ndata: ' + data)
        }

        axios({
            method: type,
            url: this.getRootUrlWithApi() + url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (this.DEBUG()) {
                    console.log('성공\nurl: ' + url + '\nres:\n' + JSON.stringify(response.data))
                }
                if (response.data.code === 0) {
                    success(response.data.result);
                }
                //Vue.prototype.$eventBus.$emit('showAlert', response.data.code);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                    let status = error.response.status;
                    let headers = error.response.headers;
                    let data = error.response.data;
                    let statusText = error.response.statusText;

                    if (this.DEBUG()) {
                        //console.log(headers);
                        //console.log(data);
                        //console.log(status)
                        //위에 세개 일단 주석처리 jack
                        //  console.log(statusText)
                        //  console.log('Error!\ncode:' + request.status + '\n' + 'message:' + request.responseText + '\n' + 'error:' + error)
                    }
                    //  console.log('Status: ' + status);
                    // 401 Error
                    if (status === 401 || status === 502) {
                        // Vue.prototype.$eventBus.$emit('goLogin', status)
                        //Vue.$router.push("/login");
                        //Vue.prototype.$eventBus.$emit('showAlert', status);
                        window.location.replace(self.getRootUrl() + '/login')
                    } else {
                        failure()
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error)
                }

                console.log(error)
            }).then(() => {
            // always executed
        })
    },
    _requestWithUrlPram: function (url: string, type: string, data: any, success: any, failure: any) {
        data = data || {};
        let prams = qs.stringify(data);

        this._request(
            url + '?' + prams,
            type,
            '',
            success,
            failure
        )
    },
    _requestWithPath: function (url: string, type: string, data: any, success: any, failure: any) {

        data = data || {};
        let path =  {email : MainRepository.Login.getUserInfo().email};
        let param = qs.stringify(path);
        let _url = url + '?' + param;
        this._request(
            _url,
            type,
            JSON.stringify(data),
            success,
            failure
        )
    },
    _requestWithBodyAndEmail: function (url: string, type: string, data: any, success: any, failure: any) {
        data = data || {};
        let path =  {email : MainRepository.Login.getUserInfo().email};
        let param = qs.stringify(path);
        let _url = url + '?' + param;
        this._request(
            _url,
            type,
            JSON.stringify(data),
            success,
            failure
        )
    },
    _requestWithBody: function (url: string, type: string, data: any, success: any, failure: any) {
        data = data || {};

        this._request(
            url,
            type,
            JSON.stringify(data),
            success,
            failure
        )
    },


    // Error 처리 -> 참고 정도만 할것
    // getErrorMessage: function (responseText: any): ErrorModel {
    //   let code = responseText.code;
    //   let serverMessage = responseText.message;
    //   let text = '';
    //   let action = function () {
    //
    //   };
    //   let rootUrl = this.getRootUrl();
    //
    //   switch (Number(code)) {
    //     case 401:
    //       text = '장기간 미접속으로 세션이 만료되었습니다. 다시 로그인해주세요.';
    //       action = function () {
    //         window.location.replace(rootUrl + '/home')
    //       };
    //       break;
    //     default:
    //       text = serverMessage;
    //       break
    //   }
    //
    //   return new ErrorModel(
    //     code, text,
    //     text,
    //     // + '  - ErrorCode(' + code + ')',
    //     action
    //   )
    // },
    // showErrorPopup: function (ErrorModel: ErrorModel) {
    //
    //   if(ErrorModel.code === 9008){
    //     MainRepository.getRouterController().goReferral(ErrorModel.message);
    //   } else {
    //     showOneBtnDialog(ErrorModel.message, 'CLOSE', true,function () {
    //       ErrorModel.action()
    //     });
    //   }
    // },
}

