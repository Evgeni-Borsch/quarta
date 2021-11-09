<template>
  <div
    class="input"
    :class="{
      'input--lg': isLarge,
      'input--sm': isSmall,
      'input--required': required,
      'is-invalid': error
    }"
  >
    <label v-if="label" :for="`i_${uid}`" class="form-label">
      {{ label }}
    </label>
    <InfoVue v-if="info">
      {{ info }}
    </InfoVue>

    <span class="input__container">
      <the-mask
        v-if="mask"
        :id="`i_${uid}`"
        v-model="innerValue"
        :mask="mask"
        :type="type"
        :placeholder="placeholder"
        class="form-control"
        :class="{ [`bg-${bg}`]: bg, 'is-invalid': error }"
        @blur.native="(e) => $emit('blur', e)"
        @focus.native="(e) => $emit('focus', e)"
      />

      <input
        v-else
        :id="`i_${uid}`"
        v-model="innerValue"
        :mask="mask"
        :masked="true"
        :type="type"
        :placeholder="placeholder"
        class="form-control"
        :class="{ [`bg-${bg}`]: bg, 'is-invalid': error }"
        @blur="(e) => $emit('blur', e)"
        @focus="(e) => $emit('focus', e)"
      />

      <slot />

      <div v-if="typeof error === 'string'" class="invalid-feedback">
        {{ error }}
      </div>

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
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { TheMask } from 'vue-the-mask'
import InfoVue from '../Info.vue'
import TextInput from '~/mixins/TextInput'
import Sizable from '~/mixins/Sizable'

import CloseIcon from '~/assets/icons/close.svg?icon'

@Component({
  components: { CloseIcon, TheMask, InfoVue }
})
export default class Textarea extends mixins(TextInput, Sizable) {
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: false }) clearable!: boolean
  @Prop({ default: null }) bg!: string
  @Prop({ default: null }) mask!: string
  @Prop({ default: null }) info!: string
}
</script>

<style lang="scss" scpoed>
.input {
  &--lg {
    input {
      padding: 1.125rem;
    }
  }

  &--required {
    label {
      &::after {
        content: '*';
        color: $secondary;
        font-size: 1.2em;
      }
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

  label {
    font-size: 1rem;
  }

  .info {
    position: relative;
    top: -2px;
  }
}
</style>
