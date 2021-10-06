<template>
  <div
    class="product-availability-bage"
    :class="{ 'product-availability-bage--avaible': avaible }"
  >
    {{ avaible ? 'В наличии' : 'Нет в наличии' }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ProductAvailabilityBageVue extends Vue {
  @Prop({ required: true }) avaible!: boolean
}
</script>

<style lang="scss" scoped>
.product-availability-bage {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: $gray-600;

  &::before {
    content: '';
    display: inline-block;
    width: 0.3125rem;
    height: 0.3125rem;
    margin-right: 0.3125rem;
    background-color: currentColor;
    border-radius: 50%;
  }

  &--avaible {
    color: $secondary;
  }
}
</style>
