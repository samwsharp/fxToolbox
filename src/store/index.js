import { createStore } from 'vuex'

export default createStore({
    state: {
        checklist: null,
    },

    getters: {
    },

    mutations: {
        checklist (state, items) {
            // Update global store with incoming data
            const data = JSON.stringify(items);
            state.checklist = JSON.parse(data);

            // Also override local storage object to persist changes
            localStorage.setItem('checklist', data);
        },
    },

    actions: {
    },

    modules: {
    }
})
