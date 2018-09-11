import AxiosService from "@/service/AxiosService";
import axios from "axios";
import Vue from "vue";
import chatServerInfo from "@/config/urlList";

export default {
    _request: function (url: string, type: string, data: any, callback: any, failure: any) {
        let self = this;
        let root = chatServerInfo.chatServerUrl();

        axios({
            method: type,
            url: root + url,
            data: data,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                callback(response);
            })
            .catch((error) => {
                failure(error);
            })
    },
    getMessage: function (data: any, callback: any) {
        this._request('channels/all/history', 'GET', data,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },
    getMembers: function (data: any, callback: any) {
        this._request('channels/all/members', 'GET', data,
            function (data: any) {
                callback(data.data.result);
            },
            function () {
            })
    },
}

