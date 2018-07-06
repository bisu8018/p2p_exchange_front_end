<template>
    <v-content>
        <v-container grid-list-md fill-height color='white'>
            <v-layout row wrap  justify-center>                 <!--수평정렬만, 수직정렬시 align-center 추가-->
                <v-flex xs12 md6 lg4> 
                    <v-card flat>
                        <v-card-title primary-title>
                            <div class="loginTitle">
                                <h3 class="headline mb-0"> Reset login Password</h3>                                    
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="person" name="Email" :rules="emailRules" v-model="email" label="Email" type="text" required></v-text-field>
                                    <p>The withdrawl will be disabled in 24 hours once the password is reset.</p>   
                            </v-form>
                        </v-card-text>        
                        <!--verification slider-->    
                    </v-card>
                </v-flex>
            </v-layout>      
        </v-container>
    </v-content>
</template>
<script>
export default{
  name : 'findPassword',
    data: function(){
        return{
            email : '',
            emailVerificationCode : '',
             emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]            
        }
    },    
    methods: {     
        onSubmit : function() {
               
        }
    }
}
</script>
<style>
</style>