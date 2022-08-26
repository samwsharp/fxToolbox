<template>
    <div class="text-center bg-sky-300 text-black rounded w-5/6 mx-auto py-5" v-if="data.objectives.length">
        <h1 class="font-bold mb-2">Trade objectives</h1>
        <template v-for="(item, index) in data.objectives">
            <input type="checkbox" v-model="item.checked" :id="'__item_'+index">
            <label :for="'__item_'+index" class="ml-2">{{ item.label }}</label><br>
        </template>
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

        // Emit 'complete' once all checkboxes are selected
        watch(() => data.objectives, (value) => {
            if (! value) return;
            emit('complete', value.every(x => x.checked));
        }, { deep: true });

        return { data };
    }
}
</script>
