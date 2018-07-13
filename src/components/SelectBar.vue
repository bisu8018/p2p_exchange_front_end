
<template>
    <v-flex>
        <!-- Web 일때 -->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp">
          <v-layout row>
            <v-flex md5>
              <v-layout column>
                <v-layout row style="font-size: 16px" mt-4 mb-1>
                  <v-flex md3 offset-md1 bold>{{$str("buy")}}</v-flex>
                  <v-flex md7></v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex md1><v-icon>keyboard_arrow_left</v-icon></v-flex>
                  <v-flex md3 v-for="item in items" @click="getBuyInfo(item.text) " key="item.text">
                    {{ item.text }}
                  </v-flex>
                  <v-flex md1> <v-icon>keyboard_arrow_right</v-icon></v-flex>
                </v-layout>
              </v-layout>
            </v-flex>

            <v-flex md1>
              <v-layout align-center justify-end column fill-height pr-4>
                <span><v-divider vertical style="height: 48px;"></v-divider></span>
              </v-layout>
            </v-flex>

            <v-flex md5>
              <v-layout column>
                <v-layout row style="font-size: 16px" mt-4 mb-1>
                  <v-flex md3 offset-md1 bold>{{$str("sell")}}</v-flex>
                  <v-flex md7></v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex md1><v-icon>keyboard_arrow_left</v-icon></v-flex>
                  <v-flex md3 v-for="item in items" key="item.text" @click="getBuyInfo(item.text) " >
                    {{ item.text }}
                  </v-flex>
                  <v-flex md1> <v-icon>keyboard_arrow_right</v-icon></v-flex>
                </v-layout>
              </v-layout>
            </v-flex>

          </v-layout>
        </v-flex>

        <!-- mobile 일때 -->

        <v-flex v-else xs12>
            <!-- buy sell 버튼 -->
            <div>
                <div style="height: 36px; width:67px; border: solid 1px #5e91d2; border-top-left-radius:200px;
                    display: inline-block;  position: relative; border-bottom-left-radius:200px;">
                    <span style="line-height:50px; color:#5e91d2; position: absolute; left: 20px; bottom: -8px;">Buy</span>
                </div>
                <div class="Button" style="height: 36px; width:67px; background: #5e91d2; border-top-right-radius:200px;
                    display: inline-block; border: solid 1px #5e91d2; position: relative;
                    border-bottom-right-radius:200px;">
                    <span style="line-height:50px; color:white; position: absolute; left: 20px; bottom: -8px;"> Sell</span>
                </div>
            </div>

            <!-- BTC ALLB ETH  버튼 -->
                <v-layout row wrap justify-center style="font-size: 16px" mt-4 mb-4>
                    <v-flex xs1><v-icon>keyboard_arrow_left</v-icon></v-flex>
                    <v-flex xs3 v-for="item in items" key="item.text" @click="getBuyInfo(item.text) "  >
                        {{ item.text }}
                    </v-flex>
                    <v-flex xs1> <v-icon>keyboard_arrow_right</v-icon> </v-flex>
                </v-layout>

        </v-flex>


    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';
    import { abUtils } from '@/common/utils';

    export default Vue.extend({
        name: 'selectBar',
        data: () => ({
            items: [
                {
                    text: 'BTC',
                    disabled: false
                },
                {
                    text: 'ETH',
                    disabled: false
                },
                {
                    text: 'USDT',
                    disabled: false
                }
            ],
            tradeStatus : 'Buy',
        })
    });
</script>
<style>
</style>
