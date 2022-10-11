
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'index',
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'product/:id', component: () => import('src/pages/Product.vue'), name:'product' },
      { path: 'product/search', component: () => import('pages/SearchPage.vue'), name:'search' },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
