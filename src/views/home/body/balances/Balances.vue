<template>
  <div>
    <v-layout row wrap mt-5>
      <!--header-->
      <v-flex md3 xs12>{{$str("Balances")}}</v-flex>
      <v-flex md5 xs12></v-flex>
      <!--search filter 추가할것-->
      <v-flex md4 xs12><list-filter></list-filter></v-flex>
    </v-layout>
    <Pagination></Pagination>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    export default {
        name: "Balances",
        components: {Pagination,},
        data: () => ({

        }),
        created() {

        },
        mounted() {

        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
        methods: {

        }


    }
</script>

<style scoped>

</style>