import Vue from "vue";
import {abUtils} from '@/common/utils';

export default class FilterChips {
    searchStartTime: any;
    searchEndTime: any;
    status: string;
    orderNo: any;
    adsNo: any;
    cryptocurrencyType: string;
    cryptocurrency: string;
    tokenNo: any;
    orderType: string;
    walletType: string;
    adsType: string;
    tradeType: string;
    currency: string;

    constructor (data: any) {
        this.searchStartTime = data.searchStartTime ||'';
        this.searchEndTime = data.searchEndTime ||'';
        this.status = data.status || '';
        this.orderNo = data.orderNo || '';
        this.adsNo = data.adsNo || '';
        this.cryptocurrencyType = data.cryptocurrencyType || '';
        this.cryptocurrency = data.cryptocurrency  || '';
        this.tokenNo = data.tokenNo  || '';
        this.tradeType = data.tradeType || '';
        this.orderType = data.orderType || '';
        this.walletType = data.walletType || '';
        this.adsType = data.adsType || '';
        this.currency = data.currency || '';
    }

    update (data: any){
        if(data.searchStartTime !==undefined && data.searchStartTime !==null) this.searchStartTime = this.checkStartDate(data.searchStartTime);
        if(data.searchEndTime !==undefined && data.searchEndTime !==null) this.searchEndTime = this.checkEndDate(data.searchEndTime);
        if(data.status !==undefined && data.status !==null) this.status = data.status;
        if(data.orderNo !==undefined && data.orderNo !==null) this.orderNo = data.orderNo;
        if(data.adsNo !==undefined && data.adsNo !==null) this.adsNo = data.adsNo;
        if(data.cryptocurrencyType !==undefined && data.cryptocurrencyType !==null) this.cryptocurrencyType = data.cryptocurrencyType;
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = data.cryptocurrency;
        if(data.tokenNo !==undefined && data.tokenNo !==null) this.tokenNo = data.tokenNo;
        if(data.tradeType !==undefined && data.tradeType !==null) this.tradeType = data.tradeType;
        if(data.orderType !==undefined && data.orderType !==null) this.orderType = data.orderType;
        if(data.walletType !==undefined && data.walletType !==null) this.walletType = data.walletType;
        if(data.adsType !==undefined && data.adsType !==null) this.adsType = data.adsType;
        if(data.currency !==undefined && data.currency !==null) this.currency = data.currency;
    }

    clear() {
        this.searchStartTime = '';
        this.searchEndTime = '';
        this.status = "";
        this.orderNo = '';
        this.cryptocurrencyType = "";
        this.cryptocurrency = "";
        this.tokenNo = '';
        this.orderType = "";
        this.walletType = "";
        this.adsType = "";
        this.tradeType = "";
        this.currency = "";
    }

    checkStartDate(startDate){
        let today = abUtils.getDateTime();
        if(today < startDate){
            Vue.prototype.$eventBus.$emit('showAlert', 4016);
            Vue.prototype.$eventBus.$emit('clearStartDate');
            return '';
        }
        else{
            return startDate;
        }
    }

    checkEndDate(endDate){
        if(this.searchStartTime > endDate){
            Vue.prototype.$eventBus.$emit('showAlert', 4014);
            Vue.prototype.$eventBus.$emit('clearEndDate');
            return '';
        }
        else{
            return endDate;
        }
    }
}



