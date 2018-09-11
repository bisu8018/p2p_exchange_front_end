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
        if(data.type !==undefined && data.type !==null) this.cryptocurrencyType = data.cryptocurrencyType;
        if(data.cryptocurrency !==undefined && data.cryptocurrency !==null) this.cryptocurrency = data.cryptocurrency;
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

}