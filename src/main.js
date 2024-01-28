/*import { createApp } from 'vue'
import App from './app2.vue'

createApp(App).mount('#app')*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')