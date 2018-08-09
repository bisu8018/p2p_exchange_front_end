<template>
    <div>
        <v-pagination v-model="currentPage" :length="pages" v-on:input="onChanged"></v-pagination>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../vuex/MainRepository";

    export default Vue.extend({
        name: 'Pagination',
        data: () => ({
            currentPage : 1,
        }),
        props :{
            size : {
                type: Number,
                default : 10
            },
            type :{
                type: String,
                default : ''
            },
        },
        created() {
            MainRepository.Pagination.setPage(1, this.size, this.type );  //시작할땐 무조건 1page로.

        },
        computed: {
            pages () {
                //다른filter에 의해 page가 1페이지 등으로 돌아갔을때 현재 페이지를 업데이트해줌
                let currentclicked = Number(MainRepository.Pagination.getPage());
                this.currentPage = currentclicked;
                // filter에 의해 전체 item 갯수가 달라질경우 전체 페이지수를 업데이트해줌
                let totalItems = Number(MainRepository.Pagination.getTotalCount());
                let totalPage = Math.ceil(totalItems/ this.size);
                return totalPage;
            },
        },
        methods: {
            onChanged() {
                //버튼 클릭으로 페이지 전환시 페이지 번호를 set 해줌.
                return MainRepository.Pagination.setPage(this.currentPage, this.size, this.type);
            }
        },
    });
</script>
<style>
</style>
