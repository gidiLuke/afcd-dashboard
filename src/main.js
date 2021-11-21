import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import axios from 'axios'
// import VuePictureSwipe from 'vue3-picture-swipe';

// import VueAxios from 'vue-axios'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(store)
app.use(router)
app.use(CoreuiVue)
// app.use(VueAxios, axios)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
// eslint-disable-next-line vue/component-definition-name-casing

app.mount('#app')
