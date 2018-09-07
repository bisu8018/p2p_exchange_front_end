import {CurrencyType} from "@/vuex/model/CurrencyType";
import MainRepository from "@/vuex/MainRepository";

export default class Balance {
    ownerMemberNo: number;
    cryptoCurrency : string;
    depositType: string;
    ownerEmail : string;
    availableAmount : number;
    frozenAmount : number;
    walletAddress : string;
    btcAmount: number;

    constructor (data: any) {
        this.ownerMemberNo = 0;
        if (data.ownerMemberNo !== undefined) {
            this.ownerMemberNo = Number(data.ownerMemberNo);
        }
        this.cryptoCurrency = data.cryptoCurrency || '';
        this.depositType = data.depositType || '';
        this.ownerEmail = data.ownerEmail || '';
        this.availableAmount = Number(data.availableAmount) || 0;
        this.frozenAmount = Number(data.frozenAmount) || 0;
        this.walletAddress = data.walletAddress || '';
        this.btcAmount = data.btcAmount || 0;
    }

    calcTo(currency: CurrencyType): number {
        // 수량 * currency 가격
        return MainRepository.MarketPrice.controller().findPriceByCurrency(currency) * this.btcAmount;
    }

    isNull (): boolean {
        return (this.ownerMemberNo === undefined)
    }
}


