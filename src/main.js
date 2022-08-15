import { createApp } from 'vue'

import App from './components/App.vue'
import TradeChecklist from './components/TradeChecklist.vue'

import './index.css'

const app = createApp(App);

// Filters
app.config.globalProperties.$filters = {
    toFixed(value, pos = 2) {
        return value.toFixed(pos);
    }
}

// Register global components
app.component('trade-checklist', TradeChecklist);

app.mount('#app')
