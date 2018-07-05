<template>
  <v-footer
    height="auto"
    color="grey lighten-3"
    column
    wrap
    align-center
  >
    <v-container fluid grid-list-xs>

      <v-layout
        wrap
        row
        border-bottom
      >

        <!-- 카드 1 -->
        <v-flex xs12 md4 text-xs-left>
          <v-card flat>
            <v-card-text class="grey--text">
              <p>Support</p>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>Guides</p></a>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>FAQ</p></a>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>Announcements</p></a>
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- 카드 2 -->
        <v-flex xs12 md4 text-xs-left>
          <v-card flat>
            <v-card-text class="grey--text">
              <p>Terms</p>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>Terms of Service</p></a>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>Transaction Regulations</p></a>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>Fees</p></a>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>Terms of Privacy Policy</p></a>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank"><p>KYC&amp;AML Polocies</p></a>
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- 카드 3 -->
        <v-flex xs12 md4 text-xs-left>
          <v-card flat>
            <v-card-text class="grey--text">
              <p>Contact Us</p>
              <a class="black--text" href="https://vuetifyjs.com" target="_blank">support@allb.com</a>
            </v-card-text>
          </v-card>
        </v-flex>

        </v-layout>

            <hr class="my-2">
       
          <v-card flat>
            <v-card-text>
              &copy; 2018 — <strong>otc.AllB.com</strong>
            </v-card-text>
          </v-card>
          


      
    </v-container>
  </v-footer>
</template>

<script lang="ts">
    import Vue from 'vue';   

    export default Vue.extend({    
        name: 'abFooter',
         data: () => ({
         icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
        support: [
          'Guides',
          'FAQ',
          'Announcements',

          'Terms of Service',
          'Transaction Regulations',
          'Fees',
          'Terms of Privacy Policy',
          'KYC&AML Policies',
          // &amp; => &;

          'Support@allb.com'
        ]
    })    
    });
</script>

<style>

</style>