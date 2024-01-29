import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import App1 from './App1.vue'
import router from './router/router'

const app = createApp(App1)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
