<template>
  <div class="feedback_template">   
      <div class="textarea_container">
        <textarea class="textarea">

        </textarea>
     </div>
     <button class="submit_btn" @click="submit">SUBMIT</button>
  </div>
</template>

<script>

 
export default {
  name: 'feedback',
  data() {
      return {
          test : 1
      }
  },
  methods : {
      submit () {
          console.log("submit feedback");
      }
  }
}
</script>

<style scoped>
.feedback_template{
    width: 100%;
    margin-bottom: 100px;
}
.textarea_container{
    margin-top : 40px;
}
.textarea{
    width: 287px;
    height: 279px;
    resize: none;
}
.submit_btn {
      border: 0;
    width: 122px;
    height: 38px;
    margin-top: 13px;
    font-size: 13px;
    background: #083b65;
    color: white;
    font-weight: 700;
}

.submit_btn:hover{
      background: #006bcf;
      cursor: pointer;
}
    
</style>
