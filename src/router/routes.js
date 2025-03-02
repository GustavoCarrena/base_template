export default [
   { path: '/', redirect: '/home' },
  {path: '/login', name:'login', component: () => import('@/views/LoginView.vue'), meta: {requiresAuth: false}},
  {path: '/home', name:'home', component: () => import('@/views/HomeView.vue'), meta: {requiresAuth: true}},
  {path: '/:pathMatch(.*)*', name:'not-found', component: () => import('@/views/NotFoundView.vue'), meta: {requiresAuth: false}}
]

