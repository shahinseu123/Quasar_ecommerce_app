<template>
    <div class="q-pa-sm" style="background-color:white">
            <div class="row">
                <div class="col-4">
                    <q-img
                        :src="`http://localhost:8000/uploads/media/${product.product_image}`"
                        spinner-color="white"
                        style="height: 100px; max-width: 150px"
                        />
                </div>
                <div class="col-8 q-pa-sm">
                    <div class=" flex_between" style="">
                        <p>{{product.title.substring(0, 10)}}</p>
                        <span class="btn_stockin">{{product.productdata[0].stock > 0 ? 'In stock': 'Out of stock'}}</span>
                    </div>
                    <div class="" style="margin-top:-12px">
                        <div class="flex_between">
                        <p class="price">Price: {{product.productdata[0].sale_price}}TK</p>
                        <span class="addRemove flex_center"><q-icon @click="add" class="plus" name="add" /><span class="zero">{{qntyObj.qnty}}</span><q-icon @click="remove" class="minus" name="remove" /></span>
                        </div>
                    </div>
                    <div class="q-mt-sm" style="margin-bottom:-10px">
                        <div class="flex_between_center">
                        <span class="price">Total price: {{qntyObj.total_price}}TK</span>
                        <q-btn @click="removeFromCart" flat color="red" icon="delete"/>
                        </div>
                    </div>
                </div>
            </div>
            <q-separator />
        </div>
</template>
<script setup>
  const props = defineProps({
    product: Object,
    qntyObj: Object,
    index: Number,
    promosubmitted: Boolean,
  })
    import { inject } from 'vue'
  const bus = inject('bus')
  import {useQuasar} from 'quasar'
  const $q = useQuasar()
  import {ref} from 'vue'
  const itemQntry = ref(1)
  function add() {
     if (props.promosubmitted != "true") {
        if (props.product.productdata[0].stock > 0) {
          if (props.qntyObj.qnty == props.product.productdata[0].stock) {
            $q.notify({
              progress: true,
              message: `${props.product.title} quantity is excedded`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
          } else {
            props.qntyObj.qnty++;
            let productQnty = JSON.parse($q.sessionStorage.getItem("qntyArray"));
            props.qntyObj.total_price =
              props.qntyObj.qnty * props.qntyObj.salePrice;
            productQnty[props.index] = props.qntyObj;
            $q.sessionStorage.set("qntyArray", JSON.stringify(productQnty));
            let totalPrice = $q.sessionStorage.getItem("totalPrice");
            let newTotal =
              parseFloat(totalPrice) + parseFloat(props.qntyObj.salePrice);
            $q.sessionStorage.set("totalPrice", newTotal);
            bus.emit("total-price");
            
          }
        } else {
          $q.notify({
              progress: true,
              message: `${props.product.title} is out of stock`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
        }
      } else {
        $q.notify({
              progress: true,
              message: `Can not add or remove product after promo submission`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
      }
  }
  function remove() {
    if (props.promosubmitted != "true") {
        if (props.qntyObj.qnty > 1) {
          props.qntyObj.qnty--;
          let productQnty = JSON.parse($q.sessionStorage.getItem("qntyArray"));
          props.qntyObj.total_price = props.qntyObj.qnty * props.qntyObj.salePrice;
          productQnty[props.index] = props.qntyObj;
          $q.sessionStorage.set("qntyArray", JSON.stringify(productQnty));
          let totalPrice = $q.sessionStorage.getItem("totalPrice");
          let newTotal =
            parseFloat(totalPrice) - parseFloat(props.qntyObj.salePrice);
          $q.sessionStorage.set("totalPrice", newTotal);
          bus.emit("total-price");
        } else {
          $q.notify({
              progress: true,
              message: `Quantity can not be less then one`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
        }
      } else {
        $q.notify({
              progress: true,
              message: `Can not add or remove product after promo submission`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
      }
  }
  function removeFromCart() {
     if (props.promosubmitted != "true") {
        let products = JSON.parse($q.sessionStorage.getItem("cartProduct"));
        let newArray = products.filter(item => {
          return item.id != props.product.id;
        });
        $q.sessionStorage.set("cartProduct", JSON.stringify(newArray));
        let productQnty = JSON.parse($q.sessionStorage.getItem("qntyArray"));
        let newQnty = productQnty.filter(item => {
          return item.id != props.product.id;
        });
        $q.sessionStorage.set("qntyArray", JSON.stringify(newQnty));

        let totalPrice = $q.sessionStorage.getItem("totalPrice");

        let newTotal = totalPrice - props.qntyObj.total_price;
        $q.sessionStorage.set("totalPrice", newTotal);
        bus.emit("total-price");

        bus.emit("add-to-cart");
      } else {
        $q.notify({
              progress: true,
              message: `Can not add or remove product after promo submission`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
      }
  }
</script>
<style scoped>
.flex_between{
    display: flex;
    justify-content: space-between;
}
.btn_stockin{
        background-color: teal;
    color: white;
    border-radius: 5px;
    padding: 0px 8px;
    display: flex;
    align-items: center;
    height: 20px;
}
.price{
    margin: 0;
}
.addRemove{
    background-color: lightsteelblue;
    border-radius: 5px;
    height: 26px;
}
.plus{
    padding: 2px;
    font-size: 16px;
    margin: 0 5px;
    font-weight: bold;
}
.minus{
    padding: 2px;
    font-size: 16px;
    margin: 0 5px;
    font-weight: bold;
}
.zero{
    padding: 2px;
    font-size: 16px;
    margin: 0 5px;
    font-weight: bold;
}
.flex_center{
    display: flex;
    align-items: center;
}
.flex_between_center{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>