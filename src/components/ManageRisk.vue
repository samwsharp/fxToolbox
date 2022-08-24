<template>
    <div class="p-7">
        <h2 class="text-xl mb-2">Manage risk objectives</h2>
        <button @click="modal.close()">close</button>
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    name: 'ManageRisk',

    setup() {
        const modal = inject('modal');

        return {
            modal
        }
    }
}
</script>
