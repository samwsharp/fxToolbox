<template>
    <div class="bg-sky-600 w-100 h-2"></div>
    <h1 class="text-xl font-bold text-center mt-9 text-white">Fx<span class="text-sky-600"><i>Sizer</i></span></h1>
    <div class="w-1/2 mx-auto rounded calculator mt-5 mb-9 p-2">
        <div class="grid gap-2">
            <div class="grid gap-2" :class="showAskPrice ? 'grid-cols-2' : 'grid-cols-1'">
                <select v-model="data.selection" class="outline-0 rounded p-1 py-2 bg-white border-2 border-sky-600">
                    <option v-for="pair in data.fxPairs" :value="pair">{{ pair }}</option>
                </select>
                <input v-if="showAskPrice" class="p-1 border-2 rounded border-sky-600" v-model="data.ask" type="number" placeholder="Ask Price"/>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <input type="text" class="p-1 border-2 border-sky-600 rounded" v-model="data.pips" placeholder="Stop in Pips" autofocus />
                <button class="p-1 text-white bg-sky-600 font-bold rounded" @click="data.pips--">-</button>
                <button class="p-1 text-white bg-sky-600 font-bold rounded" @click="data.pips++">+</button>
            </div>
        </div>
    </div>
    <div v-if="data.pips" @mousedown="data.copyStatus = true" @click="copyLotsToClipboard()" class="w-1/2 cursor-pointer rounded mx-auto mt-5 mb-9 p-5" :class="{'bg-green-200': !sanityCheck, 'bg-red-200': sanityCheck, 'bg-emerald-200': data.copyStatus }">
        <div class="grid grid-cols-2">
            <p class="mb-2"><strong>Risk:</strong> ${{ $filters.toFixed(risk) }}</p>
            <p class="mb-2"><strong>Fees:</strong> ${{ $filters.toFixed(fees) }}</p>
            <p class="mb-0"><strong>Lots:</strong> {{ $filters.toFixed(lots) }}</p>
            <p class="mb-0" :class="sanityCheck ? 'underline' : ''"><strong>R:</strong> {{ $filters.toFixed(r) }} (${{ $filters.toFixed(fees+(data.maxRisk*3)) }})</p>
        </div>
    </div>
    <h1 class="text-center mt-9 font-semibold text-white text-sm"><i>By Sam Sharp</i></h1>
</template>

<script>
import { reactive, onMounted, computed, watch } from 'vue'

export default {
    name: 'FxSizer',

    setup () {
        const data = reactive({
            fxPairs: [ "EURUSD", "GBPUSD", "USDJPY", "EURJPY", "USDCAD", "USDCHF" ],
            selection: "EURUSD",
            copyStatus: false,
            maxRisk: 50,
            pips: null,
            ask: 1,
        });

        // Determine whether or not to show the ask price
        const showAskPrice = computed(() => !["EURUSD", "GBPUSD"].includes(data.selection));

        // Calculate trade lot size
        const lots = computed(() => risk.value / data.pips);

        // Calculate the incurred fees associated with lot size
        const fees = computed(() => lots.value / 0.5 * 3.5);

        // Calculate required R value to make up loss of any fees
        const r = computed(() => ((data.maxRisk*3) + fees.value) / risk.value);

        // Perform a sanity check to ensure the calculated amounts sum up to the max risk specified
        const sanityCheck = computed(() => (r.value > 4.5));

        // Calculate the dollar risk per trade
        const risk = computed(() => {
            let amount = (data.maxRisk / (3.5 / data.pips / 0.5 + 1));

            // Quote currency is JPY
            if (/JPY$/.test(data.selection)) {
                amount = amount/100;
            }

            return  amount * data.ask;
        });

        // Reset ask price upon changing currency pair selection
        watch(() => data.selection, (value) => data.ask = 1);

        // Copy lot size to clipboard
        const copyLotsToClipboard = (() => {
            navigator.clipboard.writeText(lots.value.toFixed(2)).then(() => {
                data.copyStatus = false;
            });
        });

        return {
            r,
            data,
            risk,
            lots,
            fees,
            sanityCheck,
            showAskPrice,
            copyLotsToClipboard
        };
    }
}
</script>

<style>
.calculator {
    background: rgb(200,200,200);
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(244,242,242,1) 100%);
}
</style>
