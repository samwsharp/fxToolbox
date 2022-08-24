<template>
    <div class="absolute bg-slate-900/90 top-0 left-0 w-full h-screen z-50" v-if="show" @click.self="modal.close()">
        <div class="w-3/4 mt-28 mx-auto shadow-md shadow-black bg-white rounded-lg">
            <component :is="component"></component>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, inject } from 'vue'

export default {
    name: 'GlobalModal',

    setup() {
        const store = useStore();
        const modal = inject('modal');

        const component = computed(() => store.state.modal._component);
        const show = computed(() => store.state.modal._show);

        return { component, modal, show };
    }
}
</script>
