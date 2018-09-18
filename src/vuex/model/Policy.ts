import Vue from 'vue'

// 최대한 value, code 규칙 지켜서 값 넣을것


export default {
    officialMinLimit () {
        const officialMinLimit = [
            {currency: 'CNY', minLimit: 100},
            {currency: 'USD', minLimit: 15},
            {currency: 'SGD', minLimit: 20},
            {currency: 'INR', minLimit: 1000},
            {currency: 'VND', minLimit: 350000},
            {currency: 'CAD', minLimit: 20},
            {currency: 'CNY', minLimit: 20},
            {currency: 'KRW', minLimit: 15000},
            {currency: 'CHF', minLimit: 15},
            {currency: 'TWD', minLimit: 500},
            {currency: 'RUB', minLimit: 1000},
            {currency: 'GBP', minLimit: 10},
            {currency: 'HKD', minLimit: 100},
            {currency: 'EUR', minLimit: 10},
            {currency: 'NGN', minLimit: 5000},
            {currency: 'IDR', minLimit: 200000},
            {currency: 'PHP', minLimit: 1000},
            {currency: 'KHR', minLimit: 60000},
        ]

        return officialMinLimit;
    }
}