<template>
  <div class="product-count">
    <span class="product-count__add-minus" @click="decreaseCount">-</span>
    <span class="product-count__add-plus" @click="increaseCount">+</span>

    <input
      :value="count"
      type="number"
      class="form-control"
      @input="onCountInput"
    />
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import ProductMixin from '~/mixins/Product'

@Component({})
export default class ProductCountVue extends mixins(ProductMixin) {}
</script>

<style lang="scss" scoped>
.product-count {
  position: relative;
  display: inline-block;
  width: 6.25rem;
  margin-right: 0.375rem;

  .form-control {
    font-size: 1rem;
    line-height: 130%;
    color: $black;
    text-align: center;
    background-color: $gray-200;
    border-color: $gray-200;
  }

  &__add {
    &-minus {
      left: 0;
    }
    &-plus {
      right: 0;
    }

    &-minus,
    &-plus {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      color: $black;
      cursor: pointer;

      &:active {
        transform: scale(0.8);
      }
    }
  }
}
</style>
