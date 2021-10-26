<template>
  <div class="radio-cards">
    <label v-if="label">{{ label }}</label>
    <div class="row">
      <div v-for="option of options" :key="option.value" :class="columnClass">
        <div
          class="radio-cards__card"
          :class="{ 'radio-cards__card--active': option.value === innerValue }"
          @click="innerValue = option.value"
        >
          <div class="radio-cards__card-title">
            {{ option.title }}
          </div>

          <div v-if="option.description" class="radio-cards__card-description">
            {{ option.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Vue, Component, Prop } from 'vue-property-decorator'

import RadioInputMixin from '~/mixins/RadioInput'
import { SelectOption } from '~/models/general'

export interface RadioCardOptions extends SelectOption {
  description?: string
}

@Component({})
export default class RadioCardsVue extends mixins(RadioInputMixin) {
  @Prop({ required: true }) options!: Array<RadioCardOptions>

  /**
   * 2 or 3
   */
  @Prop({ default: 3 }) columns!: number

  get columnClass() {
    if (this.columns === 2) return 'col-6'
    return 'col-4'
  }
}
</script>

<style lang="scss" scoped>
.radio-cards {
  label {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  [class*='col-'] {
    margin-bottom: 20px;
  }

  &__card {
    position: relative;
    padding: 1.25rem 1.25rem 2.125rem;
    border: 1px solid;
    border-color: $gray-200;
    transition: border-color 0.3s;
    border-radius: 4px;
    height: 100%;
    cursor: pointer;

    &:hover {
      border-color: $gray-300;
    }

    &--active {
      border-color: $secondary !important;
    }

    &-title {
      font-size: 1rem;
      color: $gray-800;
      margin-bottom: 0.625rem;
    }

    &-description {
    }

    &::before {
      content: '';
      position: absolute;
      right: 1.25rem;
      top: 1.25rem;
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
      right: 1.25rem;
      top: 1.25rem;
      display: block;
      width: 0.875rem;
      height: 0.875rem;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s;
      transform: scale(0.571428571);
      background-color: $secondary;
    }

    &--active {
      &::before {
        border-color: $secondary;
      }

      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
