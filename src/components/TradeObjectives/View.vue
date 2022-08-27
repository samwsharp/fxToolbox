<template>
    <div class="bg-gray-800 rounded text-white w-5/6 mx-auto p-5" v-if="data.objectives.length">
        <h1 class="font-bold mb-2">Trade objectives</h1>
        <ul class="ml-5 list-decimal">
            <li v-for="(item, index) in data.objectives">{{ item.label }}</li>
        </ul>
    </div>
</template>

<script>
import { onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'ViewTradeObjectives',

    setup(_, { emit }) {
        const store = useStore();
        const data = reactive({ "objectives": [] });

        onMounted(() => {
            data.objectives = store.state.objectives;
        });

        // Watch store changes and update local state upon changes
        watch(() => store.state.objectives, (value) => {
            data.objectives = store.state.objectives;
        });

        return {
            data
        };
    }
}
</script>
