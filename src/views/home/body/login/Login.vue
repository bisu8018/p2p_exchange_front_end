<template>

<div class="loginPage">
    <div class="loginsBox">
        <div class="loginTabsForm">
            <div class="loginTitle">
                <img class="iconLogo" src="../../../../assets/logo.png"> <!--우리로고이미지로 대체해야함-->
                Welcome
            </div>
            <p class="labelDesc">Account</p>
            <div class="loginItem">
                <input type="text" id="Email" class="inputControl" v-model="myEmail" placeholder="Email">
            </div>
            <p class="labelDesc">Password</p>
            <div class="loginItem">
                <input type="password" id="pwd" class="inputControl" v-model="myPwd" placeholder="Enter password"/>
            </div>
            <!--account가 채워지면 보이게되는 인증용 슬라이더.-->
            <div class="verifySlider" v-if="myEmail.length>0">                  
                <p class="labelDesc">Verify</p>                                 <!--클라이언트 단에서만 다뤄지기에 보안이 약해차후 회의통해 빠지거나 구글 캣챠로 대체될수도 있음-->
                <span class="slideTounLock">Please slide to verify</span>
                <v-app class="Slider">
                    <v-container fluid grid-list-lg>                            <!--스타일은 그냥 github 보고 쓴거라 다른 스타일로 변경필요-->
                        <v-layout row wrap>
                            <v-flex xs12 >
                                <v-slider v-if="slider !== 100" class="verifidNotOk" ref="slider" 
                                    v-model="slider" @click="goZero()" label="Verify"></v-slider>
                                <div v-else class="verifidOk">Verified</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-app>
            </div>

                
            <div class="forgetControl">
                <a href="https://www.allblab.com" class="forgetPwd">               <!--password 분실시 찾아주는 페이지로 이동-->
                Forget Password?</a>
                <br>
                <br>
            </div>
            <div class="btnItem">
                <button type="button" class="btnLogin" @click="doLogin()">
                    <span>Log In</span>
                </button>
            <div class="loginOrBox">
                <span>or</span>
                <div class="loginOrLine"></div>
            </div>
            <a href="#/signup" class="register">Sign Up</a>                      <!--sign up page로 이동-->
            </div>        
        </div>
    </div>
    <v-card class="notice" v-if="isModal">                <!--login 실패시 띄워주는 fixed popup-->
        <v-card-title class="noticeHead">                 <!--huobi에선 웹 : "오른쪽 윗단에 popup 됨", 모바일 : 윗단 가운데에 popup됨-->
            Notice</v-card-title>
        <v-card-text>Illegal Parameter</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="isModal=false">X</v-btn>
        </v-card-actions>
    </v-card>   
</div>

</template>



<script>

export default{
  name: 'login',
    data: function(){
        return{
            myEmail : '',
            myPwd : '',
            slider: 0,
            isModal : false,
        }
    },
    components: {
        
    },
    
    computed: {
        
    },
    methods: {
        doLogin : function(){
            axios.post("/login",{
                myEmail : 'myEmail',
                myPwd : 'myPwd',
            })
            .then(function(response){
                console.log(response);
            }).catch(function(ex){
                this.isModal = true;
                console.log(ex)
                
            })
        },
        goZero : function() {
            console.log(HTMLDivElement.oldValue);
            if(this.slider !== 100){
                this.slider = HTMLDivElement.oldValue;
                console.log(this.slider);
            }
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
.notice{
    float: right;
}
.forgetPwd{
    position: relative;
}
.btnLogin{
    position: relative;
}
.verifySlider{
    height: 50px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    
}
.register{
    position: relative;
}
.notice{
    text-align: center;
     
    

}


</style>