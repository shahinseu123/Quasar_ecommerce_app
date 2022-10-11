<template>
    <q-header class="bg-white text-black">
      <q-toolbar>
        
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          QPharma
        </q-toolbar-title>

        <div>
          <q-btn flat round color="blue-grey-5" icon="search" />
          <q-btn @click="drawerRight = !drawerRight" dense color="blue-grey-5" round flat icon="shopping_cart">
            <q-badge color="red" floating transparent>
              4
            </q-badge>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <EssentialLink />
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
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            
          </div>
        </q-scroll-area>
    </q-drawer>

</template>
<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import {ref} from 'vue'
    const leftDrawerOpen = ref(false)
    const drawerRight = ref(false)
    const toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value
    }

</script>