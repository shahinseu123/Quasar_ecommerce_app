import { boot } from 'quasar/wrappers'
import { LocalStorage, SessionStorage } from 'quasar'


let value = sessionStorage.getItem('auth')
export default boot(({ app }) => {
  app.config.globalProperties.$AUTH = value;
})