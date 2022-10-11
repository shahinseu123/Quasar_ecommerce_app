import { defineStore } from "pinia";
import { api } from '../boot/axios'
export const useParallaxStore = defineStore('parallax', {
    state: () => ({
        parallaxs: []
     }),
     getters: {
       
     },
     actions: {
        async getParallax() {
         try {
             const res = await api.get('api/paralax')
             this.parallaxs = res.data
         } catch (error) {  
             console.log(error)
         }
        }
     }
})