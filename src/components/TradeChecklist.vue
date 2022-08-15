<template>
    <div class="text-center bg-sky-300 text-black rounded w-5/6 mx-auto py-5" v-if="data.checklistItems.length">
        <h1 class="font-bold mb-2">Trade Checklist</h1>
        <template v-for="(item, index) in data.checklistItems">
            <input type="checkbox" v-model="item.checked" :id="'__item_'+index">
            <label :for="'__item_'+index" class="ml-2">{{ item.label }}</label><br>
        </template>
    </div>
</template>

<script>
import { onMounted, reactive, watch } from 'vue'

export default {
    name: 'TradeChecklist',

    setup(_, { emit }) {
        const data = reactive({ "checklistItems": [] });

        onMounted(() => {
            // Retrieve checklist items from local storage
            const checklist = localStorage.getItem('checklist');

            if (! checklist) return;

            data.checklistItems = JSON.parse(checklist);
        });

        // Emit 'complete' once all checkboxes are selected
        watch(() => data.checklistItems, (value) => {
            if (! value) return;
            emit('complete', value.every(x => x.checked));
        }, { deep: true });

        return {
            data,
        }
    }
}
</script>
