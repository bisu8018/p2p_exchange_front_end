<template>
    <div class="mr-5 chip-wrapper d-inline-block">
        <h6 class="statusChip" v-if="data !== ''" v-for="(data,index) in chipData">
            <v-layout align-center row fill-height>
                {{ showDateChip(index,data) }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete(index)">close</i>
            </v-layout>
        </h6>


        <!--<h6 class="statusChip" v-if="showDateChip">
            <v-layout align-center row fill-height>
                {{ chipData.start_date }} - {{ chipData.end_date }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('date')">close</i>
            </v-layout>
        </h6>
        <h6 class="statusChip" v-if="chipData.orderStatus != ''">
            <v-layout align-center row fill-height>
                {{ $str(chipData.orderStatus) }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderStatus')">close</i>
            </v-layout>
        </h6>
        <h6 class="statusChip" v-if="chipData.orderNo != ''">
            <v-layout align-center row fill-height>
                {{ chipData.orderNo }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderNo')">close</i>
            </v-layout>
        </h6>
        <h6 class="statusChip" v-if="chipData.cryptocurrencyType != ''">
            <v-layout align-center row fill-height>
                {{ $str(chipData.cryptocurrencyType) }}
                <span v-if="cryptocurrency != ''">: {{  chipData.cryptocurrency  }}</span>
                <i class="h5 material-icons ml-2 close-icons c-pointer"
                   @click="chipDelete('cryptocurrencyType')">close</i>
            </v-layout>
        </h6>
        <h6 class="statusChip" v-if="chipData.orderType != ''">
            <v-layout align-center row fill-height>
                {{ $str(chipData.orderType) }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('orderType')">close</i>
            </v-layout>
        </h6>
        <h6 class="statusChip" v-if="chipData.tradeType != ''">
            <v-layout align-center row fill-height>
                {{ $str(tradeType) }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('tradeType')">close</i>
            </v-layout>
        </h6>
        <h6 class="statusChip" v-if="chipData.currency != ''">
            <v-layout align-center row fill-height>
                {{ chipData.currency }}
                <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('currency')">close</i>
            </v-layout>
        </h6>-->
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: "my-order-chips",
        props: ['chipData'],
        data() {
          return {
              start_date: "",
              end_date: "",
          }
        },
        computed: {

        },
        methods: {
            // 칩 x버튼 눌렀을 시 삭제
            chipDelete(data) {
                this.$emit('delete',data);
            },
            showDateChip(index,data) {
                switch (index) {
                    case 'searchStartTime':
                        this.start_date = data;
                        return start_date + " ~ " + end_date;
                    case 'searchEndTime':
                        this.end_date = data;
                        return start_date + " ~ " + end_date;
                    case 'orderStatus':
                        return  Vue.prototype.$str(data) ;
                    case 'orderNo':
                        return data;
                    case 'cryptocurrencyType':
                        return  Vue.prototype.$str(data) ;
                    case 'cryptocurrency':
                        return  data ;
                    case 'orderType':
                        return  Vue.prototype.$str(data) ;
                    case 'tradeType':
                        Vue.prototype.$str(data) ;
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