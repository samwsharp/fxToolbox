import store from './store'

export const modal = {
    open: (component) => {
        store.state.modal._component = component;
        store.state.modal._show = true;
    },
    close: () => {
        store.state.modal._component = null;
        store.state.modal._show = false;
    },
};
