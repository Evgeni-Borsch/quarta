<template>
  <div class="checkbox form-check" :class="{ 'checkbox--large': isLarge }">
    <input
      :id="`i_${uid}`"
      v-model="innerValue"
      class="form-check-input"
      type="checkbox"
    />
    <label class="form-check-label" :for="`i_${uid}`">
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import HasUid from '~/mixins/HasUid'
import Sizable from '~/mixins/Sizable'

@Component({})
export default class CheckboxVue extends mixins(Sizable, HasUid) {
  innerValue = false

  @Prop({ default: false }) value!: boolean

  created() {
    this.innerValue = this.value
  }

  @Watch('value')
  onOuterValueChange() {
    this.innerValue = this.value
  }

  @Watch('innerValue')
  @Emit('change')
  @Emit('input')
  onChange() {
    return this.innerValue
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  min-height: none;
  margin-bottom: 0.5rem;

  input {
    transform: translateY(-0.25rem);
    cursor: pointer;
  }

  label {
    color: $gray-900;
    cursor: pointer;

    &::v-deep small {
      color: $gray-600;
      font-size: 1em;
    }
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
