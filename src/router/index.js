import { createWebHashHistory, createRouter } from "vue-router"
import routes from './routes'
import { getAuthFromLocalStorage } from "@/helpers/auth"

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, _) => {
  if(to.meta?.requiresAuth && !isAuthenticated()) return {name:'login'}
  })

function isAuthenticated() {
  const auth = getAuthFromLocalStorage()
  return auth ? true : false
}

export default router


