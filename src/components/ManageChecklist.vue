<template>
    <div class="p-7">
        <h2 class="text-xl mb-2">Manage trade objectives</h2>
        <div class="grid grid-cols-1">
            <div v-for="(item, index) in data.checklist" class="mt-3 grid gap-2 grid-cols-12">
                <input v-model="item.label" class="p-3 rounded bg-gray-100 col-span-11" placeholder="Write a cool description" />
                <div @click="deleteChecklistItem(index)" class="flex justify-center items-center bg-gray-100 rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-gray-400 bi bi-x-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/> </svg>
                </div>
            </div>
        </div>
        <div class="flex justify-end mt-7">
            <div class="w-2/4 grid grid-cols-2 gap-2">
                <button @click="newChecklistItem" class="py-4 rounded-lg bg-gray-200 w-full font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto bi bi-plus-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/> </svg></button>
                <button @click="saveChanges" class="text-center py-3 text-sm rounded-lg bg-sky-600 text-white">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, inject } from 'vue'

export default {
    name: "MangeChecklist",

    setup() {
        const store = useStore();
        const modal = inject('modal');
        const data = reactive({ "show": false, "checklist": [] });

        onMounted(() => {
            // Copy from store so to not update the original
            data.checklist = JSON.parse(JSON.stringify(store.state.checklist));
        });

        // Push blank checklist object to local state
        const newChecklistItem = () => {
            data.checklist.push({ checked: false, label: "" });
        };

        // Remove given checklist item from local state
        const deleteChecklistItem = (index) => {
            data.checklist.splice(index, 1);
        };

        // Hydrate store with the updated state
        const saveChanges = () => {
            store.commit('checklist', data.checklist);
            modal.close();
        };

        return {
            data,
            newChecklistItem,
            deleteChecklistItem,
            saveChanges,
        }
    }
}
</script>
