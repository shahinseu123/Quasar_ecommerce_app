<template>
    <q-dialog v-model="register">
      <q-card style="width: 100%">
<q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="User Info"
        icon="person"
        :done="done1"
      >
         <q-input
          class="q-mb-sm"
          type="text"
          required
          outlined
          v-model="name"
          label="Name"
          lazy-rules
         :rules="[val => !!val || 'Name is required']"
               />
         <q-input
          class="q-mb-sm"
          required
          type="email"
          outlined
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[val => !!val || 'E-mail is required',val => /.+@.+/.test(val) || 'E-mail must be valid']"
           />
         <q-input
          type="number"
          required
          outlined
          v-model="phone"
          label="Phone"
          lazy-rules
          :rules="[val => !!val ||'Phone number is required']"
              />
          <span class="q-mt-md " style="display:inline-block">Already registered ? <span @click="loginModel" class="text-subtitle2">Please login</span> </span>
        <q-stepper-navigation>
          <q-btn :disable="name == null || email == null || phone == null ||name == ''||email == ''|| phone == '' ? true : false" @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Password"
        icon="lock"
        :done="done2"
      >
        <q-input
         type="password"
         required
         class="q-mb-sm"
         outlined
         v-model="password"
         label="Password"
         lazy-rules
         :rules="[val => val && val.length > 0 ||'Password is required']"
              />
        <q-input
         type="password"
         outlined
         v-model="password_confirmation"
         label="Confirm password"
         lazy-rules
         :rules="[val => val && password == val ||'Password does not match']"
          />
        <q-stepper-navigation>
          <q-btn @click="registerUser" color="primary" label="Register" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
      </q-card>
    </q-dialog>
</template>
<script setup>
    // event bus 
    import { inject } from 'vue'
    import {useQuasar} from 'quasar'
    const $q = useQuasar()
    const bus = inject('bus')
    import {useAuthStore} from '../../stores/auth'
    const authStore = useAuthStore()

    import { ref, onMounted } from 'vue'
    const register = ref(false)
    const confirm = ref(false)
    const prompt = ref(false)
    
    // stepper 
    const step = ref(1)
    const done1 = ref(false)
    const done2 = ref(false)
    const done3 = ref(false)
    
    function loginModel() {
        register.value = false
        bus.emit('show-login-model')
    }
    
    const name = ref(null)
    const email = ref(null)
    const phone = ref(null)
    const password = ref(null)
    const password_confirmation = ref(null)
    async function registerUser() {
          await authStore.register(name.value, email.value, phone.value, password.value, password_confirmation.value)
          if($q.sessionStorage.getItem('auth') == true) {
            register.value = false
             bus.emit('update-login-sidebar') // go to layout
          }
    }
    onMounted(() => {
        bus.on('show-register-model', () => {
            register.value = true
        })
    })
</script>