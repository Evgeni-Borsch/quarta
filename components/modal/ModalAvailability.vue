<template>
  <ModalVue ref="modal" size="large" @hide="$emit('hide')">
    <div class="row">
      <div class="col-3">
        <ProductCardVue :add-button="false" :product="product" />
      </div>
      <div class="col-9">
        <h3>Посмотреть наличие</h3>
        <p class="w-75">
          Забронированный в&nbsp;магазине товар будет готов максимум через
          1&nbsp;рабочий час и&nbsp;зарезервирован для вас в&nbsp;магазине
          на&nbsp;3&nbsp;дня
        </p>

        <div v-if="availability" class="availability-list mt-5">
          <hr />

          <div
            v-for="store of availability.stores"
            :key="store.id"
            class="row pt-3"
          >
            <div class="col-6 fs-6">
              <div class="row mb-3">
                <div class="col flex-grow-0">Адрес:</div>
                <div class="col w-100 flex-grow-1 text-dark">
                  <span v-html="store.title" />
                </div>
              </div>

              <div class="row">
                <div class="col flex-grow-0">Режим&nbsp;работы:</div>
                <div class="col text-nowrap flex-grow-1 text-dark">
                  {{ store.schedule }}
                </div>
              </div>
            </div>
            <div class="col-3">
              <ProductAvailabilityBageVue
                class="mt-1"
                :avaible="!!store.amount"
              />
            </div>
            <div class="col-3">
              <button
                class="btn btn-light text-body w-100"
                :class="{ 'btn-primary text-white': !store.amount }"
                :disabled="!store.amount"
              >
                Выбрать
              </button>
            </div>

            <div class="col-12 pt-3">
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import ProductAvailabilityVue from '../product/ProductAvailability.vue'
import ProductCardVue from '../product/ProductCard.vue'
import ModalVue from './Modal.vue'
import InputVue from '~/components/inputs/Input.vue'
import ProductAvailabilityBageVue from '~/components/product/ProductAvailabilityBage.vue'
import LocationIcon from '~/assets/icons/location.svg?icon'

import AvailabilityMixin from '~/mixins/Availability'

@Component({
  components: {
    ModalVue,
    InputVue,
    ProductAvailabilityVue,
    ProductCardVue,
    ProductAvailabilityBageVue,
    LocationIcon
  }
})
export default class ModalAvailabilityVue extends mixins(AvailabilityMixin) {}
</script>

<style lang="scss" scoped>
p {
  font-size: 1rem;
}

.availability-list {
}
</style>
