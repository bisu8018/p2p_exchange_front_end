
export default class GeneralToken {
    tokenNo : number;
    tokenName: string;

    constructor (data: any) {
        this.tokenNo = data.tokenNo || '';
        this.tokenName = data.tokenName ?  this.transCryptocurrency(data.tokenName) : '';
    }

    isNull (): boolean {
        return (this.tokenNo === undefined)
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
                return 'AllB';
        }
    }
}


