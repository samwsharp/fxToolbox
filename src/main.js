import { createApp } from 'vue'
import VueModal from './plugins/Vue-Modal'

import './index.css'
import store from './store'

import App from './components/App.vue'

const app = createApp(App);

app.use(store).use(VueModal, { animate: true });

import ViewTradeObjectives from './components/TradeObjectives/View.vue'
app.component('view-trade-objectives', ViewTradeObjectives);

import EditTradeObjectives from './components/TradeObjectives/Edit.vue'
app.component('edit-trade-objectives', EditTradeObjectives);

import EditRiskParameters from './components/RiskParameters/Edit.vue'
app.component('edit-risk-parameters', EditRiskParameters);

import ViewRiskParameters from './components/RiskParameters/View.vue'
app.component('view-risk-parameters', ViewRiskParameters);

import PositionSizer from './components/PositionSizer.vue'
app.component('position-sizer', PositionSizer);

import Icon from './components/Icon.vue'
app.component('icon', Icon);

// Define global filters
app.provide('displayNumber', (value) => {
    if (isNaN(value)) return 0;

    const factor = 10**2;
    return Math.floor(value * factor) / factor;
});

// Hydrate store with local storage data
store.state.objectives = JSON.parse(localStorage.getItem('objectives')) ?? [];
store.state.riskPreferences = JSON.parse(localStorage.getItem('riskPreferences')) ?? [];

app.mount('#app')
