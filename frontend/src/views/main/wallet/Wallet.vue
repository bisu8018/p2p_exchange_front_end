<template>
  <div class="wallet_template">    
      <section class="first">          
        <div class="qr">
            <img class="qr_img" src="../../../assets/qr.png" width="25px" height="25px">
        </div>
        <div class="first_subj">
            <div class="subject">WALLET</div>
        </div>
        <div class="first_acnt">
            <div class="mean">Total</div>
            <div class="account">
                <span class="amount_value">{{acnt_val}}</span> 
                <span class="unit">bits</span>
            </div>
        </div>
        <div class="first_act">
            <div class="act" @click="send()">
                <div class="act_txt">SEND </div>                             
            </div>
            <div class="act" @click="receive()">
                <div class="act_txt">RECEIVE</div>
            </div>
        </div>
      </section>
      <section class="second">
            <div class="list">
                <table class="list_table">
                    <ul>
                        <!--li :v-for="item in items">{{items.message}}</li-->
                    </ul>
                </table>
            </div>
      </section>
  </div>
</template>

<script>
import VueRouter from 'vue-router'

export default {
  name: 'wallet',
  data () {  
    return {
      acnt_val: 0,
      items: [
        {message: 'test'},
        {message: 'test2'}          
      ]
    }
  },
  methods: {
      send () {
        this.$router.push('/wallet/send'); 
      },
      receive(){
        this.$router.push('/wallet/receive'); 
      }
  }
}
</script>

<style scoped>
.wallet_template{
    height: 100%;
    width: 100%;
    background: white;
}
    .first {
        width: 100%;       
    }
    .second {
        width: 100%;
        min-height : 400px;
        background: white;
    }
    .first_subj{
        width: 100%;
        height: 72px;      
        display: table;
    }
    .first_acnt{
        
        width: 100%;
    }
    .first_act{        
        width: 100%;
        height: 45px;
    }
    .subject{
        background: #1c5685;
        color: white;
        width: 100%;
        height: 100%;
        display: table-cell;
        vertical-align: middle;
    }
    .qr{        
       position: absolute;
        right: 20px;
        padding-top: 25px;
    }
    .qr_img{
        width:22px; 
        height: 22px;
    }
    .mean{
        width: 100%;
        height: 21px;
         background: #1c5685;
         color: #d8d8d8;
        font-size: 13px;
    }
    .account{
         background: #1c5685;
        color: white;
        width: 100%;
        height: 73px;
    }
    .act{
        width: 50%;
        background: #133957;
        color: white;
        float: left;
        height: 100%;
        font-size: 14px;
        display: table;
    }
    .act_txt{
        display: table-cell;
        vertical-align: middle;
    }
    .amount_value{
        font-size: 43px;
    }
    .unit{
        font-size: 19px;
    }
</style>
