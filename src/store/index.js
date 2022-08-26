import { createStore } from 'vuex'

export default createStore({
    state: {
        checklist: null,
        riskPreferences: { maxRisk: 0, rewardRatio: 0 },
    },

    getters: {
    },

    mutations: {
        setChecklist(state, items) {
            // Update global store with incoming data
            const data = JSON.stringify(items);
            state.checklist = JSON.parse(data);

            // Also override local storage object to persist changes
            localStorage.setItem('checklist', data);
        },

        setRiskPreferences(state, value) {
            // Update global store with incoming data
            const data = JSON.stringify(value);
            state.riskPreferences = JSON.parse(data);

            // Also override local storage object to persist changes
            localStorage.setItem('riskPreferences', data);
        },
    },

    actions: {
    },

    modules: {
    }
})
