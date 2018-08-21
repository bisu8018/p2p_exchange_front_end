import AxiosService from "@/service/AxiosService";


export default {

    findPasswd: function (email: string, password: string, callback: any) {
        let userDummy = {
            userId: 1,
            userName: 'hi',
        }

        callback(userDummy);
        return;

    },


    User: {
        login: function (data: any, callback: any){
          AxiosService._requestWithBody('login','POST',data,
              function (data: any) {
              callback(data);
              },
              function () {
              })
        },
        getUser: function (callback: any) {
            AxiosService._request('user/myInfo', 'GET', '',
                function (data: any) {
                },
                function () {
                })
        },

        updateUser: function (data: any, callback: any) {
            AxiosService._requestWithBody('user', 'PUT', data,
                function (data: any) {
                },
                function () {
                })
        },
    },

}
