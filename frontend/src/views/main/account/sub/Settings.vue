<template>
  <div class="settings_template">   
      <div class="avatar-container">
          <div  v-if="url === ''">
            <div class="avatar">
                <img class="img-avatar" src="../../../../assets/add_avatar.png">
            </div>
        </div>
        <div v-else>
            <div class="avatar">
                <img class="img-avatar" v-bind:src="url">
            </div>
        </div>
      </div>
      <div class="nickname-container">
            <input type="text" class="nickname-input" v-model="nickname">                
      </div>
      <div class="settings-wrapper">
           <div class="edit-container">
                <div class="div-name">KYC</div>
                 <div class="div-kyc">
                    {{kyc}}
                </div>
            </div>
            <div class="edit-container">
                <div class="div-name">E-MAIL</div>
                <div class="div-input">
                {{email}}
                </div>
                <div class="div-verify">                    
                    <span class="edit-verify1" v-if="email_verify=='yes'">CONFIRM</span>
                    <span class="edit-verify2" v-else>UNAUTHORIZED</span>
                </div>
            </div>
            <div class="edit-container">
                <div class="div-name">PHONE</div>
                 <div class="div-input">
                    {{phone}}
                </div>
                <div class="div-verify">
                     <span class="edit-verify1" v-if="phone_verify=='yes'">CONFIRM</span>
                    <span class="edit-verify2" v-else>UNAUTHORIZED</span>
                </div>
            </div>
               <div class="edit-container">
                <div class="div-name">ID CARD</div>
                 <div class="div-input">
                    {{id_card}}
                </div>
                <div class="div-verify">
                     <span class="edit-verify1" v-if="idCard_verify=='yes'">CONFIRM</span>
                    <span class="edit-verify2" v-else>UNAUTHORIZED</span>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
// kyc need to proceed
// kyc Level Display
 
export default {
  name: 'settings',
  data() {
      return {
        url : "",   //Required user photo from DB
        nickname : "Dean",
        kyc : "2",
        email : "test@allblab.com",
        email_verify : "yes",
        phone : "+82 10-1234-1234",
        phone_verify : "yes",
        id_card : "",
        idCard_verify : "no"
      }
  }
}
</script>

<style scoped>
.settings_template{
    width: 100%;
}
.avatar-container{
    width: 100%;
}
.avatar{
    cursor: pointer;
    width: 150px;
    height: 150px;
    background: white;
    display: inline-block;
    margin-top: 27px;
    border-radius: 75px;
    margin-bottom: 27px;
    
}
.nickname-container{
    height: 56px;
     border-bottom: 2px solid #ebebeb;
}
.nickname-input{
    font-size: 20px;
    color: #333333;
    text-align: center;
    width: 172px;
    border: none;
}
.input-data{
    font-size: 18px;
    color: #3a3a3a;
    border: none;
    text-align: left;
    width: 166px;
    padding-left: 8px;
}
.settings-wrapper{
    margin-top: 34px;
}
.edit-container{
    height: 50px;
    padding-top: 11px;
    display: flex;
    width: 100%;
}
.div-name{
    width: 25%;
    font-size: 14px;
    color: #0f0f4b;    
}
.div-input{
    width: 40%;
     font-size: 16px;
    color: #3a3a3a;
    border: none;
    text-align: left;
}
.div-verify{
    width: 35%;    
    padding-top: 2px;
}
.div-kyc{
    width : 78%;
}
.edit-verify1{
    font-size: 12px;
    border: 1px solid #1dc000;
    color: #1dc000;
    padding: 1px 28px;
    border-radius: 23px;
}
.edit-verify1:hover{
    font-weight: bold;
    cursor: pointer;
}

.edit-verify2{
    font-size: 12px;
    border: 1px solid #ca0000;
    color: #ca0000;
    padding: 1px 10px;
    border-radius: 23px;
}
.edit-verify2:hover{
    font-weight: bold;
    cursor: pointer;
}
    
</style>
