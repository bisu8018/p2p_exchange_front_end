<template>
    <div>
        <div class="p-relative">
            <input type="text" class="input " v-model="date" :placeholder="$str('datePickerPlaceholder')"
                   @click="onDate"  readonly/>
            <i class="material-icons color-darkgray h1 p-absolute icon-style ">calendar_today</i>
        </div>
        <div id="datePickerWrapper" class="mt-2 d-none p-absolute date-picker-wrapper">
            <v-date-picker width="254" v-model="date" @input="onPickDate(date)"></v-date-picker>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'datePicker',
        data: () => ({
            date: null,
        }),
        methods: {
            onDate() {
                document.getElementById("datePickerWrapper").style.display = "block";
            },
            onPickDate(date) {
                document.getElementById("datePickerWrapper").style.display = "none";
                this.date = date;
                this.$emit('date', date);
            }
        }
    })

</script>

<style scoped>
    .icon-style {
        right: 6px;
        top: 2px;
        pointer-events: none;
    }

    .date-picker-wrapper {
        z-index: 1;
    }
</style>