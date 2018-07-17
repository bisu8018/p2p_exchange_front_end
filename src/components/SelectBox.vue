<template>
    <v-layout wrap align-center>
        <v-flex xs12 class="selectbox-wrapper" >
            <select v-if="selectBoxType === 'country'"  v-model="selectedCountry" @change="setCountry" class="abSelectBox caption">
                <option v-for="country in countries" v-bind:value="country.code" >{{country.country}}</option>
            </select>
            <select v-else-if="selectBoxType === 'currency'"  v-model="selectedCurrency" @change="setCurrency" class="abSelectBox caption">
                <option v-for="currency in currencies" v-bind:value="currency.currency" >{{currency.currency}}</option>
            </select>
            <select v-else="selectBoxType === 'payment'"  v-model="selectedPayment" @change="setPayment" class="abSelectBox caption">
                <option v-for="payment in payments" v-bind:value="payment.code" >{{payment.payment}}</option>
            </select>
            <v-icon class="icon-style">keyboard_arrow_down</v-icon>
        </v-flex>
    </v-layout>
</template>
<script>
    import MainRepository from "@/vuex/MainRepository";
    export default {
        name: 'abSelectBox',
        props : {
            'selectBoxType' : {type:String, default:'country'}
        },      //country, currency, payment
        data: () => ({
            selectedCountry: 'ALL',
            selectedCurrency: 'CNY',
            selectedPayment: 'ALL',
            countries: [
                {country: 'All countries', code: 'ALL'},
                {country: 'China', code: 'CN'},
                {country: 'Singapore', code: 'SG'},
                {country: 'India', code: 'IN'},
                {country: 'Vietnam', code: 'VN'},
                {country: 'Canada', code: 'CA'},
                {country: 'Australia', code: 'AU'},
                {country: 'Korea', code: 'KR'},
                {country: 'Switzerland', code: 'CH'},
                {country: 'Netherlands', code: 'NL'},
                {country: 'Taiwan', code: 'TW'},
                {country: 'Russia', code: 'RU'},
                {country: 'United Kingdom', code: 'UK'},
                {country: 'Hong Kong(china)', code: 'HK'},
                {country: 'Nigeria', code: 'NG'},
                {country: 'Indonesia', code: 'ID'},
                {country: 'Philippines', code: 'PH'},
                {country: 'Cambodia', code: 'KH'}
            ],
            currencies : [
                {currency : 'CNY'},
                {currency : 'USD'},
                {currency : 'SGD'},
                {currency : 'INR'},
                {currency : 'VND'},
                {currency : 'CAD'},
                {currency : 'AUD'},
                {currency : 'KRW'},
                {currency : 'CHF'},
                {currency : 'TWD'},
                {currency : 'RUB'},
                {currency : 'GBP'},
                {currency : 'HKD'},
                {currency : 'EUR'},
                {currency : 'NGN'},
                {currency : 'IDR'},
                {currency : 'PHP'},
                {currency : 'KHR'},
            ],
            payments : [
                {payment : 'All Payments', code : 'ALL'},
                {payment : 'Bank Account', code : 'BAC'},
                {payment : 'Alipay', code : 'ALI'},
                {payment : 'Wechat', code : 'WCH'},
            ],
        }),
        methods: {
            setCountry() {
                MainRepository.SelectBox.controller().setCountry(this.selectedCountry);
            }, setCurrency() {
                MainRepository.SelectBox.controller().setCurrency(this.selectedCurrency);
            }, setPayment() {
                MainRepository.SelectBox.controller().setPayment(this.selectedPayment);
            }
        }
    }
</script>
<style>
    .abSelectBox {
        width: 100%;
        height: 40px;
        border-radius: 2px;
        background-color: #ffffff;
        border: solid 1px #8d8d8d;
        color: #9294a6;
        padding-left: 12px;
    }

    .abSelectBox option:checked {
        background: #f8f8fa;
    }




    .selectbox-wrapper{
        position: relative;
    }

    .icon-style {
        position: absolute;
        right: 8px;
        top: 8px;
        pointer-events: none;
    }
</style>