import { defineStore } from "pinia";
import { api } from '../boot/axios'
import { SessionStorage } from "quasar";
import { Notify } from 'quasar'


export const useAuthStore = defineStore('auth', {
    state: () => ({
       authUser: {}
    }),
    getters: {

    },
    actions: {
        async login(email, password) {
         try {
            let res = await fetch('http://localhost:8000/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  email: email,
                  password: password
                })
              });
             if(res.status == 200) {
                SessionStorage.set('auth', true)
                this.getAuthUser()
             } else {
                Notify.create({
                    message: 'Login unsuccessfull, Please check credentials',
                    position: 'bottom-left',
                    color:'white',
                    textColor: 'black'
                })
             }
         } catch (error) {
            console.log(error)
         }   
        },

        async getAuthUser() {
            const res = await api.get('api/auth/user', {withCredentials: true}) 
            if (res.status === 200) {
                this.authUser = res.data
                SessionStorage.set(
                    "authUser",
                    JSON.stringify(res.data)
                  );
            } else {
                Notify.create({
                    message: 'There is something wrong, please try again later',
                    position: 'bottom-left',
                    color:'white',
                    textColor: 'black'
                })
            }
        },

        async register(userName, email, phone, password, password_confirmation) {
            try {
                let res = await fetch(`http://localhost:8000/api/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                      name: userName,
                      email: email,
                      phone: phone,
                      password: password,
                      password_confirmation: password_confirmation
                    })
                  });
             if(res.status == 200) {
                SessionStorage.set('auth', true)
                this.getAuthUser()
             } else {
                Notify.create({
                    message: 'Registration unsuccessfull, Please try again',
                    position: 'bottom-left',
                    color:'white',
                    textColor: 'black'
                })
             }
             } catch (error) {
                Notify.create({
                    message: 'Email or Phone number already exist',
                    position: 'bottom-left',
                    color:'white',
                    textColor: 'black'
                })
             }
        }
    }
})