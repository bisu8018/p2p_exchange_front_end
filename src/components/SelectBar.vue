
<template>
    <v-container app>
        <!-- Web 일때 -->
        <v-flex v-if="$vuetify.breakpoint.mdAndUp" md12>
            <v-layout>
                <v-flex md2 text-md-left><span>Buy</span></v-flex>
                <v-flex md2 text-md-left><span>Sell</span></v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-tabs>
                    <v-breadcrumbs divider="|">
                        <v-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                    <v-divider vertical></v-divider>
                    <v-breadcrumbs divider="|">
                        <v-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </v-tabs>
            </v-layout>
        </v-flex>

        <!-- mobile 일때 -->

        <v-flex v-else xs12>
            <div>
                <v-btn-toggle  v-model="tradeStatus">
                    <v-btn outline color="indigo" value="Buy">
                        Buy
                    </v-btn>
                    <v-btn outline color="indigo" value="Sell">
                        Sell
                    </v-btn>
                </v-btn-toggle>
            </div>
            <v-layout row wrap justify-center>
                <v-tabs>

                    <v-breadcrumbs divider="|">
                        <v-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </v-tabs>
            </v-layout>
        </v-flex>


    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';

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
