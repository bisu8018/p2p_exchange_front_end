<template>
  <div class="qna_template">   
      <div class="nothing-container">
            <div class="nothing-wrapper">
                <img class="null-img" src="../../../../assets/nothing-found.png">                
            </div>
            <span class="nothing-text">Coming soon .</span>
        </div>
      <div class="list">
        
     </div>
  </div>
</template>

<script>

 
export default {
  name: 'qna',
  data() {
      return {
          test : 1
      }
  }
}
</script>

<style scoped>
.qna_template{
    width: 100%;
}
.nothing-container{
    margin-top : 150px;
}
.nothing-text{
    color: #676767;
    font-size: 15px;
}
    
</style>
