import { createStore } from 'vuex'

export default createStore({
    state: {
        objectives: null,
        riskPreferences: { maxRisk: 0, rewardRatio: 0 },
        pair: "EURUSD",
        stopSize: 0,
        askPrice: 1,
    },

    getters: {
        standardLotSize(state) {
            return (/JPY$/.test(state.pair)) ? 100 : 1;
        },

        lots(state, getters) {
            // The lot size of the trade
            return (getters.tradeRisk / state.stopSize) / getters.standardLotSize;
        },

        fees(state, getters) {
            // Any fees incurred as a result of the lot size used
            return (getters.lots / 0.5 * 3.5);
        },

        tradeRisk(state) {
            // The maximum loss that should be incurred on a trade any excluding fees
            return (state.riskPreferences.maxRisk / (3.5 / state.stopSize / 0.5 + 1));
        },

        target(state) {
            // The desired target amount in the case of a winning trade
            return state.riskPreferences.maxRisk * state.riskPreferences.rewardRatio;
        },

        rDollars(state, getters) {
            // The total profit target including any fees
            return getters.fees + getters.target;
        },

        rValue(state, getters) {
            // The needed risk reward ratio to cover any fees and maintain the profit target
            return getters.rDollars / getters.tradeRisk;
        },
    },

    mutations: {
        storeLocally(state, payload) {
            // Update global store with incoming data
            const data = JSON.stringify(payload.data);
            state[payload.key] = JSON.parse(data);

            // Also override local storage object to persist changes
            localStorage.setItem(payload.key, data);
        },
    },

    actions: {
    },

    modules: {
    }
})
