<template>
  <div class="checkbox form-check" :class="{ 'checkbox--large': isLarge }">
    <input :id="`i_${uid}`" class="form-check-input" type="checkbox" />
    <label class="form-check-label" :for="`i_${uid}`">
      Я соглашаюсь на обработку персональных данных
    </label>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import Sizable from '~/mixins/Sizable'

@Component({})
export default class Checkbox extends mixins(Sizable) {}
</script>

<style lang="scss">
.checkbox {
  input {
    transform: translateY(-0.25rem);
  }

  &--large {
    input {
      transform: translateY(-0.15rem);
    }

    label {
      font-size: 1rem;
    }
  }
}
</style>
