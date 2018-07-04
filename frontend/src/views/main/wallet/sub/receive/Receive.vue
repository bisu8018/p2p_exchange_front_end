<template>
  <div  class="receive_wrapper">    
    <div class="subject_bar">
      <span class="back" @click="back()">ᐸ</span>
      <span class="subject">RECEIVE</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'receive',
  data () {  
    return {
      items: [
        {value: 1000},
        {value: 2000}
      ]
    }
  },
  methods: {
    back () {
      this.$router.push('/wallet'); 
    }
  }
}
</script>

<style scoped>
   .receive_wrapper{
     width: 100%;
     height: 100%;
     background: white;
    position: relative;
   }
   .subject_bar{
    width: 100%;
    height: 47px;
    background: white;   
    border-bottom: 1px solid #ececec;
    display: table;
   }
   .subject{
    font-size: 18px;
    display: table-cell;
    vertical-align: middle;
   }
   .back{
    position: absolute;
    vertical-align: middle;
    color: #0c0c5f;
    font-size: 14px;
    top: 14px;
    left: 17px;
    font-weight: bold;
   }
</style>
