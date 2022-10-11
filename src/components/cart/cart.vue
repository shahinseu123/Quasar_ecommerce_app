<template>
    <div v-if="promoSubmitted == true">
        <h5 class="text-h6 q-ma-md">Cart Items</h5>
        <q-separator  />
        <div v-if="cartItems.length > 0">
          <div v-for="(item, index) in cartItems" :key="index">
            <cartItem
              :product="item"
              :qntyObj="qntyArray[index]"
              :index="index"
              :promosubmitted="promoSubmitted"
            />
          </div>

        </div>
        <q-separator/>
        <div class="q-ma-md" v-if="coponStore.copon !== {}">
            <span class="text-subtitle1 ">Put the promo code here</span>
            <q-input outlined v-model="copon" label="Promo code" />
            <q-btn @click="submitPromoCode" class="q-my-sm" outline style="width:100%" color="primary" label="Submit promo code" />
        <q-separator />
        </div>
        <div class="q-ma-md">
          <q-card class="no-shadow">
            <p class=" q-mb-xs">Total</p>
            <q-separator/>
            <div class="flex_between q-mt-sm">
                <p>Subtotal</p>
                <p>120 TK</p>
            </div>
            <q-separator/>
            <q-btn class="q-my-sm" outline style="width:100%" color="primary" label="check out" />
          </q-card>
        </div>
    </div>
    <div class="flex_center">
      <h5>Cart is empty</h5>
    </div>
</template>
<script setup>
  import cartItem from '../cart/cart-items.vue'
  import {useCuponStore} from '../../stores/cupon'
  import { onMounted, ref } from 'vue'
  import { useQuasar } from 'quasar'
  const $q = useQuasar()
  const coponStore = useCuponStore()
  const auth = ref(false)
  const  cartItems = ref([])
  const  qntyArray = ref([])
  const  totalPrice = ref(0)
  const  promo_code = ref(null)
  const  discount = ref(0)
  const  showDiscount = ref(false)
  const  newTotal = ref(0)
  const  authUser = ref(null)
  const  promoSubmitted = ref("false")
  const  discountTotalPrice = ref(null)
  const  discountAmount = ref(null)
  const copon = ref(null) 
  const coponObject = coponStore.cupon 

  import { inject } from 'vue'
  const bus = inject('bus')
  
  function submitPromoCode() {
    //  if ($q.sessionStorage.has('auth') && $q.sessionStorage.getItem('auth') == true) {  //check auth
    //    // got to next login 2
    //    if (promo_code != null) { // 2
    //       if (copon.value.cupon_name === this.promo_code) { // 3
            
    //       } else {
    //         // 3
    //         $q.notify({
    //           progress: true,
    //           message: `Promo code does not match`,
    //           icon: 'notifications',
    //           color: 'info',
    //           position:'bottom-left',
    //           textColor: 'white',
    //         })
    //       }
    //    } else {
    //     // else 2
    //         $q.notify({
    //           progress: true,
    //           message: `Please put the promo code before submit`,
    //           icon: 'notifications',
    //           color: 'info',
    //           position:'bottom-left',
    //           textColor: 'white',
    //         })
    //    }
    //  } else {
    //    bus.emit('show-login-model') //go to login component// 1, got to login page
    //  }
  } 


  onMounted(() => {
    if ($q.sessionStorage.getItem("cartProduct") != undefined) {
      cartItems.value = JSON.parse($q.sessionStorage.getItem("cartProduct"));
    }
    if ($q.sessionStorage.getItem("totalPrice") != undefined) {
      totalPrice.value = JSON.parse($q.sessionStorage.getItem("totalPrice"));
    }
    if ($q.sessionStorage.getItem("qntyArray") != undefined) {
      qntyArray.value = JSON.parse($q.sessionStorage.getItem("qntyArray"));
    }
    if ($q.sessionStorage.getItem("authUser") != undefined) {
      authUser.value = JSON.parse($q.sessionStorage.getItem("authUser"));
    }
    if ($q.sessionStorage.getItem("auth") != undefined) {
      auth.value = JSON.parse($q.sessionStorage.getItem("auth"));
    }
    bus.on("total-price", () => {
      totalPrice.value = JSON.parse($q.sessionStorage.getItem("totalPrice"));
    });
    bus.on("add-to-cart", () => {
      if ($q.sessionStorage.getItem("cartProduct") != undefined) {
        cartItems.value = JSON.parse($q.sessionStorage.getItem("cartProduct"));
      }
      if ($q.sessionStorage.getItem("totalPrice") != undefined) {
        totalPrice.value = JSON.parse($q.sessionStorage.getItem("totalPrice"));
      }
      if ($q.sessionStorage.getItem("qntyArray") != undefined) {
        qntyArray.value = JSON.parse($q.sessionStorage.getItem("qntyArray"));
      }
    });
  })
</script>
<style scoped>
.flex_center{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>