<template>
    <div class="p-7">
        <div class="flex justify-between mb-2">
            <h2 class="uppercase font-semibold text-xl">Manage trade objectives</h2>
            <button @click="add" class="w-10 font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto bi bi-plus-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/> </svg></button>
        </div>
        <div class="grid grid-cols-1">
            <div v-for="(item, index) in data.objectives" class="mt-3 grid gap-2 grid-cols-12">
                <input v-model="item.label" class="p-3 rounded bg-gray-100 col-span-11" placeholder="Write a cool description" />
                <div @click="del(index)" class="flex justify-center items-center bg-gray-100 rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-gray-400 bi bi-x-circle-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/> </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-end p-4 mt-3 bg-gray-100 rounded-b-lg border-t border-gray-300">
        <button @click="modal.close()" class="text-center py-2 px-16 text-sm rounded font-semibold bg-sky-600 text-white">Done</button>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, reactive, inject } from 'vue'

export default {
    name: "EditTradeObjectives",

    emits: ["hook:mounted"],

    setup() {
        const store = useStore();
        const modal = inject('modal');

        const data = reactive({
            "show": false,
            "objectives": []
        });

        const onModalClose = () => saveToStore();

        onMounted(() => {
            // Hydrate local state from vue store
            data.objectives = JSON.parse(JSON.stringify(store.state.objectives));
        });

        const saveToStore = () => store.commit('storeLocally',{
            data: data.objectives,
            key: 'objectives',
        });

        // Add and remove objectives from local state
        const add = () => data.objectives.push({ checked: false, label: "" });
        const del = (index) => data.objectives.splice(index, 1);

        return {
            add,
            del,
            data,
            modal,
            onModalClose,
        }
    }
}
</script>
