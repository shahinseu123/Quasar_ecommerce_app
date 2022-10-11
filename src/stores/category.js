import { defineStore } from "pinia";
import { api } from '../boot/axios'
export const useCategoryStore = defineStore('category', {
    state: () => ({
       categories: [],
       categoryProduct: []
    }),
    getters: {
       chunkedCategory: (state) => {
        const chunkLength = 6
        const chunkedArray = []
        for (let i = 0; i < state.categories.length; i += chunkLength) {
            const chunk = state.categories.slice(i, i + chunkLength);
            chunkedArray.push(chunk);
        }
        return chunkedArray  ;
       }
    },
    actions: {
       async getCategory() {
        try {
            const res = await api.get('api/all-category')
            this.categories = res.data
        } catch (error) {  
            console.log(error)
        }
       },
       async getCategoryProduct() {
        try {
            const res = await api.get('api/category/product')
            this.categoryProduct = res.data
        } catch (error) {  
            console.log(error)
        }
       }
    }
})