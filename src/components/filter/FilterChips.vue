<template>
    <div class="mr-5 chip-wrapper d-inline-block">
        <h6 class="statusChip" :class="{'d-none-important' : flag && index === 'searchStartTime' || index === 'tokenNo' || index === 'cryptocurrency'}" v-if="data !== ''" v-for="(data,index) in chipData">
            <v-layout align-center row fill-height>
                {{ showDateChip(index,data) }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete(index)">close</i>
            </v-layout>
        </h6>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../vuex/MainRepository";

    export default Vue.extend({
        name: "filter-chips",
        props: ['chipData'],
        data() {
          return {
              cryptocurrency : "",
              searchStartTime: "",
              searchEndTime: "",
              flag: false,
          }
        },
        methods: {
            // 칩 x버튼 눌렀을 시 삭제
            chipDelete(index) {
                let _data = {};
                _data[index] = '';

                if(index === 'searchEndTime'){          //end date 초기화 시, start date 함께 초기화
                    _data['searchStartTime'] = '';
                }else if(index === 'cryptocurrencyType'){
                    _data['cryptocurrency'] = '';
                    _data['tokenNo'] = '';
                }

                this.$emit('delete',_data);
            },
            showDateChip(index,data) {
                switch (index) {
                    case 'searchStartTime':
                        this.searchStartTime = data;
                        if(this.searchEndTime === ''){
                            return this.searchStartTime + " ~ ";
                            this.flag = false;
                        }else{
                            this.flag = true;
                        }
                        break;

                    case 'searchEndTime':
                        this.searchEndTime = data;
                        return this.searchStartTime + " ~ " + this.searchEndTime;

                    case 'cryptocurrency':
                        if(data === 'custom'){
                            data = MainRepository.CustomToken.controller().findCustomToken(this.chipData.tokenNo,'no').tokenName;
                        }
                        this.cryptocurrency = data;
                        break;

                    case 'cryptocurrencyType':
                        if(data === 'custom'){
                            data = 'Custom Token';
                        }else if(data === 'general'){
                            data = 'General Coin';
                        }
                        return  Vue.prototype.$str(data) + (this.cryptocurrency !== '' ?  " : " + this.cryptocurrency : '') ;

                    case 'status':
                    case 'orderType':
                    case 'adsType':
                    case 'tradeType':
                    case 'orderNo':
                    case 'adsNo':
                    case 'currency':
                        return  data ;
                }
            },
        }

    });
</script>

<style scoped>
    .close-icons {
        margin-top: 2px;
        cursor: pointer;
    }

    .chip-wrapper {
        padding-top: 6px;
    }

    .statusChip {
        height: 26px;
        border-radius: 2px;
        background-color: #9294a6;
        padding: 4px 8px 4px 8px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 6px;
        cursor: pointer;
    }

    .statusChip:hover {
        opacity: 0.8;
    }



</style>