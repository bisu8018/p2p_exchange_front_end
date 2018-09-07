export default class WalletHistory {
    cryptocurrency : string;
    registerDatetime : number;
    amount : number;
    status : string;
    addressTo : string
    addressFrom : string
    depositType : string;
    txHash : string;
    fee : number;
    processingTime : number


    constructor(data: any) {
        this.cryptocurrency = this.transCryptocurrency(data.cryptocurrency)  || '';
        this.registerDatetime = data.registerDatetime || '';
        this.amount = data.amount || '';
        this.status = this.transStatus(data.status) || '';
        this.addressTo = data.addressTo || '';
        this.addressFrom = data.addressFrom || '';
        this.depositType = data.depositType || '';
        this.txHash = data.txHash || '';
        this.fee = data.fee || '';
        this.processingTime = data.processingTime || '';
    }

    isNull(): boolean {
        return (this.status === undefined || this.status === '')
    }

    //cryptocurrency 재가공
    transCryptocurrency(cryptocurrency){
        switch (cryptocurrency) {
            case 'bitcoin':
                return 'BTC'

            case 'ethereum':
                return 'ETH'
        }
    }

    transStatus(status){
        switch (status) {
            case 'underExamination':
                return 'Under examination'

            case 'completed':
                return 'Completed'
        }
    }
}