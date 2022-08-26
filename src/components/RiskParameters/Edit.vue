<template>
    <div class="p-7 pb-5">
        <h2 class="uppercase font-semibold text-xl">risk preferences</h2>
        <div class="py-5 grid grid-cols-2 gap-2">
            <div class="flex flex-col">
                <label class="uppercase text-gray-400 text-xs font-bold mb-2">Max Risk ($)</label>
                <input class="bg-gray-100 rounded p-2" v-model="state.maxRisk" type="number">
            </div>
            <div class="flex flex-col">
                <label class="uppercase text-gray-400 text-xs font-bold mb-2">Risk Reward Ratio (x)</label>
                <input class="bg-gray-100 rounded p-2" v-model="state.rewardRatio" type="number">
            </div>
        </div>
    </div>
    <div class="flex justify-end p-4 bg-gray-100 rounded-b-lg border-t border-gray-300">
        <button @click="complete" class="text-center py-2 px-16 text-sm rounded font-semibold bg-sky-600 text-white">Done</button>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, inject, onMounted } from 'vue'

export default {
    name: 'EditRiskParameters',

    setup() {
        const store = useStore();
        const modal = inject('modal');

        const state = reactive({
            maxRisk: 0,
            rewardRatio: 0,
        });

        onMounted(() => {
            // Hydrate local state from vue store
            const riskPreferences = JSON.parse(JSON.stringify(store.state.riskPreferences));

            state.maxRisk = riskPreferences.maxRisk;
            state.rewardRatio = riskPreferences.rewardRatio;
        });

        const complete = () => {
            // Save changes and close the modal
            store.commit('setRiskPreferences', {
                maxRisk: state.maxRisk,
                rewardRatio: state.rewardRatio
            });

            modal.close();
        };

        return {
            modal,
            state,
            complete,
        }
    }
}
</script>
