<template>
            <q-card class="my-card no-shadow" >
              <img height="90" :src="`http://localhost:8000/uploads/media/${product.product_image}`">
              <div class="q-px-sm" v-if="product.productdata.length !== null">
                <div class="text-subtitle2 ">{{ product.title.substring(0, 10) }} </div>
                <div class="flex_justify_between mb__25">
                  <p class="regular">{{product.productdata[0].sale_price}} TK</p>
                  <p class="old">{{product.productdata[0].regular_price}} TK</p>
                </div>
              </div>
                <div class="flex_justify_between ">
                  <q-btn @click="addToCart" flat round color="teal" icon="shopping_cart" >
                    <q-tooltip>
                      Add to cart
                    </q-tooltip>
                </q-btn>
                <q-btn flat round color="teal" icon="shopping_bag" >
                  <q-tooltip>
                     Buy now
                   </q-tooltip>
                </q-btn>
                </div>
            </q-card>
</template>
<script setup>
import {ref} from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
import {useNotify} from '../../composables/notify'
import { inject } from 'vue'
const bus = inject('bus')
const props = defineProps({
    product: Object
})
const qnty = ref(1)
function addToCart() {
      let productQntyObject = {
        id: props.product.id,
        product_data_id: props.product.productdata[0].id,
        name: props.product.title,
        name_bd: props.product.title_bd,
        qnty: qnty.value,
        salePrice: props.product.productdata[0].sale_price,
        unitPrice: props.product.productdata[0].unit_amount,
        total_price:
          parseFloat(props.product.productdata[0].sale_price) * qnty.value
      };
      if (props.product.productdata[0].stock > 0) {
        if (
          // check qnty already exist
          $q.sessionStorage.getItem("qntyArray") != null &&
          JSON.parse($q.sessionStorage.getItem("qntyArray").length > 0)
        ) {
          let oldProductQntyArray = JSON.parse(
            $q.sessionStorage.getItem("qntyArray")
          );
          //check duplicate product id
          let checkDuplicatInArray = oldProductQntyArray.filter(item => {
            return item.id == productQntyObject.id;
          });

          if (checkDuplicatInArray.length > 0) {
              $q.notify({
              progress: true,
              message: `${props.product.title} is already added to the cart`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
          } else {
            let newProductQntyArray = [
              productQntyObject,
              ...oldProductQntyArray
            ];
            $q.sessionStorage.set(
              "qntyArray",
              JSON.stringify(newProductQntyArray)
            );
              $q.notify({
              progress: true,
              message: `${props.product.title} is added to the cart`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
          }
        } else {
          let productQntyArray = [];
          productQntyArray.push(productQntyObject);
          $q.sessionStorage.set("qntyArray", JSON.stringify(productQntyArray));
            $q.notify({
              progress: true,
              message: `${props.product.title} is added to the cart`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
        }
        // add product
        if (
          $q.sessionStorage.getItem("cartProduct") != null &&
          JSON.parse($q.sessionStorage.getItem("cartProduct")).length != 0
        ) {
          let oldCartProduct = JSON.parse(
            $q.sessionStorage.getItem("cartProduct")
          );
          // check duplicate product
          if (oldCartProduct.length > 0) {
            let duplicateCartProduct = oldCartProduct.filter(item => {
              return item.id === props.product.id;
            });
            if (duplicateCartProduct.length > 0) {
                $q.notify({
                    progress: true,
                    message: `${props.product.title} is already added to the cart`,
                    icon: 'notifications',
                    color: 'info',
                    position:'bottom-left',
                    textColor: 'white',
                })
            } else {
              let cartProduct = [props.product, ...oldCartProduct];
              $q.sessionStorage.set(
                "cartProduct",
                JSON.stringify(cartProduct)
              );
              if ($q.sessionStorage.getItem("totalPrice") != undefined) {
                let oldTotalPrice = $q.sessionStorage.getItem("totalPrice");
                if (oldTotalPrice != null) {
                  let newTotalPrice =
                    parseFloat(oldTotalPrice) + productQntyObject.total_price;
                  $q.sessionStorage.set("totalPrice", newTotalPrice);
                }
              }
                $q.notify({
                  progress: true,
                  message: `${props.product.title} is added to the cart`,
                  icon: 'notifications',
                  color: 'info',
                  position:'bottom-left',
                  textColor: 'white',
              })
            }
          }
        } else {
          let cartProduct = [];
          cartProduct.push(props.product);
          let totalPrice = productQntyObject.total_price;
          $q.sessionStorage.set("totalPrice", totalPrice);
          $q.sessionStorage.set("cartProduct", JSON.stringify(cartProduct));
            $q.notify({
              progress: true,
              message: `${props.product.title} is added to the cart`,
              icon: 'notifications',
              color: 'info',
              position:'bottom-left',
              textColor: 'white',
          })
        }

        bus.emit("add-to-cart"); //go to layout cart
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
    }
</script>
<style scoped>
.width__102{
    width: 102% !important;
  }
  .q-gutter-x-xs, .q-gutter-xs {
    margin-left: -11px;
}
.flex_justify_between{
  display: flex;
  justify-content: space-between;
}
  .old {
  color: red;
  text-decoration: line-through;
}
.regular{
  color: green;
}

.mb__25{
  margin-bottom:-25px;
}

</style>