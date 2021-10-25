<template>
  <div class="radio-group">
    <div v-if="label" class="radio-group__label">
      {{ label }}
    </div>

    <div
      v-for="(option, index) of options"
      :key="option"
      class="radio-group__option"
    >
      <input
        :id="`i_${uid}_${index}`"
        type="radio"
        :name="`i_${uid}`"
        :checked="innerValue === option.value"
      />
      <label :for="`i_${uid}_${index}`">{{ option.title }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import RadioInputMixin from '~/mixins/RadioInput'

@Component({})
export default class RadioGroupVue extends mixins(RadioInputMixin) {}
</script>

<style lang="scss" scoped>
.radio-group {
  &__option {
    margin-bottom: 1rem;
  }

  input[type='radio'] {
    width: 0;
    height: 0;
    opacity: 0;
  }

  input[type='radio'] + label {
    display: inline-block;
    position: absolute;
    padding-left: 1.5rem;
    color: $gray-800;
    font-size: 1rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      display: block;
      width: 0.875rem;
      height: 0.875rem;
      border: 1px solid;
      border-color: $gray-600;
      transition: border-color 0.3s;
      border-radius: 50%;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      display: block;
      width: 0.875rem;
      height: 0.875rem;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s;
      transform: scale(0.571428571);
      background-color: $secondary;
    }
  }

  input[type='radio']:checked + label {
    &::before {
      border-color: $secondary;
    }

    &::after {
      opacity: 1;
    }
  }
}
</style>
