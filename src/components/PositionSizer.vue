<template>
    <div class="w-5/6 mx-auto rounded calculator my-5 p-2">
        <div class="grid gap-2">
            <div class="grid grid-cols-3 gap-2">
                <select v-model="data.pair" class="col-span-2 outline-0 rounded p-1 py-2 bg-white border-2 border-sky-600">
                    <option v-for="pair in pairs" :value="pair">{{ pair }}</option>
                </select>
                <div class="grid grid-cols-2 gap-2">
                    <button class="p-1 text-white bg-sky-600 font-bold rounded" @click="reduceEntry">-</button>
                    <button class="p-1 text-white bg-sky-600 font-bold rounded" @click="incrementEntry">+</button>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <input class="p-1 border-2 rounded border-sky-600" v-model="data.entry" type="number" placeholder="Entry Price"/>
                <input class="p-1 border-2 rounded border-sky-600" v-model="data.stop" type="number" placeholder="Stop Price"/>
                <input type="text" class="p-1 border-2 border-sky-600 rounded" :value="'Pipette stop: '+stopSize" disabled />
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, reactive, computed, watch } from 'vue'

export default {
    name: 'PositionSizer',

    setup () {
        const store = useStore();

        const pairs = [ "EURUSD", "GBPUSD", "USDJPY", "EURJPY", "USDCAD", "USDCHF" ];
        const data = reactive({ pair: "EURUSD", entry: null, stop: null });

        const reduceEntry = () => {
            data.entry -= 1/pipSize.value
        };

        const incrementEntry = () => {
            data.entry += 1/pipSize.value
        };

        const pipSize = computed(() => (/JPY$/.test(data.pair)) ? 1000 : 100000);
        const stopSize = computed(() => Math.round(Math.abs(data.entry - data.stop)*pipSize.value));

        watch((stopSize), (value) => store.state.stopSize = value);
        watch(() => data.entry, (value) => store.state.askPrice = value);

        watch(() => data.pair, (value) => {
            data.entry = 1;
            data.stop = 1;
            store.state.pair = value;
        });

        return {
            data,
            pairs,
            pipSize,
            stopSize,
            reduceEntry,
            incrementEntry,
        };
    }
}
</script>

<style scoped>
.calculator {
    background: rgb(200,200,200);
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(244,242,242,1) 100%);
}
</style>
