<template>
  <div
    class="select__wrapper"
    :class="{ 'select__wrapper--small': size === SelectSizes.small }"
  >
    <div
      v-if="label"
      class="select__label"
      :class="{ 'select__label--small': size === SelectSizes.small }"
    >
      {{ label }}
    </div>
    <div
      ref="select"
      class="select"
      :class="{
        'select--expanded': expanded,
        'select--small': size === SelectSizes.small
      }"
    >
      <component
        :is="search && expanded ? 'div' : 'button'"
        ref="button"
        class="select__main"
        :class="{ btn: !search }"
        @click="toggle"
      >
        {{ search && expanded ? '' : currentTitle }}

        <input
          v-if="search && expanded"
          type="text"
          class="select__input"
          autocomplete="off"
        />

        <div ref="options" class="select__options">
          <button
            v-for="option of options"
            :key="option.value"
            class="select__option"
            tabindex="0"
            @click="setValue(option.value)"
          >
            <!-- <input type="checkbox" class="form-check-input" /> -->

            {{ option.title }}
          </button>
        </div>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, getCurrentInstance } from '@nuxtjs/composition-api'
import { createPopper, Instance as PopperInstance } from '@popperjs/core'
import { templateRef, onClickOutside } from '@vueuse/core'
import { mixins } from 'vue-class-component'
import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator'
import CheckboxVue from './Checkbox.vue'
import BaseInput from '~/mixins/BaseInput'

import { SelectOption } from '~/models/general'

import InputVue from '~/components/inputs/Input.vue'

export enum SelectSizes {
  small = 'small',
  normal = 'normal'
  // large = 'large',
}

@Component({
  components: { InputVue, CheckboxVue },
  setup() {
    const instance = getCurrentInstance()
    const selectElement = templateRef('select')

    onMounted(() => {
      const componentRef = instance!.proxy as SelectVue
      onClickOutside(selectElement, () => componentRef.toggle(false))
    })

    return {}
  }
})
export default class SelectVue extends mixins(BaseInput) {
  popperInstance: PopperInstance | null = null
  innerValue: string | null = null
  expanded = false

  SelectSizes = SelectSizes

  @Prop({ required: true }) options!: Array<SelectOption>
  @Prop({ default: null }) value!: string
  @Prop({ default: false }) search!: boolean
  @Prop({ default: false }) multiple!: boolean
  @Prop({ default: SelectSizes.normal }) size!: SelectSizes

  @Ref('select') selectElement!: HTMLElement
  @Ref('button') buttonElement!: HTMLElement
  @Ref('options') optionsElement!: HTMLElement

  get currentTitle() {
    return this.options.find((option) => option.value === this.innerValue)
      ?.title
  }

  // ~~ Methods ~~

  toggle(state?: boolean) {
    this.expanded = state ?? !this.expanded
  }

  setValue(value: string) {
    this.innerValue = value

    setTimeout(() => {
      this.toggle()
    })
  }

  @Watch('innerValue')
  @Emit('change')
  @Emit('input')
  onChange() {
    return this.innerValue
  }

  @Watch('value')
  onOuterValueChange() {
    this.innerValue = this.value
  }

  @Watch('expanded')
  onToggle() {
    if (this.expanded) {
      this.optionsElement.setAttribute('data-show', '')
    } else {
      this.optionsElement.removeAttribute('data-show')
    }

    this.popperInstance?.update()
  }

  // ~~ Hooks ~~

  mounted() {
    this.innerValue = this.value ?? this.options[0].value
    this.popperInstance = createPopper(
      this.buttonElement,
      this.optionsElement,
      {
        placement: 'bottom'
      }
    )
  }

  beforeDestroy() {
    this.popperInstance?.destroy()
  }
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: inline-block;
  font-size: 1rem;
  width: 100%;
  z-index: $zindex-dropdown;

  &--small {
    font-size: 0.75rem;
    width: auto;
  }

  &__wrapper,
  &__label {
    display: inline-flex;
    align-items: center;
  }

  &__wrapper {
    width: 100%;

    &--small {
      width: auto;
    }
  }

  &__label {
    font-size: 1rem;
    color: $gray-800;
    margin-right: 0.3125rem;

    &--small {
      font-size: 0.75rem;
    }
  }

  &__main {
    position: relative;
    padding: 1rem;
    color: $gray-600;
    background-color: $gray-100;
    border: $input-border-color $input-border-width solid;
    width: 100%;
    min-width: 10.5rem;
    text-align: left;
    border-radius: $btn-border-radius;

    &:not(button) {
      padding: 0;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 1rem;
      width: 7px;
      background-image: url("data:image/svg+xml,%3Csvg width='7' height='5' viewBox='0 0 7 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M5.78724 0.878907L3.30278 3.36337L0.818315 0.878906L-1.43079e-07 1.69722L3.30278 5L6.60556 1.69722L5.78724 0.878907Z' fill='%23808D9A'/%3E %3C/svg%3E ");
      background-repeat: no-repeat;
      background-position: center;
      transition: $transition-base;
      transform: scale(1.5);
    }
  }

  &__input {
    display: block;
    width: 100%;
    background: transparent;
    border: none;
    border-radius: $btn-border-radius;
    outline: none;
    padding: 1rem;

    &:focus {
      box-shadow: $input-focus-box-shadow;
    }
  }

  &--small &__main {
    padding: 0.375rem 1rem;
    width: auto;
    font-size: 0.75rem;
    background-color: $gray-200;
    border: none;
    color: $gray-800;

    &::after {
      transform: scale(1);
    }
  }

  &--expanded &__main::after {
    transform: rotateX(180deg) scale(1.5);
  }

  &--small.select--expanded &__main::after {
    transform: rotateX(180deg) scale(1);
  }

  &__options {
    width: 100%;
    display: none;
    background-color: $white;
    border-radius: $border-radius;
    box-shadow: $box-shadow-sm, $box-shadow-sm, $box-shadow-sm;
    z-index: $zindex-dropdown;
    overflow: hidden;

    &[data-show] {
      display: block;
    }
  }

  &--small &__options {
    box-shadow: $box-shadow-sm;
    border-radius: $border-radius-sm;
  }

  &__option {
    padding: 1rem;
    display: block;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    border: none;
    width: 100%;
    text-align: left;

    &:hover,
    &:focus {
      background-color: $gray-200;
    }
  }

  &--small &__option {
    padding: 0.375rem 1rem;
  }
}
</style>
