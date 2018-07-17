<template>

  <v-flex>
      <v-flex>
        <v-btn-toggle v-model="toggle_exclusive">
          <v-btn :value="1" flat >
            {{$str("country")}}
          </v-btn>

          <v-btn :value="2" flat>
            {{$str("currency")}}
          </v-btn>

          <v-btn :value="3" flat>
            {{$str("payment")}}
          </v-btn>

          <v-btn :value="4" flat>
            <v-icon>search</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
  </v-flex>


</template>


<script lang="ts">
    import Vue from 'vue';
    import SearchService from '@/service/trade/search/SearchService';
    import MainRepository from "../vuex/MainRepository";
    import { abUtils } from '@/common/utils';

    export default Vue.extend({
        name: 'searchBar',
        data: () => ({
            toggle_exclusive : 1,
        }),
        methods: {
            onSearchList() {
              SearchService.searchTradeView.searchTradeInfo(function(error){
                  if(!error){
                      MainRepository.TradeView.getTradeView();
                  }else {
                      console.log("POST ERROR ::::::: " + error);
                  }
              })
            }
        }
    });
</script>
<style>
</style>
