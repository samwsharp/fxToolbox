<template>
    <div class="w-5/6 mx-auto rounded calculator my-5 p-2">
        <div class="grid gap-2">
            <div class="grid grid-cols-3 gap-2">
                <select v-model="data.selection" class="outline-0 rounded p-1 py-2 bg-white border-2 border-sky-600">
                    <option v-for="pair in pairs" :value="pair">{{ pair }}</option>
                </select>
                <button class="p-1 text-white bg-sky-600 font-bold rounded" @click="data.pips--">-</button>
                <button class="p-1 text-white bg-sky-600 font-bold rounded" @click="data.pips++">+</button>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <input class="p-1 border-2 rounded border-sky-600" v-model="data.entry" type="number" placeholder="Entry"/>
                <input class="p-1 border-2 rounded border-sky-600" v-model="data.stop" type="number" placeholder="Stop"/>
                <input type="text" class="p-1 border-2 border-sky-600 rounded" :value="stopSize" placeholder="Stop in Pips" disabled />
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
        const data = reactive({ selection: "EURUSD", pips: null, entry: null, stop: null });

        const pipSize = 100000;
        const stopSize = computed(() => Math.round(Math.abs(data.entry - data.stop)*pipSize));

        watch((stopSize), (value) => store.state.stopSize = value);
        watch(() => data.entry, (value) => store.state.askPrice = value);
        watch(() => data.selection, (value) => data.entry = 1);

        return {
            data,
            pairs,
            stopSize
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
