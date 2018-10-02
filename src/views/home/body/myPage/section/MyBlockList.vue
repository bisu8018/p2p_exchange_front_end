<template>
    <div class="myPage-box pb-1">

        <!-- Header -->
        <div class="otherInfo-header">
            <h4>{{$str('blockList')}}</h4>
            <div class="header-detail">
                <p class="caption mt-3">{{ $str('blockListExplain') }}</p>
            </div>
        </div>

        <!-- Body : isEmpty -->
        <div class="ta-center py-3" v-if="blockList.totalCount === 0">
            <p class="pt-2 pb-3 color-darkgray">{{ $str('noMoreRecords') }}</p>
        </div>

        <!-- Body : !isEmpty -->
        <div v-else>
            <div class="blocked-user-item" v-for="block in blockList.blockMemberList">
                <block-list-item :data="block" />
            </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrapper"   v-if="blockList.totalCount !== 0">
            <v-pagination
                    v-model="blockPage"
                    @input="onBlockPage(blockPage)"
                    :color="'TextBlue'"
                    :length="pageLength()" />
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
        },
        data() {
            return {
                blockPage: 1,
            }
        },
        methods: {
            onBlockPage(num) {
                this.$emit('onBlockPage', num);
            },
            pageLength() {
                let a = 0;
                a = this.blockList.totalCount;

                let result = 1;

                // 나머지가 없을 때
                if (a % 10 === 0 && a > 9) {
                    result = a / 10;
                } else if (a % 10 !== 0 && a > 9) {
                    result = (parseInt(a / 10)) + 1;
                }
                return result;
            },
        }
    }
</script>

<style scoped>
    .pagination-wrapper {
        max-width: 360px;
        margin: 48px auto 48px;
        text-align: center;
    }
</style>