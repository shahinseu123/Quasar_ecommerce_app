<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <q-toolbar>
        <q-btn
          v-if="currentRoute.name !== 'search'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-btn
          v-if="currentRoute.name == 'search'"
          to="/"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
        />

        <q-toolbar-title v-if="currentRoute.name !== 'search'">
          Pharmacia
        </q-toolbar-title>
        <q-space />

        <div :class="currentRoute.name === 'search' ? 'flex_between':'flex_between_not_100'">
            <div v-if="currentRoute.name === 'search'" style="width:100%">
              <q-input  class="w__full" outlined v-model="searchText" label-color="gray" label="Search..." />
            </div>
            <div :class="currentRoute.name == 'search' ? 'flex_end q-mt-sm':'flex_between_not_100 q-mt-sm'">
              <q-btn v-if="currentRoute.name !== 'search'" @click="gotosearch" class="cursor-pointer" flat round color="blue-grey-5" icon="search" />
              <q-btn @click="drawerRight = !drawerRight" dense color="blue-grey-5" round flat icon="shopping_cart">
                <q-badge v-show="cartQnty !== 0" color="red" floating transparent>
                  {{cartQnty}}
                </q-badge>
              </q-btn>
            </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <EssentialLink :auth="auth" />
      </q-list>
    </q-drawer>
        <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        bordered
        :width="300"
        :breakpoint="500"
        class="bg-grey-3"
      >
        <q-scroll-area class="fit" style="background-color:white">
          <div class="">
            <cart />
          </div>
        </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  <login />
  <register />
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import login from '../components/auth/login.vue'
import register from '../components/auth/register.vue'
import cart from '../components/cart/cart.vue'
import { useQuasar } from 'quasar'
const {push, currentRoute} = useRouter()
console.log(useRouter())
// event bus 
import { inject } from 'vue'
const bus = inject('bus')
const cartQnty = ref(0)
const auth = ref(false)
const leftDrawerOpen = ref(false)
const drawerRight = ref(false)
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const searchText = ref('')

// watch works directly on a ref
watch(searchText, (newSearchText, oldSearchText) => {
  if (newSearchText.indexOf('?') > -1) {
    
  } else {
    bus.emit('search-event', searchText.value) // going to search page
  }
})


// session storage for auth 
 const $q = useQuasar()

  // search function 
  function gotosearch() {
    push({ path: '/product/search' })
  }
    onMounted(() => {  
      try {
        if($q.sessionStorage.isEmpty()) {
          $q.sessionStorage.set('auth', false)
        } else {
          if($q.sessionStorage.has('auth')) {
             auth.value = $q.sessionStorage.getItem('auth')
          } else {
            console.log('user is unauth')  
          }
        }
      } catch (e) {
        console.log(e)
      }
      bus.on('close-left-sidebar', () => {
        leftDrawerOpen.value = false
      })
      
      bus.on("add-to-cart", () => {
        if ($q.sessionStorage.getItem("cartProduct") != undefined) {
          let cartItems = JSON.parse($q.sessionStorage.getItem("cartProduct"));
          cartQnty.value = cartItems.length;
        }
      });
      bus.on('update-login-sidebar',() => {
        auth.value = $q.sessionStorage.getItem("auth")
      })
    })
</script>
<style>
  body{
    background-color: aliceblue;
  }
  .w__full{
    width: calc(100%);
  }
  .flex_between{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .flex_between_not_100{
    display: flex;
    justify-content: end;
  }
  .flex_end{
    display: flex;
    justify-content: end;
    width: 40px;
  }
  .q-field__control{
    height: 41px !important;
  }
</style>