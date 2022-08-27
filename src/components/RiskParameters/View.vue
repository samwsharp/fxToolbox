<template>
    <div class="w-5/6 cursor-pointer bg-green-200 rounded mx-auto my-5 p-5" @click="copy(lots)">
        <div class="grid grid-cols-4">
            <p class="mb-0"><strong>Risk:</strong> ${{ risk }}</p>
            <p class="mb-0 text-center"><strong>Fees:</strong> ${{ fees }}</p>
            <p class="mb-0 text-center"><strong>Lots:</strong> {{ lots }}</p>
            <p class="mb-0 text-right"><strong>R:</strong> {{ r }} (${{ rDollars }})</p>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { inject, computed } from 'vue'

export default {
    name: 'ViewRiskParameters',

    setup() {
        const store = useStore();

        const displayNumber = inject('displayNumber');
        const copy = inject('copy');

        return {
            copy,
            risk: computed(() => displayNumber(store.getters.tradeRisk)),
            r: computed(() => displayNumber(store.getters.rValue)),
            fees: computed(() => displayNumber(store.getters.fees)),
            lots: computed(() => displayNumber(store.getters.lots)),
            rDollars: computed(() => displayNumber(store.getters.rDollars)),
        }
    }
}
</script>
