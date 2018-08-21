<template>
    <v-layout wrap row>
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-flex xs12>
        <div class="sprite-img f-left mr-3" :class="item.iconClass"></div>

        <h5 class="color-darkgray mb-3"> {{ initItem(item) }}</h5>
        <h5 class="mb-3 ml-4 pl-3 color-black" v-if="item.type === type.alipay">
          {{ item.id }} {{ item.ownerName }} {{ item.alipay_id }}
        </h5>
        <h5 class="mb-3 ml-4 pl-3 color-black" v-if="item.type === type.wechat">
          {{ item.id }} {{ item.ownerName }} {{ item.wechat_id }}
        </h5>
        <h5 class="mb-3 ml-4 pl-3 color-black" v-if="item.type === type.bank">
          {{item.bankAccount}} {{ item.bank.ownerName }} {{item.bankName}} {{item.bankBranchInfo}}
        </h5>
      </v-flex>
      <v-layout class="vertical-center">
        <v-flex xs6 class="text-xs-right mr-4">
          <h6><a class="color-blue text-white-hover" @click="onModify">{{$str('modify')}}</a></h6>
        </v-flex>
        <v-flex xs6>
          <span @click="onToggle()">
            <toggle :toggle="item.activeYn"
                    class="c-pointer"></toggle>
          </span>
        </v-flex>
      </v-layout>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Toggle from '../../../../../../components/Toggle.vue';
import PaymentMethod from "../../../../../../vuex/model/PaymentMethod";
import {abString} from "../../../../../../config/localization";

export default Vue.extend({
    name: 'my-payment-item',
    components: { Toggle },
    props: {
        item: { type: PaymentMethod },
    },
    data() {
        return {
            itemId: '',
            type: {
                alipay: 'alipay',
                wechat: 'wechat',
                bank: 'bank'
            }
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        initItem(item) {
            switch (item.type) {
                case this.type.alipay:
                    return abString('alipayText');

                case this.type.wechat:
                    return abString('wechatPayText');

                default:
                    return abString('bankAccountText');
            }
        },
        onModify() {

        },
        onToggle() {
            switch (this.item.type) {
                case this.type.alipay:
                    // 서버 요청
                    break;

                case this.type.wechat:
                    // 서버 요청
                    break;

                default:
                    // 서버 요청
                    break;
            }
        }
    }
});
</script>

<style scoped>

</style>