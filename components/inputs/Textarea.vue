<template>
  <div class="textarea">
    <label v-if="label" :for="`i_${uid}`" class="form-label">
      {{ label }}
    </label>
    <textarea
      :id="`i_${uid}`"
      ref="textarea"
      v-model="innerValue"
      class="form-control"
      :class="{
        'is-invalid': error
      }"
      rows="3"
    />
    <div v-if="typeof error === 'string'" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Ref } from 'vue-property-decorator'
import autosize from 'autosize'
import { templateRef } from '@vueuse/core'
import { onBeforeUnmount, onMounted, Ref as IRef } from 'vue-demi'
import TextInput from '~/mixins/TextInput'

@Component({
  setup() {
    const textarea: IRef<HTMLTextAreaElement> = templateRef('textarea')

    onMounted(() => {
      autosize(textarea.value)
    })

    onBeforeUnmount(() => {
      autosize.destroy(textarea.value)
    })
  }
})
export default class Textarea extends mixins(TextInput) {
  @Ref('textarea') textarea!: HTMLTextAreaElement
}
</script>

<style lang="scss" scpoed>
.textarea {
  textarea {
    font-size: 0.875rem;
    color: $gray-600;

    &:focus {
      color: $gray-900;
    }
  }
}
</style>
