import Vue from 'vue'

export default {
    signupCountries() {
        const signupCountries = [
            {value: Vue.prototype.$str('china'), code: 'CN'},
            {value: Vue.prototype.$str('singapore'), code: 'SG'},
            {value: Vue.prototype.$str('india'), code: 'IN'},
            {value: Vue.prototype.$str('vietnam'), code: 'VN'},
            {value: Vue.prototype.$str('canada'), code: 'CA'},
            {value: Vue.prototype.$str('australia'), code: 'AU'},
            {value: Vue.prototype.$str('korea'), code: 'KR'},
            {value: Vue.prototype.$str('switzerland'), code: 'CH'},
            {value: Vue.prototype.$str('netherlands'), code: 'NL'},
            {value: Vue.prototype.$str('taiwan'), code: 'TW'},
            {value: Vue.prototype.$str('russia'), code: 'RU'},
            {value: Vue.prototype.$str('uk'), code: 'UK'},
            {value: Vue.prototype.$str('hongkong'), code: 'HK'},
            {value: Vue.prototype.$str('nigeria'), code: 'NG'},
            {value: Vue.prototype.$str('indonesia'), code: 'ID'},
            {value: Vue.prototype.$str('philippines'), code: 'PH'},
            {value: Vue.prototype.$str('cambodia'), code: 'KH'}
        ];
        return signupCountries;
    },
    countries() {
        const countries = [
            {value: Vue.prototype.$str('allCountries'), code: 'ALL'},
            {value: Vue.prototype.$str('china'), code: 'CN'},
            {value: Vue.prototype.$str('singapore'), code: 'SG'},
            {value: Vue.prototype.$str('india'), code: 'IN'},
            {value: Vue.prototype.$str('vietnam'), code: 'VN'},
            {value: Vue.prototype.$str('canada'), code: 'CA'},
            {value: Vue.prototype.$str('australia'), code: 'AU'},
            {value: Vue.prototype.$str('korea'), code: 'KR'},
            {value: Vue.prototype.$str('switzerland'), code: 'CH'},
            {value: Vue.prototype.$str('netherlands'), code: 'NL'},
            {value: Vue.prototype.$str('taiwan'), code: 'TW'},
            {value: Vue.prototype.$str('russia'), code: 'RU'},
            {value: Vue.prototype.$str('uk'), code: 'UK'},
            {value: Vue.prototype.$str('hongkong'), code: 'HK'},
            {value: Vue.prototype.$str('nigeria'), code: 'NG'},
            {value: Vue.prototype.$str('indonesia'), code: 'ID'},
            {value: Vue.prototype.$str('philippines'), code: 'PH'},
            {value: Vue.prototype.$str('cambodia'), code: 'KH'}
        ];
        return countries;
    },
    currencies() {
        const currencies = [
            {code: 'CNY'},
            {code: 'USD'},
            {code: 'SGD'},
            {code: 'INR'},
            {code: 'VND'},
            {code: 'CAD'},
            //  {code : 'AUD'},
            {code: 'KRW'},
            {code: 'CHF'},
            {code: 'TWD'},
            {code: 'RUB'},
            {code: 'GBP'},
            {code: 'HKD'},
            {code: 'EUR'},
            {code: 'NGN'},
            {code: 'IDR'},
            {code: 'PHP'},
            // {code : 'KHR'},
        ];
        return currencies;
    },
    payments() {
        const payments = [
            {value: Vue.prototype.$str('allPayment'), code: 'ALL'},
            {value: Vue.prototype.$str('bankAccountText'), code: 'bankaccount'},
            {value: Vue.prototype.$str('alipayText'), code: 'alipay'},
            {value: Vue.prototype.$str('wechatPayText'), code: 'wechat'},
        ];
        return payments;
    },
    phones() {
        const phones =[
            // {code : '0086', nation : 'China'},
            // {code : '00852', nation : 'Hong Kong(China)'},
            // {code : '00886', nation : 'Taiwan(China)'},
            // {code : '0081', nation : 'Japan'},
            // {code : '0082', nation : 'Korea'},
            // {code : '0044', nation : 'United Kingdom'},

            {code: '+86', value: Vue.prototype.$str('china')},
            {code: '+852', value: Vue.prototype.$str('hongkong')},
            {code: '+886', value: Vue.prototype.$str('taiwan')},
            {code: '+82', value: Vue.prototype.$str('korea')},
            {code: '+44', value: Vue.prototype.$str('uk')},
        ];
        return phones;
    }
}