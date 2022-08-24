<template>
    <div class="bg-sky-600 w-100 h-2"></div>
    <h1 class="text-xl font-bold text-center mt-9 text-white">Fx<span class="text-sky-600"><i>Toolbox</i></span></h1>
    <div class="w-5/6 mx-auto rounded calculator my-5 p-2">
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
    <trade-checklist @complete="data.canTakeTrade = $event"></trade-checklist>
    <div @mousedown="data.copyingToClipboard = true" @click="copyLotsToClipboard()" class="w-5/6 cursor-pointer rounded mx-auto my-5 p-5" :class="{'bg-green-200': data.canTakeTrade, 'bg-red-200': !data.canTakeTrade, 'bg-emerald-200': data.copyingToClipboard }">
        <div class="grid grid-cols-4">
            <p class="mb-0"><strong>Risk:</strong> ${{ $filters.toFixed(risk) }}</p>
            <template v-if="data.pips">
                <p class="mb-0 text-center"><strong>Fees:</strong> ${{ $filters.toFixed(fees) }}</p>
                <p class="mb-0 text-center"><strong>Lots:</strong> {{ $filters.toFixed(lots) }}</p>
                <p class="mb-0 text-right"><strong>R:</strong> {{ $filters.toFixed(r) }} (${{ $filters.toFixed(fees+(data.maxRisk*3)) }})</p>
            </template>
        </div>
    </div>
    <h1 class="text-center mt-5 font-semibold text-white text-sm"><i>By Sam Sharp</i></h1>
    <global-modal></global-modal>
    <div @click="modal.open('manage-checklist')" class="rounded-full text-white bg-sky-600 absolute p-2 bottom-5 right-5 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg>
    </div>
    <div @click="modal.open('manage-risk')" class="rounded-full text-white bg-sky-600 absolute p-2 bottom-5 right-16 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16"> <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/> </svg>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, reactive, onMounted, computed, watch } from 'vue'

export default {
    name: 'FxSizer',

    inject: ['modal'],

    setup () {
        const store = useStore();

        const data = reactive({
            fxPairs: [ "EURUSD", "GBPUSD", "USDJPY", "EURJPY", "USDCAD", "USDCHF" ],
            canTakeTrade: false,
            selection: "EURUSD",
            copyingToClipboard: false,
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
                data.copyingToClipboard = false;
            });
        });

        return {
            r,
            data,
            risk,
            lots,
            fees,
            showAskPrice,
            copyLotsToClipboard,
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
