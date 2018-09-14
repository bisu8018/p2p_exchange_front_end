import {CurrencyType} from "@/vuex/model/CurrencyType";
import MainRepository from "@/vuex/MainRepository";

export default class Wallet {
    ownerMemberNo: number;
    cryptocurrency : string;
    depositType: string;
    ownerEmail : string;
    availableAmount : number;
    frozenAmount : number;
    walletAddress : string;
    btcAmount: number;
    //CustomToken
    registerMemberNo: number;
    modifyMemberNo: number;
    tokenNo: number;
    tokenName: string;
    mainnetYn: boolean;
    symbolImgUrl: string;
    decimalCount: number;



    constructor (data: any) {
        this.ownerMemberNo = 0;
        if (data.ownerMemberNo !== undefined) {
            this.ownerMemberNo = Number(data.ownerMemberNo);
        }
        this.cryptocurrency = data.cryptocurrency || '';
        this.depositType = data.depositType || '';
        this.ownerEmail = data.ownerEmail || '';
        this.availableAmount = Number(data.availableAmount) || 0;
        this.frozenAmount = Number(data.frozenAmount) || 0;
        this.walletAddress = data.walletAddress || '';
        this.btcAmount = data.btcAmount || 0;
        //CustomToken
        this.registerMemberNo = data.registerMemberNo || 0;
        this.modifyMemberNo = data.modifyMemberNo || 0;
        this.tokenNo = data.tokenNo || -1;
        this.tokenName = data.tokenName || '';
        this.mainnetYn = data.mainnetYn;
        this.symbolImgUrl = data.symbolImgUrl;
        this.decimalCount = data.decimalCount;
    }

    calcTo(currency: CurrencyType): number {
        // 수량 * currency 가격
        return MainRepository.MarketPrice.controller().findPriceByCurrency(currency) * this.btcAmount;
    }

    calcCurrencyFromCrypto(currency: CurrencyType): number {
        // 수량 * currency 가격
        return MainRepository.MarketPrice.controller().findPriceByCurrency(currency) * this.availableAmount;
    }

    isNull (): boolean {
        return (this.ownerMemberNo === undefined)
    }
}



