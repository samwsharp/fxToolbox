import { createApp } from 'vue'
import { modal } from './modal'

import './index.css'
import store from './store'

import App from './components/App.vue'
import TradeChecklist from './components/TradeChecklist.vue'
import GlobalModal from './components/GlobalModal.vue'
import ManageRisk from './components/ManageRisk.vue'
import MangeChecklist from './components/ManageChecklist.vue'

const app = createApp(App).use(store);

// Define global filters
app.config.globalProperties.$filters = {
    toFixed(value, pos = 2) {
        return value.toFixed(pos);
    }
}

// Hydrate store with local storage data
store.state.checklist = JSON.parse(localStorage.getItem('checklist')) ?? [];

// Register global components
app.component('trade-checklist', TradeChecklist);
app.component('manage-risk', ManageRisk);
app.component('manage-checklist', MangeChecklist);
app.component('global-modal', GlobalModal);

app.provide('modal', modal);

app.mount('#app')
