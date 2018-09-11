export default class WalletTransfer {
    cryptocurrencyType : string;
    cryptocurrency: string;
    From : string;
    To: string;
    Volume: string;

    constructor (data: any) {
        this.cryptocurrencyType = data.cryptocurrencyType ||'General Coin';
        this.cryptocurrency = data.cryptocurrency || '';
        this.From = data.From || 'OTC Account';
        this.To = data.To || 'Exchange Account';
        this.Volume = data.Volume || '';
    }
    update(data: any){
        if(data.cryptocurrencyType !==undefined && data.cryptocurrencyType !==null) this.cryptocurrencyType = this.transTokenType(data.cryptocurrencyType);
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = this.transCrptocurrency(data.cryptocurrency);
        if(data.From !==undefined && data.From !==null) this.From = this.setToFrom(data.From);
        if(data.To !==undefined && data.To !==null) this.To = data.To;
        if(data.Volume !==undefined && data.Volume !==null) this.Volume = data.Volume;
    }

    setToFrom(From: any){
        if(From ==='OTC Wallet'){
            this.To = 'Exchange Account';
            return 'OTC Account'
        }
        else{
            this.To = 'OTC Account';
            return 'Exchange Account'
        }
    }
    transCrptocurrency(cryptocurrency){
        switch (cryptocurrency) {
            case 'BTC':
            case 'bitcoin':
                return 'BTC'

            case 'ETH':
            case 'ethereum':
                return 'ETH'

            case 'ALLB':
            case 'allb':

            default:
                return 'ALLB'
        }
    }

    transTokenType(data: any){
        if(data ==='Coin'){
            return 'General Coin'
        }
        else if (data ==='CustomToken'){
            return 'Custom Token'
        }
        else{
            return '';
        }
    }

}