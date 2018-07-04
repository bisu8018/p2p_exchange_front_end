<template>
  <div class="notice_template">    
      <section class="first">  
        <div class="first_subj">
            <div class="subject">NOTICE</div>
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
  name: 'notice',
  data () {  
    return {
      items: [
        {message: 'test'},
        {message: 'test2'}          
      ]
    }
  },
  methods: {
      
  }
}
</script>

<style scoped>
.notice_template{
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
    .qr{        
        width: 83px;
        height: 67px;
        position: absolute;
        right: -10px;        
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
        font-size: 19px;
        font-weight: bold;
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
