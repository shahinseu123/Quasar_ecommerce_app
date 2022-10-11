import { defineStore } from "pinia";
import { api } from '../boot/axios'
export const useBrandStore = defineStore('brand', {
    state: () => ({
        brands: []
     }),
     getters: {
        chunkedBrand: (state) => {
         const chunkLength = 6
         const chunkedArray = []
         for (let i = 0; i < state.brands.length; i += chunkLength) {
             const chunk = state.brands.slice(i, i + chunkLength);
             chunkedArray.push(chunk);
         }
         return chunkedArray  ;
        }
     },
     actions: {
        async getBrand() {
         try {
             const res = await api.get('api/brands')
             this.brands = res.data
         } catch (error) {  
             console.log(error)
         }
        }
     }
})