<template>
    <div class="bg-gray-800 rounded text-white p-5 cursor-pointer" :class="!data.read ? 'bg-animate' : ''" v-if="data.objectives.length" @click="data.read = true">
        <h1 class="font-semibold mb-2">Trade objectives</h1>
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
        const data = reactive({ "objectives": [], "read": false });

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

<style scoped>
.bg-animate {
    animation: main 2s infinite;
}

@keyframes main {
    0% {background-color: #414546;}
    50% {background-color: #062732;}
    100% {background-color: #414546;}
}
</style>
