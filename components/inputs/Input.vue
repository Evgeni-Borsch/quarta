<template>
  <div
    class="input input-group"
    :class="{
      'input-group input-group-lg': isLarge,
      'input-group input-group-sm': isSmall,
    }"
  >
    <label v-if="label" :for="`i_${uid}`" class="form-label">
      {{ label }}
    </label>
    <input
      :id="`i_${uid}`"
      v-model="innerValue"
      :type="type"
      :placeholder="placeholder"
      class="form-control"
      rows="3"
    />
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import TextInput from '~/mixins/TextInput'
import Sizable from '~/mixins/Sizable'

@Component({})
export default class Textarea extends mixins(TextInput, Sizable) {
  @Prop({ default: 'text' }) type!: string
}
</script>

<style lang="scss" scpoed>
.input {
  input {
    font-size: 0.875rem;
    color: $gray-600;

    &:focus {
      color: $gray-900;
    }
  }
}
</style>
