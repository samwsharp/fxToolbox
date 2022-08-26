<template>
    <transition :name="transition">
    <div class="modal-container" @click.self="modal.close()" v-if="state.show">
        <div class="modal-body">
            <component ref="anonComponent" :is="state.component"></component>
        </div>
    </div>
    </transition>
</template>

<script>
import { ref, reactive, inject, computed } from 'vue'

export default {
    name: 'VueModal',

    setup() {
        const anonComponent = ref(null);

        const state = reactive({ config: { animate: false }, component: null, show: false });
        const transition = computed(() => (! state.config.animate) ? null : 'fade');

        // Update the local state once the open-modal event is received
        document.addEventListener('_modal_open', (e) => {
            state.show = true;
            state.component = e.detail.component;
            state.config = e.detail.config;
        }, false);

        // Update the local state once the close-modal event is received
        document.addEventListener('_modal_close', (e) => {
            if (typeof anonComponent.value?.onModalClose === "function") {
                anonComponent.value?.onModalClose();
            }

            state.show = false;
            state.component = null;
        }, false);

        return {
            state,
            transition,
            anonComponent,
            modal: inject('modal')
        };
    }
}
</script>

<style scoped>
.modal-container {
    position: absolute;
    background-color: rgba(0,0,0,0.8);
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100vh;
    z-index: 9999;
}

.modal-body {
    width: 75%;
    margin: 0px auto;
    margin-top: 10%;
    background-color: white;
    border-radius: 5px;
    /* animation: open 0.25s ease; */
}

@keyframes open {
    0% {
        transform: scale(0.5, 0.5);
    }
    100% {
        transform: scale(1, 1);
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
