import Vue from 'vue'

// 최대한 value, code 규칙 지켜서 값 넣을것


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
    status() {
      const status =[
          {value: Vue.prototype.$str("unpaid"), code: 'unpaid'},
          {value: Vue.prototype.$str("paid"), code: 'paid'},
          {value: Vue.prototype.$str("canceled"), code: 'cancelled'},
          {value: Vue.prototype.$str("complete"), code: 'complete'},
          {value: Vue.prototype.$str("complaining"), code: 'complaining'},
      ]  ;
        return status;
    },
    orderTypes() {
        const orderTypes =[
            {value: Vue.prototype.$str("general"), code: 'general'},
            {value: Vue.prototype.$str("block"), code: 'block'},
        ];
        return orderTypes;
    },
    adsTypes() {
        const adsTypes =[
            {value: Vue.prototype.$str("general"), code: 'general'},
            {value: Vue.prototype.$str("block"), code: 'block'},
        ];
        return adsTypes;
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
            {code: 'CNY', value: 'CNY'},
            {code: 'USD', value: 'USD'},
            {code: 'SGD', value: 'SGD'},
            {code: 'INR', value: 'INR'},
            {code: 'VND', value: 'VND'},
            {code: 'CAD', value: 'CAD'},
            //  {code : 'AUD'},
            {code: 'KRW', value: 'KRW'},
            {code: 'CHF', value: 'CHF'},
            {code: 'TWD', value: 'TWD'},
            {code: 'RUB', value: 'RUB'},
            {code: 'GBP', value: 'GBP'},
            {code: 'HKD', value: 'HKD'},
            {code: 'EUR', value: 'EUR'},
            {code: 'NGN', value: 'NGN'},
            {code: 'IDR', value: 'IDR'},
            {code: 'PHP', value: 'PHP'},
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
        const phones = [
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
    },
    tradeTypes() {
        const tradeTypes = [
            {code: 'buy', value: Vue.prototype.$str('buyText')},
            {code: 'sell', value: Vue.prototype.$str('sellText')},
        ];
        return tradeTypes;
    },
    cryptocurrencyTypes() {
        const cryptocurrencyTypes = [
            {code: 'general', value: Vue.prototype.$str('General Coin')},
            {code: 'custom', value: Vue.prototype.$str('Custom Token')},
        ];
        return cryptocurrencyTypes;
    },
    priceTypes() {
        const priceTypes = [
            {code: 'fixedprice', value: Vue.prototype.$str('fixedPrice')},
            {code: 'floatprice', value: Vue.prototype.$str('floatPrice')},
        ];
        return priceTypes;
    },




    findValue(type,data){
        let value;
        let list = this.getList(type) || [];
        value = list.find(function (element) {
            if( data === element.code){
                return element.value;
            }
        });
        return value.value;
    },
    getList(type) {
        switch (type) {
            case 'country' :
                return this.countries();

            case 'signupCountry' :
                return this.signupCountries();

            case 'currency' :
                return this.currencies();

            case 'payment' :
                return this.payments();

            case 'phone' :
                return this.phones();

            case 'tradeType' :
                return this.tradeTypes();

            case 'cryptocurrencyType' :
                return this.cryptocurrencyTypes();

            case 'priceType' :
                return this.priceTypes();

            case 'status' :
                return this.status();

            case 'orderType' :
                return this.orderTypes()

            case 'adsType' :
                return this.adsTypes();
        }
    },
}