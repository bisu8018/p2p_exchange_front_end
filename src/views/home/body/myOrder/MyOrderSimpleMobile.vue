<template>
    <div class="MyOrderSimpleMobile_wrapper">
        <div v-for="item in orderList">
            <my-order-simple-item
                    :data="item"
            />
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    export default {
        name: "myOrderSimpleMobile",
        computed: {
            orderList() {
                return MainRepository.MyOrder.getPage();
            }
        },
    }
</script>

<style scoped>

</style>