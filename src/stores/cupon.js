import { defineStore } from "pinia";
import { api } from '../boot/axios'
export const useCuponStore = defineStore('cupon', {
    state: () => ({
        cupon: {}
     }),
     getters: {
        
     },
     actions: {
        async getCupon() {
         try {
             const res = await api.get('api/coupon')
             this.cupon = res.data
         } catch (error) {  
             console.log(error)
         }
        }
     }
})