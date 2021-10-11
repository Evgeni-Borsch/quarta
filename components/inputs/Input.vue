<template>
  <div
    class="input"
    :class="{
      'input--lg': isLarge,
      'input--sm': isSmall,
    }"
  >
    <label v-if="label" :for="`i_${uid}`" class="form-label">
      {{ label }}
    </label>

    <span class="input__container">
      <component
        :is="mask ? 'the-mask' : 'input'"
        :id="`i_${uid}`"
        v-model="innerValue"
        :mask="mask"
        :type="type"
        :placeholder="placeholder"
        class="form-control"
        :class="{ [`bg-${bg}`]: bg }"
      />

      <transition name="fade">
        <div
          v-if="clearable && innerValue.trim()"
          class="input__clear"
          @click="innerValue = ''"
        >
          <CloseIcon />
        </div>
      </transition>
    </span>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import { TheMask } from 'vue-the-mask'
import TextInput from '~/mixins/TextInput'
import Sizable from '~/mixins/Sizable'

import CloseIcon from '~/assets/icons/close.svg?icon'

@Component({
  components: { CloseIcon, TheMask },
})
export default class Textarea extends mixins(TextInput, Sizable) {
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: false }) clearable!: boolean
  @Prop({ default: null }) bg!: string
  @Prop({ default: null }) mask!: string
}
</script>

<style lang="scss" scpoed>
.input {
  &--lg {
    input {
      padding: 1.125rem;
    }
  }

  &__container {
    display: block;
    position: relative;
  }

  &__clear {
    display: flex;
    align-items: center;

    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-right: 0.5rem;

    cursor: pointer;

    svg {
      transform: scale(1.5);
    }
  }

  input {
    font-size: 0.875rem;
    color: $gray-600;

    &:focus {
      color: $gray-900;
    }
  }
}
</style>
