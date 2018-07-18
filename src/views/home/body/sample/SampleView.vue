<template>
    <div>
        <div v-if="isMobile">


        </div>

        <div v-for="item in tradeInfoList">
            <trade-center-item
                    :user="item"
            ></trade-center-item>
        </div>

        <v-pagination
                v-model="page"
                :length="6"
        ></v-pagination>
    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import TradeCenterItem from "../tradeCenter/item/TradeCenterItem";

    export default {
        name: "sample-view",
        components: {TradeCenterItem},
        props: {

        },
        data() {
            return {
                isMobileMode: false,
                currentPage: 1,
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            page: {
              get() {
                  return this.currentPage;
              },
                set(value) {
                  this.currentPage = value;

                  // Axio.loadList(page, function() {})
                }
            },
            tradeInfoList() {
                return MainRepository.TradeView.controller().getTrade();
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            userInfo() {
                return MainRepository.User.controller().getUser();
            },
            country() {
                return MainRepository.Country.get();
            }
        },
        created() {
            MainRepository.Service.Account().Account.login('hi', '1234',
                function (data, num) {

            })
        },
        mounted() {
        },
        methods: {
            onInputChange(value) {
                console.log('value: ' + value);
            }
        }
    }
</script>

<style scoped>

</style>