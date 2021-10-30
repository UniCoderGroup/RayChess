import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import konvaPlugin from './core/konva'
createApp(App).use(store).use(router).use(konvaPlugin).mount('#app')
