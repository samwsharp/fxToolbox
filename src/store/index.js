import { createStore } from 'vuex'

export default createStore({
    state: {
        checklist: null,
    },

    getters: {
    },

    mutations: {
        checklist (state, items) {
            const data = JSON.stringify(items);

            state.checklist = JSON.parse(data);
            localStorage.setItem('checklist', data);
        },
    },

    actions: {
    },

    modules: {
    }
})
