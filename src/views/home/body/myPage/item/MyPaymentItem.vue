<template>
  <div>
    <!--알리페이-->
    <v-layout wrap row v-if="paymentMethod.alipay">
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-flex xs12>
        <div class="sprite-img f-left mr-3" :class="item.iconClass"></div>
        <h5 class="color-darkgray mb-3"> {{ initItem(item) }}</h5><h5
              class="mb-3 ml-4 pl-3 color-black">
        {{paymentMethod.alipay.id}} {{paymentMethod.alipay.owner_name}} {{paymentMethod.alipay.alipay_id}}</h5></v-flex>
      <v-layout class="vertical-center">
        <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue text-white-hover">{{$str('modify')}}</a>
        </h6>
        </v-flex>
        <v-flex xs6>
          <span @click="onToggle('alipay')">
            <toggle :toggle="paymentMethod.alipay.active_yn"
                    class="c-pointer"></toggle>
          </span>
        </v-flex>
      </v-layout>
    </v-layout>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'my-payment-item',
    components: {},
    props: {
        item: {},
    },
    data() {
        return {
            itemId: '',
        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        initItem(item) {
          /*  switch (item.type) {
                case 'alipay':
                    this.iconClass = 'ic-alipay';
                    this.viewId = this.alipayId;
                    this.viewQrCodeImgUrl = this.alipayQrCodeImgUrl;
                    return this.$str('alipayText');

                case 'wechat':
                    this.iconClass ='ic-wechat';
                    this.viewId = this.wechatId;
                    this.viewQrCodeImgUrl = this.wechatQrCodeImgUrl;
                    return this.$str('wechatPay');

                default:
                    this.iconClass ='ic-bank';
                    return this.$str('bankAccountText');
            }*/
        }
    }
});
</script>

<style scoped>

</style>