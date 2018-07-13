<template>
  <v-layout wrap align-center>
    <v-flex xs12 class="selectbox-wrapper">
      <select v-model="selectedCountry" @change="setCountry" class="selectbox-country caption">
        <option v-for="item in items" v-bind:value="item.code">{{item.country}}</option>
      </select>
      <v-icon class="icon-style">keyboard_arrow_down</v-icon>
    </v-flex>
  </v-layout>
</template>
<script>
    import MainRepository from "@/vuex/MainRepository";

    export default {
        name: 'countrySelect',
        data: () => ({
            selectedCountry: 'ALL',
            items: [
                {country: 'All countries', code: 'ALL'},
                {country: 'China', code: 'CN'},
                {country: 'Singapore', code: 'SG'},
                {country: 'India', code: 'IN'},
                {country: 'Vietnam', code: 'VN'},
                {country: 'Canada', code: 'CA'},
                {country: 'Australia', code: 'AU'},
                {country: 'Korea', code: 'KR'},
                {country: 'Switzerland', code: 'CH'},
                {country: 'Netherlands', code: 'NL'},
                {country: 'Taiwan', code: 'TW'},
                {country: 'Russia', code: 'RU'},
                {country: 'United Kingdom', code: 'UK'},
                {country: 'Hong Kong(china)', code: 'HK'},
                {country: 'Nigeria', code: 'NG'},
                {country: 'Indonesia', code: 'ID'},
                {country: 'Philippines', code: 'PH'},
                {country: 'Cambodia', code: 'KH'}
            ]
        }),
        methods: {
            setCountry() {
                MainRepository.Country.set(this.selectedCountry);
            }
        }
    }
</script>
<style>
  .selectbox-country {
    width: 100%;
    height: 36px;
    border-radius: 2px;
    background-color: #ffffff;
    border: solid 1px #8d8d8d;
    margin-bottom: 26px;
    color: #9294a6;
    padding-left: 12px;
  }

  .selectbox-wrapper{
    position: relative;
  }

  .icon-style {
    position: absolute;
    right: 8px;
    top: 5px;
  }
</style>