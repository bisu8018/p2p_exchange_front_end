<template>
  <div class="account_template">    
      <section class="first">  
        <div class="first_subj">
            <div class="subject">ACCOUNT</div>
        </div>
         <div class="first_act">   
            <div class="act" @click="settings()">
                <div class="act_txt">Settings</div>                             
            </div>      
            <div class="act" @click="transaction()">
                <div class="act_txt">Transaction</div>
            </div>            
             <div class="act" @click="contacts()">
                <div class="act_txt">Contacts</div>
            </div>
        </div>
      </section>
      <section class="second">
           <router-view></router-view>  
      </section>
  </div>
</template>

<script>
import VueRouter from 'vue-router'

 
export default {
  name: 'account',
  methods: {
      transaction () {
          this.$router.push('/account/transaction');  
      },
      contacts () {
          this.$router.push('/account/contacts');  
      },
      settings () {
          this.$router.push('/account/settings');  
      }
  },
  created(){ 
      this.settings();
  }
}
</script>

<style scoped>
.account_template{
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
        height: 50px;      
        display: table;
    }
    .subject{        
        color: black;
        width: 100%;
        height: 100%;
        display: table-cell;
        vertical-align: middle;
        border-bottom: #e3e3e3 1px solid;
    }
    .act{
        width: 33%;
        float: left;
        height: 100%;
        font-size: 15px;
        display: table;
    }
    .act:hover {
        font-weight: bold;
    }
    .act_txt{
        display: table-cell;
        vertical-align: middle;
    }
      .first_act{        
        width: 100%;
        height: 35px;
        border-bottom: 1px solid #a8a8a8;
    }
</style>
