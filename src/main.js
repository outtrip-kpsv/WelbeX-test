import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import {axios} from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(router, VueAxios, axios).mount('#app')

