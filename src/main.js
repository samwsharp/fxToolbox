import { createApp } from 'vue'

import './index.css'
import store from './store'

import App from './components/App.vue'
import TradeChecklist from './components/TradeChecklist.vue'
import SettingsModal from './components/SettingsModal.vue'

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
app.component('settings-modal', SettingsModal);

app.mount('#app')
