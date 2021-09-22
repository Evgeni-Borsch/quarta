<template>
  <div class="select__wrapper">
    <div v-if="label" class="select__label">
      {{ label }}
    </div>
    <div ref="select" class="select" :class="{ 'select--expanded': expanded }">
      <button ref="button" class="btn" @click="toggleExpanded">
        {{ currentTitle }}

        <div ref="options" class="select__options">
          <div
            v-for="option of options"
            :key="option.value"
            class="select__option"
            tabindex="0"
            @click="setValue(option.value)"
          >
            {{ option.title }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  Ref,
  watch,
} from '@nuxtjs/composition-api'
import { createPopper, Instance } from '@popperjs/core'
import { templateRef, useToggle, onClickOutside } from '@vueuse/core'

export interface SelectOption {
  title: string
  value: string
}

export default defineComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  setup(props: { options: Array<SelectOption>; value: string }, { emit }) {
    const popper: Ref<Instance | null> = ref(null)
    const [expanded, toggleExpanded] = useToggle(false)
    const innerValue = ref(props.value ?? props.options[0].value)
    const currentTitle = computed(() => {
      return props.options.find((option) => option.value === innerValue.value)
        ?.title
    })

    const selectElement: Ref<HTMLElement> = templateRef('select')
    const buttonElement: Ref<HTMLElement> = templateRef('button')
    const optionsElement: Ref<HTMLElement> = templateRef('options')

    const setValue = (value: string) => {
      emit('change', value)
      innerValue.value = value
      setTimeout(() => toggleExpanded(false))
    }

    onMounted(() => {
      popper.value = createPopper(buttonElement.value, optionsElement.value, {
        placement: 'bottom',
      })

      onClickOutside(selectElement, () => toggleExpanded(false))

      watch(expanded, (expanded) => {
        if (expanded) {
          optionsElement.value.setAttribute('data-show', '')
        } else {
          optionsElement.value.removeAttribute('data-show')
        }

        popper.value?.update()
      })
    })

    onBeforeUnmount(() => {
      popper.value?.destroy()
    })

    return {
      currentTitle,
      setValue,
      expanded,
      toggleExpanded,
    }
  },
})
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: inline-block;
  font-size: 0.75rem;

  &__wrapper,
  &__label {
    display: inline-flex;
    align-items: center;
  }

  &__label {
    font-size: 0.75rem;
    color: $gray-800;
    margin-right: 0.3125rem;
  }

  .btn {
    position: relative;
    padding: 0.375rem 1rem;
    color: $gray-800;
    background-color: $gray-200;
    min-width: 10.5rem;
    font-size: 0.75rem;
    text-align: left;

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
    }
  }

  &--expanded .btn::after {
    transform: rotateX(180deg);
  }

  &__options {
    width: 100%;
    display: none;
    background-color: $white;
    border-radius: $border-radius-sm;
    box-shadow: $box-shadow-sm;
    z-index: $zindex-popover;
    overflow: hidden;

    &[data-show] {
      display: block;
    }
  }

  &__option {
    padding: 0.375rem 1rem;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus {
      background-color: $gray-200;
    }
  }
}
</style>
