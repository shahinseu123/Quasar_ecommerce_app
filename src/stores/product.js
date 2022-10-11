import { defineStore } from "pinia";
import { api } from '../boot/axios'
export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
     }),
     getters: {
       
     },
     actions: {
        async getProduct() {
         try {
             const res = await api.get('api/all-product')
             this.products = res.data
         } catch (error) {  
             console.log(error)
         }
        }
     }
})