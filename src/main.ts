import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles.css'
import './overrides.css'

// App.vue acts as the shared portfolio shell and renders the selected page.
// Hash history keeps deep links working on static hosts without rewrite rules.
const pageMarker = { render: () => null }
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: pageMarker },
    { path: '/work', component: pageMarker },
    { path: '/skills', component: pageMarker },
    { path: '/journey', component: pageMarker },
    { path: '/about', component: pageMarker },
    { path: '/field-notes', component: pageMarker },
    { path: '/contact', component: pageMarker },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
