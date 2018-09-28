<template>
    <v-layout row wrap>
        <v-flex xs12 pr-0 pl-0>
            <div class="order-filter no-drag p-relative f-right text-xs-left d-inline-table"
                 v-bind:class="{'w-full' : isMobile}">
                <div class="color-darkgray  p-relative  ma-2 d-inline-block h5"
                     v-if="placeholderFlag">
                    {{$str("adsFilterPlaceholder")}}
                </div>
                <i class="material-icons p-absolute filter-img color-darkgray c-pointer" @click.stop="onModal">filter_list</i>

                <!--  chips  -->
                <filter-chips :chipData="chipData" @delete="onPost"></filter-chips>

                <!--  filter  -->
                <my-ads-content v-if="isModal" :chipData="chipData" @closeModal="closeModal"
                               @update="onUpdate"></my-ads-content>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../../vuex/MainRepository';
    import {transCryptocurrencyName} from "@/common/common";
    import MyAdsContent from './MyAdsContent.vue'
    import FilterChips from '../../../../../../components/filter/FilterChips.vue'
    import FilterChipsModel from "../../../../../../vuex/model/filterChips";

    export default Vue.extend({
        name: "myOrder-filter",
        components: {
            MyAdsContent, FilterChips
        },
        data() {
            return {
                isModal: false,
                placeholderFlag: true,
                chipData: new FilterChipsModel(''),
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        methods: {
            // placeholder
            showPlaceholder() {
                for (let key in this.chipData) {
                    if (this.chipData[key] !== '') {
                        return this.placeholderFlag = false;
                    } else {
                        this.placeholderFlag = true;
                    }
                }
            },
            onModal() {
                if (this.isModal) {
                    this.isModal = false;
                } else {
                    this.isModal = true;
                }
            },
            closeModal() {
                this.isModal = false;
            },
            onUpdate(data) {
                let _cryptocurrencyType = '';
                if (data.cryptocurrencyType) {
                    if (data.cryptocurrencyType === 'custom') {
                        _cryptocurrencyType = 'custom';
                    } else {
                        _cryptocurrencyType = transCryptocurrencyName(data.cryptocurrency);
                    }
                }
                this.onPost(data)
            },
            onPost(data) {
                this.chipData.update(data);
                this.showPlaceholder();
                MainRepository.MyAds.updatePage(this.chipData);
            },
        },
    });
</script>

<style scoped>
    @media only screen and (max-width: 959px) {
        .order-filter {
            height: 40px;
            border: solid 1px #8d8d8d;
            min-width: unset;
        }
    }

    /* 웹에서 */
    @media only screen and (min-width: 960px) {
        .export-icon {
            width: 18px;
            margin-right: 16px;
        }

        .align-center {
            display: flex;
            align-content: center;
            justify-content: center;
            cursor: pointer;
        }
    }

    .order-filter {
        height: 40px;
        border: solid 1px #8d8d8d;
        border-radius: 2px;
        width: 100%;
    }

    .filter-img {
        right: 7px;
        top: 7px;
    }

</style>
