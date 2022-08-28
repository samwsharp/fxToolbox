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
        pipValue(state) {
            // The value of a single pip for the given currency pair
            return (/JPY$/.test(state.pair)) ? 100/state.askPrice : 1/state.askPrice;
        },

        lots(state, getters) {
            // The lot size of the trade
            return getters.tradeRisk/(state.stopSize * getters.pipValue);
        },

        fees(state, getters) {
            // Any fees incurred as a result of the lot size used
            return 3.5 * (getters.lots / 0.5);
        },

        tradeRisk(state,getters) {
            // The maximum dollar risk per trade excluding any fees
            const stop = state.stopSize*getters.pipValue;
            return state.riskPreferences.maxRisk/((3.5/stop/0.5)+1);
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
