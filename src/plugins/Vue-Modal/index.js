import VueModal from './VueModal.vue'

let childRef = null;

const mount = (component) => {
    if (childRef) throw "A modal is already initialized!";

    document.dispatchEvent(new CustomEvent('_modal_open', { detail: {component} }));

    return new Promise((resolve, reject) => {
        const maxWaitTime = setTimeout(() => resolve(false), 500);

        document.addEventListener('_modal_opened', (e) => {
            clearTimeout(maxWaitTime);

            childRef = e.detail.ref;
            resolve(childRef);
        }, false);
    });
};

const close = () => {
    document.dispatchEvent(new Event('_modal_close'));
    childRef = null;
};

const getChildRef = () => childRef;

const modal = { mount, close, getChildRef };

export default {
    install: (app, options) => {
        app.component("vue-modal", VueModal);
        app.provide('modal', modal)
    },
};
