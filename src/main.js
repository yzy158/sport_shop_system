import { createApp } from 'vue'
import App from './App.vue'
//导入路由
import router from './router'
//导入pinia状态管理工具
import pinia from './store'
//导入element-plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//导入elementplus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//导入svg图标
import 'virtual:svg-icons-register'
//引入全局样式
import '@/assets/css/common.scss'

//创建实例
const app = createApp(App)
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
	app.component(key,component)
}
app.use(ElementPlus,{
	locale:zhCn
})

app.use(router).use(pinia).mount('#app')
