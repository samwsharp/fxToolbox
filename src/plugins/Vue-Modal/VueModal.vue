<template>
    <transition name="fade">
    <div class="modal-container" @click.self="modal.close()" v-if="state.show">
        <div class="modal-body">
            <component ref="childComponent" :is="state.component" @hook:mounted="ready"></component>
        </div>
    </div>
    </transition>
</template>

<script>
import { ref, reactive, inject, computed } from 'vue'

export default {
    name: 'VueModal',

    setup() {
        const childComponent = ref(null);

        const state = reactive({
            component: null,
            show: false
        });

        // Update the local state once the open-modal event is received
        document.addEventListener('_modal_open', (e) => {
            state.component = e.detail.component;
            state.show = true;
        }, false);

        // Update the local state once the close-modal event is received
        document.addEventListener('_modal_close', (e) => {
            if (typeof childComponent.value?.onModalClose === "function") {
                childComponent.value?.onModalClose();
            }

            state.show = false;
            state.component = null;
        }, false);

        const ready = () => {
            if (! childComponent) return;

            document.dispatchEvent(
                new CustomEvent('_modal_opened', { detail: {ref: childComponent.value} })
            );
        };

        return {
            state,
            ready,
            childComponent,
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
