<template>
    <q-dialog v-model="alert">
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
        title="Email"
        icon="email"
        :done="done1"
      >
        <q-input
         outlined
         v-model="email"
         label="Email" 
         hint="Please enter your email"
         lazy-rules
        :rules="[val => !!val || 'E-mail is required',val => /.+@.+/.test(val) || 'E-mail must be valid']"
         />

        <span class="q-mt-md " style="display:inline-block">Don't have an ID ? <span @click="registerModel" class="text-subtitle2">Please register</span> </span>
        <q-stepper-navigation>
          <q-btn :disable="email == null || email == '' ? true : false"  @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Password"
        icon="lock"
        :done="done2"
      >
        <q-input
         outlined
         required
         type="password"
         v-model="password"
         label="Password"
         hint="Please enter your password"
         lazy-rules
         :rules="[val => val && val.length > 0 || 'Password is required']"
         />

        <q-stepper-navigation>
          <q-btn :disable="password == null || password == '' ? true : false" @click="login" color="primary" label="Login" />
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
    const alert = ref(false)
    const confirm = ref(false)
    const prompt = ref(false)
    
    // stepper 
    const step = ref(1)
    const done1 = ref(false)
    const done2 = ref(false)
    
    function registerModel() {
      bus.emit('show-register-model') // go to register component
      alert.value = false
    }

    // login 
    const email = ref(null)
    const password = ref(null)

    async function login() {
       await authStore.login(email.value, password.value)
       if($q.sessionStorage.getItem('auth') == true) {
        alert.value = false
        bus.emit('update-login-sidebar') // go to layout
       }
    }
    onMounted(() => {
        bus.on('show-login-model', () => {
            alert.value = true
        })
    })
</script>