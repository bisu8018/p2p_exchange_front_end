<template>
    <div class="myPage-box">

        <!-- Header -->
        <div class="otherInfo-header">
            <h4>{{$str('blockList')}}</h4>
            <div class="header-detail">
                <p class="caption mt-3">{{ $str('blockListExplain') }}</p>
            </div>
        </div>

        <!-- Body : isEmpty -->
        <div class="ta-center py-3" v-if="blockList.length === 0">
            <p class="pt-2 pb-3 color-darkgray">{{ $str('noMoreRecords') }}</p>
        </div>

        <!-- Body : !isEmpty -->
        <div v-else>
            <div class="blocked-user-item" v-for="block in blockList">
                <block-list-item
                        :data="block"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import BlockListItem from "../item/BlockListItem";

    export default {
        components: {BlockListItem},
        name: "my-block-list",
        props: {
            blockList: {}
        }
    }
</script>

<style scoped>

</style>