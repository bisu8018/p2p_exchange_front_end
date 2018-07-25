<template>
    <div>
        <input type="text" class="common-input " v-model="date" :placeholder="$str('datePickerPlaceholder')" @click="onDate" readonly/>
        <div id="datePickerWrapper" class="mt-2">
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
                this. date = date;
                this.$emit('date', date);
            }
        }

    })

</script>

<style scoped>
</style>