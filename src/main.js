import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


const app = createApp(App);

// Filters
app.config.globalProperties.$filters = {
    toFixed(value, pos = 2) {
        return value.toFixed(pos);
    }
}

app.mount('#app')
