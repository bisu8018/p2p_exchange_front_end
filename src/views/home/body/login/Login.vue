<template>
<v-app class="loginPage">
    <form action="/signin" method="post" @Submit="onSubmit">
        <v-content>
            <v-container grid-list-md fill-height>
                <v-layout row wrap align-center justify-center>                 <!--수직,수평정렬-->
                    <v-flex xs12 md6 lg4> 
                        <v-card flat>
                            <v-card-title primary-title>
                                <div class="loginTitle">
                                    <img class="iconLogo" src="../../../../assets/imgs/logo_black.png"> <!--우리로고이미지로 대체해야함-->
                                    <h3 class="headline mb-0"> Welcome</h3>
                                    
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="Email" :rules="emailRules" v-model="email" label="Email" type="text" required></v-text-field>
                                    <v-text-field prepend-icon="lock" name="password" :rules="passwordRules" v-model="encryptedPassword" label="Password" type="password" required></v-text-field>
                                </v-form>
                            </v-card-text>
                        
                            <div class="forgetPassword">
                                <a href="#/forgetPassword/" class="forgetPwd">               <!--password 분실시 찾아주는 페이지로 이동-->
                                Forget Password?</a>
                                <br>
                                
                            </div>
                            <div class="verifySlider" v-if="encryptedPassword.length>=8">                  <!--클라이언트 단에서만 다뤄지기에 보안이 약해차후 회의통해 빠지거나 구글 캣챠로 대체될수도 있음-->
                                <!--p class="labelDesc">Verify</p-->                                     
                                
                                <div v-if="slider !== 100">                    
                                    <span class="slideTounLock">Please slide to verify</span>
                                    <br>        
                                    <input type="range" min="1" max="100" v-model="slider" @input="changeWidth" class="slider" >
                                    <v-slider  class="verifidNotOk" ref="slider"  
                                    color = "primary" background-color="grey lighten-1" loading prepend-icon="arrow_forward_ios"
                                        v-model="slider" :rules="sliderRules" @click="goZero()"  required></v-slider>
                                </div>
                                <v-btn v-else color="success"  flat>Verified OK</v-btn>
                            </div>
                            <div class="btnItem">
                                <v-btn color="primary" type="submit" large >Log In</v-btn>
                            </div>
                            <div class="loginOrBox">
                                <span>or</span>
                                <div class="loginOrLine"></div>
                            </div>
                            <div>
                                <v-btn href="#/register/" large >Sign Up</v-btn>        <!--sign up page로 이동-->
                            </div>  
                        </v-card>
                    </v-flex>
                </v-layout>      
            </v-container>
        </v-content>
    </form>   
</v-app>
</template>
<script>
export default{
    data: function(){
        return{
            email : '',
            encryptedPassword : '',
            slider: 0,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be more than 8 characters',
                v => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(v) || 'Does not fit password format'
            ],
            sliderRules: [
                v => v ===100,
            ],
            verify_warning : "",
        }
    },
    components: {
        
    },
    
    computed: {
        
    },
    methods: {
        goZero : function() {
            console.log(HTMLDivElement.oldValue);
            if(this.slider !== 100){
                this.slider = HTMLDivElement.oldValue;
                console.log(this.slider);
            }
        },
        onSubmit : function() {
               console.log(123);
               if(this.slider !== 100){
                   return false;
               }
               return false;
        },
        
    },
}
</script>
<style>
.loginPage{
    text-align: center;
    position: relative;
}
.iconLogo{
    width : 20px;
    height: 20px;
}
.verifySlider{
    padding-top: 10px;
    position: relative;
    width: 90%;
    
    margin-left: auto;
    margin-right: auto;
    
}
.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%;
    height: 30px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}
.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 30px; /* Set a specific slider handle width */
    height: 30px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
    background:url(../../../../assets/imgs/right.png) no-repeat;
}
.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}
</style>