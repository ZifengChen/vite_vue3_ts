import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import App1 from './App1.vue'
import App2 from './App2.vue'
import router from './router/router'

const app = createApp(App2)

app.use(router)
app.use(createPinia())
app.use(Antd)

app.mount('#app')
