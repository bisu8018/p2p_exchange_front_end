<template>
    <v-layout wrap align-center>
        <div  class="p-relative selectbox-width" >
            <select v-if="selectBoxType === 'country' "  v-model="selectedCountry" @change="setCountry('normal')" class="o-none comp-selectbox h6">
                <option v-for="country in countries" class="o-none " v-bind:value="country.code" >{{country.country}}</option>
            </select>
            <select v-if="selectBoxType === 'signupCountry' "  v-model="selectedCountry_signup" @change="setCountry('signup')" class="o-none comp-selectbox h6">
                <option v-for="country in signupCountries" class="o-none " v-bind:value="country.code" >{{country.country}}</option>
            </select>
            <select v-else-if="selectBoxType === 'currency'"  v-model="selectedCurrency" @change="setCurrency" class="o-none comp-selectbox h6">
                <option v-for="currency in currencies" class="o-none " v-bind:value="currency.currency" >{{currency.currency}}</option>
            </select>
            <select v-else-if="selectBoxType === 'payment'"  v-model="selectedPayment" @change="setPayment" class="o-none comp-selectbox h6">
                <option v-for="payment in payments" class="o-none " v-bind:value="payment.code" >{{payment.payment}}</option>
            </select>
            <select v-else-if="selectBoxType === 'phone'"  v-model="selectedPhone" @change="setPhone" class="o-none comp-selectbox h6">
                <option v-for="phone in phones" class="o-none " v-bind:value="phone.code" >{{phone.code}}</option>
            </select>
            <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
        </div>
    </v-layout>
</template>
<script>
    import MainRepository from "@/vuex/MainRepository";
    export default {
        name: 'selectBox',
        props : {
            'selectBoxType' : {type:String, default:'country'}
        },      //country, currency, payment, phone
        data: () => ({
            selectedCountry: 'ALL',
            selectedCountry_signup: 'CN',
            selectedCurrency: 'CNY',
            selectedPayment: 'ALL',
            selectedPhone: '0086',
            signupCountries: [
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
            phones : [
                {code : '0086', nation : 'China'},
                {code : '00852', nation : 'Hong Kong(China)'},
                {code : '00886', nation : 'Taiwan(China)'},
                {code : '0081', nation : 'Japan'},
                {code : '0082', nation : 'Korea'},
                {code : '0044', nation : 'United Kingdom'},
            ]
        }),
        methods: {
            setCountry(type) {
                if(type === 'normal'){
                    MainRepository.SelectBox.controller().setCountry(this.selectedCountry);
                }else{
                    MainRepository.SelectBox.controller().setCountry(this.selectedCountry_signup);
                    this.$emit('country',this.selectedCountry_signup);
                }
                //console.log("selectedCountry: " + this.selectedCountry);
                //console.log("setCountry:" + MainRepository.SelectBox.controller().setCountry(this.selectedCountry));
            }, setCurrency() {
                //console.log("selectedCurrency: " + this.selectedCurrency);
                MainRepository.SelectBox.controller().setCurrency(this.selectedCurrency);
                this.$emit('currency',this.selectedCurrency);
                //console.log("setCurrency:" + MainRepository.SelectBox.controller().setCurrency(this.selectedCurrency));
            }, setPayment() {
                //console.log("selectedPayment:" + this.selectedPayment)
                MainRepository.SelectBox.controller().setPayment(this.selectedPayment);
                console.log("setPayment:" + MainRepository.SelectBox.controller().setPayment(this.selectedPayment));
            }, setPhone() {
                this.$emit('number',this.selectedPhone);

            }
        }
    }
</script>
<style >
    /*특정 뷰에서 셀렉박스 길이 설정 필요 시,*/
    /*selectbox-width 클래스 지정 후 사용*/
</style>