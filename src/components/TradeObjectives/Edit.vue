<template>
    <div class="pt-7 px-7">
        <div class="flex justify-between mb-2">
            <h2 class="uppercase font-semibold text-xl">Manage trade objectives</h2>
            <button @click="newChecklistItem" class="w-10 font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto bi bi-plus-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/> </svg></button>
        </div>
        <div class="grid grid-cols-1">
            <div v-for="(item, index) in data.checklist" class="mt-3 grid gap-2 grid-cols-12">
                <input v-model="item.label" class="p-3 rounded bg-gray-100 col-span-11" placeholder="Write a cool description" />
                <div @click="deleteChecklistItem(index)" class="flex justify-center items-center bg-gray-100 rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-gray-400 bi bi-x-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/> </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-end mt-7 p-4 bg-gray-100 rounded-b-lg">
        <div class="w-1/4 grid grid-cols-1">
            <button @click="complete" class="text-center py-3 text-sm rounded-lg bg-sky-600 text-white">Done</button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, inject } from 'vue'

export default {
    name: "EditTradeObjectives",

    setup() {
        const store = useStore();
        const modal = inject('modal');

        const data = reactive({
            "show": false,
            "checklist": []
        });

        onMounted(() => {
            // Hydrate local state from vue store
            data.checklist = JSON.parse(JSON.stringify(store.state.checklist));
        });

        const newChecklistItem = () => {
            // Push blank checklist object to local state
            data.checklist.push({ checked: false, label: "" });
        };

        const deleteChecklistItem = (index) => {
            // Remove given checklist item from local state
            data.checklist.splice(index, 1);
        };

        const complete = () => {
            // Save changes and close the modal
            store.commit('setChecklist', data.checklist);
            modal.close();
        };

        return {
            data,
            complete,
            newChecklistItem,
            deleteChecklistItem,
        }
    }
}
</script>
