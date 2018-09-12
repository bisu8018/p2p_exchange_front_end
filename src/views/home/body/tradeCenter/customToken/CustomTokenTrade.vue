<template>
    <div>
        <v-flex xs12>
            <h2 class="title">Custom Token Trade</h2>
            <v-divider></v-divider>
        </v-flex>
        <v-flex xs12 md3 offset-md9 >
            <div class="p-relative search-input">
                <input type="text" v-model="searchCustomToken" class="input" :placeholder="$str('search')">
                <i class="material-icons cs-search">search</i>
            </div>
        </v-flex>
        <div>
            list 뿌려질 예정
            <div color-blue-active></div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import tradeCenter from "../TradeCenter.vue"
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "CustomTokenTrade",
        components: {
            tradeCenter
        },
        data: () => ({
            searchCustomToken : '',
        }),
        computed:{
          CustomTokenList(){
              return
          }
        },
        created(){
            MainRepository.TradeView.loadCustomTokenList();

        },
        methods: {

        }
    }
</script>

<style scoped>
    /* web*/
    @media only screen and (min-width: 960px) {
        .search-input{
            margin-top: 32px;
            margin-bottom: 32px;
        }
    }

    /* mobile*/

    @media only screen and (max-width: 959px) {
        .search-input{
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }

    .title{
        text-align: left;
        font-weight : 700;
        margin-top: 48px;
        margin-bottom: 24px;
    }
    .cs-search{
        color: #9294a6;
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
    }

</style>