import VueModal from './VueModal.vue'

let config;

const modal = {
    open: (component) => {
        // Emit a global "open-modal" event that our component is listening for
        document.dispatchEvent(new CustomEvent('_modal_open', { detail: { component, config } }));
    },

    close: () => {
        // Emit a global "close-modal" event that our component is listening for
        document.dispatchEvent(new Event('_modal_close'));
    },
};

export default {
    install: (app, options) => {
        config = options;
        app.component("vue-modal", VueModal);
        app.provide('modal', modal);
    },
};
