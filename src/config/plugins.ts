import Vuetify from 'vuetify'
import '../../node_modules/vuetify/dist/vuetify.min.css'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {abString} from "@/config/localization";
import {CurrencyType} from "@/vuex/model/CurrencyType";
import Clipboard from 'v-clipboard'


export default (Vue: any) => {
    Vue.use(Vuex);
    Vue.use(VueRouter);

    Vue.use(Clipboard);

    // Design Plugin
    Vue.use(Vuetify, {
        theme: {
            primary: '#42b6f6',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
            //COMMON COLOR
            BGNav : '#002970',
            white: '#ffffff',


            TextGray : '#C8C8C8',
            TextBlue : '#214EA1',
            TextPointBlue : '#316EE4',
            TextHover : '#316EE4',
            TextPrice : '#E25422',
            TextError : '#BF2324',
            TextWarning : '#F9A825',
            TextSuccess : '#71AA3A',

            Avartar1 : '#8869CA',
            Avartar2 : '#E05543',
            Avartar3 : '#E25422',
            Avartar4 : '#2799C9',
            Avartar5 : '#B0D63E',
            Avartar6 : '#394B50',
            Avartar7 : '#BF4F79',
            AvartarOnline : '#59D817',
            AvartarOffline : '#C8C8C8',
            Button : '#214EA1',
            ButtonSelect : '#316EE4',
            ButtonHover : '#316EE4',
            ChipGray : '#9294A6',
            OutlineGray : '#8D8D8D',
            OutlineBlue : '#316EE4',
            OutlineRed : '#BF2324',
            OutlineYellow : '#F9A825',
            OutlineGreen : '#71AA3A',
            LineGray : '#D1D1D1',
            FormGray : '#F8F8FA',
            SwitchBlue : '#316EE4',
            SwitchGray : '#C8C8C8',
            green: '#00ce7d',
            wbGreen: '#00ce7d',
            sky: '#42b6f6',
            deepSky: '#0098ed',
            WbRed: '#ff585c',
            WbYellow: '#ffaf26',
            kakaoYellow: '#ffea00',
            darkNavy: '#163354',
            deepNavy: '#122b47',
            navy: '#192b41',
            lightGray: '#f3f8ff',
            wbPurple: '#9190ef',
        }
    })
    // Localization
    Vue.prototype.$str = function (key: string) {
        return abString(key);
    }

    Vue.prototype.$fixed = function (value: number, currency: string) {
        let fixedDigits = 0;

        if (String(value).indexOf(".")==-1) { return value }

        switch (currency) {
            case CurrencyType.CNY: fixedDigits = 0; break;
            case CurrencyType.KRW: fixedDigits = 0; break;
            case CurrencyType.USD: fixedDigits = 3; break;
            case CurrencyType.CAD: fixedDigits = 3; break;
            case CurrencyType.INR: fixedDigits = 3; break;
            case CurrencyType.SGD: fixedDigits = 3; break;
            case 'BTC' :
            case 'bitcoin': fixedDigits = 8; break;
            case 'ETH' :
            case 'ethereum': fixedDigits = 6; break;
        }
        let fixedValue = String(Math.floor(value*Math.pow(10, fixedDigits))/Math.pow(10, fixedDigits));
        fixedValue = fixedValue.replace(/(0+$)/, "");
        return fixedValue;
    }
}