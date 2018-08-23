import PaymentMethod from './PaymentMethod';
import MsgAvatar from "@/vuex/model/MsgAvatar";

export default class Order {
    adNo : number;
    unreadMessageCount : number;
    amount : number;
    coinCount : number;
    cryptocurrency: string;
    currency : string;
    customerMemberNo : number;
    fileContent: string;
    memberNo: string;
    merchantMemberNo : number;
    orderNo: number;
    paymentMethods : string;
    filteredPaymentMethod : PaymentMethod[];
    paymentWindow : string;
    price : number;
    referenceNo : number;
    registerDatetime : object;
    status : string;
    tradeType : string;
    merchantEmail : string;
    customerEmail : string;
    merchantNickname : string;
    customerNickname : string;
    appealList : object;
    counterParty : MsgAvatar;

    constructor (data: any) {
        this.orderNo = Number(data.orderNo) || 0;
        this.unreadMessageCount = Number(data.unreadMessageCount);
        this.referenceNo = Number(data.referenceNo) || 0;
        this.adNo = Number(data.adNo) || 0;
        this.cryptocurrency = this.transCryptocurrency(data.cryptocurrency);
        this.fileContent = data.fileContent;
        this.merchantMemberNo = Number(data.merchantMemberNo) || 0;
        this.customerMemberNo = Number(data.customerMemberNo) || 0;
        this.currency = data.currency;
        this.status = data.status || '';
        this.price = Number(data.price) || 0;
        this.coinCount = Number(data.coinCount) || 0;
        this.amount = Number(data.amount) || 0;
        this.memberNo = data.memberNo;
        this.paymentMethods = data.paymentMethods || '';
        this.filteredPaymentMethod = [];
        for(let key in data.filteredPaymentMethod) {
            this.filteredPaymentMethod.push(new PaymentMethod(data.filteredPaymentMethod[key]));
        }
        this.paymentWindow = data.paymentWindow || '';
        this.registerDatetime = data.registerDatetime || '';
        this.tradeType = data.tradeType || '';
        this.merchantEmail = data.merchantEmail || '';
        this.customerEmail = data.customerEmail || '';
        this.merchantNickname = data.merchantNickname || '';
        this.customerNickname = data.customerNickname || '';
        this.appealList = data.appealList || '';
        this.counterParty = data.counterParty || new MsgAvatar('');
    };


    update (data: any){ console.log(data);
        if(data.status !== undefined && data.status !== null) this.status = data.status;
        console.log(data);
    }

    transCryptocurrency(cryptocurrency){
        switch (cryptocurrency) {
            case 'bitcoin':
            case 'BTC':
                return 'BTC';
            case 'ethereum':
            case 'ETH':
                return 'ETH';
            default:
                return 'ALLB';
        }
    }
}




