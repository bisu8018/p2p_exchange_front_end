<template>
    <v-layout wrap align-center>  
      <v-flex xs12 sm6 d-flex>
        <v-select
          v-model="select"          
          :items="items"
          item-text="country"
          item-value="code"
          label="Select"
          solo
          change="onChange"
        ></v-select>
      </v-flex>
    </v-layout>
</template>
<script>
  export default {
    name: 'countySelect',
    data: () => ({
        select: {country : 'All countries', code : 'ALL'},
      items: [
          {country : 'All countries', code : 'ALL'},
          {country : 'China', code : 'CN'},
          {country : 'Singapore', code : 'SG'},
          {country : 'India', code : 'IN'},
          {country : 'Vietnam', code : 'VN'},
          {country : 'Canada', code : 'CA'},
          {country : 'Australia', code : 'AU'},
          {country : 'Korea', code : 'KR'},
          {country : 'Switzerland', code : 'CH'},
          {country : 'Netherlands', code : 'NL'},
          {country : 'Taiwan', code : 'TW'},
          {country : 'Russia', code : 'RU'},
          {country : 'United Kingdom', code : 'UK'},
          {country : 'Hong Kong(china)', code : 'HK'},
          {country : 'Nigeria', code : 'NG'},
          {country : 'Indonesia', code : 'ID'},
          {country : 'Philippines', code : 'PH'},
          {country : 'Cambodia', code : 'KH'}
        ]
    }),
    methods : {
      onChange (){
        this.$emit('countryCode',this.select.code);
      }
    }
  }
</script>
<style>
</style>