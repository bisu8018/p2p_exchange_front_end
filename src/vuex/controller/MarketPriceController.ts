import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import MarketPrice from "@/vuex/model/MarketPrice";
import {CurrencyType} from "@/vuex/model/CurrencyType";

export default class MarketPriceController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setMarketPriceList(data: MarketPrice[]) {
        this.store.dispatch(VuexTypes.SET_MARKET_PRICE, data);
    }

    getMarketPriceList() {
        return this.store.state.marketPrice.marketPriceList;
    }

    findPriceByCurrency(currency: CurrencyType): number {
        let _model = this.find('bitcoin', currency);
        let _price = 0;

        if (!_model.isNull() && _model.price !== undefined) {
            _price = _model.price;
        }
        return _price;
    }

    find(coin: string, currency: string): MarketPrice {
        let _priceModel = new MarketPrice('');
        for(let key in this.getMarketPriceList()) {
            let item = this.getMarketPriceList()[key];
            if (item.currency === currency &&
                item.cryptocurrency === coin) {
                _priceModel = item;
            }
        }
        return _priceModel
    }
}

