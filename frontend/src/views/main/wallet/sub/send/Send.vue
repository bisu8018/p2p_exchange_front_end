<template>
  <div  class="send_wrapper">    
    <div class="subject_bar">
      <span class="back" @click="back()">ᐸ</span>
      <span class="subject">SEND</span>
    </div>
    <div class="coin-list">
        <div v-for="item in items" :key="item.coin" class="coin-wrapper" @click="onSend(item.coin)">
           <div class="coin-abb">{{item.abb}}</div>
           <div class="coin-name">{{item.coin}}</div>
           <div class="amount-wrapper">
              <div class="coin-amount">{{item.amount}}</div>
              <div class="coin-unit">{{item.unit}}</div>
           </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "send",
  data() {
    return {
      items: [
        // Select data from DB
        { abb: "BTC", coin: "BITCOIN", amount: 0, unit: "bits" },
        { abb: "LTC", coin: "LITECOIN", amount: 0, unit: "lites" },
        { abb: "ETH", coin: "ETHERIUM", amount: 0, unit: "ether" },
        { abb: "BCC", coin: "BITCOIN CASH", amount: 0, unit: "BCH" },
        { abb: "BTG", coin: "BITCOIN GOLD", amount: 0, unit: "BTG" },
        { abb: "EOS", coin: "DASH", amount: 0, unit: "DASH" }
      ]
    };
  },
  methods: {
    back() {
      this.$router.push("/wallet");
    },
    onSend() {}
  }
};
</script>

<style scoped>
.coin-unit {
  color: #545454;
  font-size: 14px;
}
.coin-amount {
  text-align: right;
  font-weight: bold;
  margin-right: 12px;
}
.amount-wrapper {
  width: 44px;
  display: table-cell;
  vertical-align: middle;
}
.coin-abb {
  width: 73px;
  display: table-cell;
  vertical-align: middle;
}
.coin-name {
  width: 297px;
  text-align: left;
  display: table-cell;
  vertical-align: middle;
}
.coin-wrapper {
  display: flex;
  height: 73px;
  border-bottom: 1px solid #e8e8e8;
  display: table;
  cursor: pointer;
}
.coin-wrapper:hover {
  background: #e9e9e9;
}
.send_wrapper {
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
}
.subject_bar {
  width: 100%;
  height: 47px;
  background: white;
  border-bottom: 1px solid #ececec;
  display: table;
}
.subject {
  font-size: 18px;
  display: table-cell;
  vertical-align: middle;
}
.back {
  position: absolute;
  vertical-align: middle;
  color: #0c0c5f;
  font-size: 14px;
  top: 14px;
  left: 17px;
  font-weight: bold;
}
</style>
