<template>
    <div class="w-5/6 cursor-pointer bg-green-200 rounded mx-auto my-5 p-5">
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
import { reactive, inject, onMounted, computed } from 'vue'

export default {
    name: 'ViewRiskParameters',

    setup() {
        const store = useStore();

        const risk = computed(() => store.getters.tradeRisk);
        const r = computed(() => store.getters.rValue);
        const fees = computed(() => store.getters.fees);
        const lots = computed(() => store.getters.lots);
        const rDollars = computed(() => store.getters.rDollars);

        return {
            r,
            risk,
            fees,
            lots,
            rDollars,
        }
    }
}
</script>
