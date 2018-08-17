export default class MarketPrice {
    exchange: string;
    cryptocurrency: string;
    currency: string;
    price: number;

  constructor (data: any) {
    this.exchange = data.exchange;
    this.cryptocurrency = data.cryptocurrency;
    this.currency = data.currency;
    this.price = data.nationality;
  }

  isNull (): boolean {
    return (this.exchange === undefined || this.exchange === '') || (this.price === undefined)
  }
}