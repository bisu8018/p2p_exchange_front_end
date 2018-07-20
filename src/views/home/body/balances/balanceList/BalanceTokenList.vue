<template>
  <div class="tokenlistWraaper">
    <v-layout row wrap>
        <v-flex md1 xs12 text-md-center>
          {{tokenlist.logo}} {{tokenlist.name}}
        </v-flex>
        <v-flex md3 xs12 text-md-left>
          <div>OTC Account</div>
          <div>Available: {{tokenlist.OtcAvailable}} {{tokenlist.name}}</div>
          <div>Frozen: {{tokenlist.OtcAvailable}} {{tokenlist.name}}</div>
        </v-flex>
        <v-flex md3 xs12 text-md-left>
          <div>Exchange Account</div>
          <div>Available: {{tokenlist.ExAvailable}} {{tokenlist.name}}</div>
          <div>Frozen: {{tokenlist.ExFrozen}} {{tokenlist.name}}</div>
        </v-flex>

        <v-flex md5 xs12 text-md-right>
           <button>{{$str("Transfer")}}</button>
          <button>{{$str("Deposit")}}</button>
        </v-flex>

    </v-layout>
  </div>
</template>

<script>
    export default {
        name: "BalanceTokenList",
        props : {
            tokenlist : {},
        },
        methods : {

        },
        data: () => ({

        }),
    }
</script>

<style scoped>
  .tokenlistWraaper{
    border: 1px solid #d1d1d1;
  }
</style>