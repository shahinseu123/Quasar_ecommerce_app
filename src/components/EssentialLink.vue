<template>
  <div class="q-pa-md" >
    <q-list padding class="">
      <q-item
        clickable
        v-ripple
        active-class="my-menu-link"
        @click="myAcc_or_login()"
      >
        <q-item-section avatar>
          <q-icon :name="auth === true ? 'person' : 'person_add'" />
        </q-item-section>

        <q-item-section>{{ auth === true ? 'Account' : 'Login/Signup'}}</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'outbox'"
        @click="link = 'outbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="shopping_basket" />
        </q-item-section>

        <q-item-section>Orders</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'trash'"
        @click="link = 'trash'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="shopping_cart" />
        </q-item-section>

        <q-item-section>Cart</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'settings'"
        @click="link = 'settings'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>

        <q-item-section>Settings</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'help'"
        @click="link = 'help'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="help" />
        </q-item-section>

        <q-item-section>Help</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
 // event bus 
 import { inject } from 'vue'
  const bus = inject('bus')
  const props = defineProps({
    auth: Boolean,
  })
  function myAcc_or_login() {
     if(props.auth == true) {
      console.log('my account')
     } else {
      bus.emit('show-login-model') //go to login component
      bus.emit('close-left-sidebar') //go to main layout

     }
  }
</script>
<style scoped>
  .my-menu-link{
    color: teal;
  }
</style>