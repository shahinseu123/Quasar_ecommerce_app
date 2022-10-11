import { defineStore } from "pinia";
import { api } from '../boot/axios'
export const useSliderStore = defineStore('slider', {
    state: () => ({
        sliders: []
     }),
     getters: {
       
     },
     actions: {
        async getSlider() {
         try {
             const res = await api.get('api/slider')
             this.sliders = res.data
         } catch (error) {  
             console.log(error)
         }
        }
     }
})