<template>
  <ModalVue
    ref="modal"
    class="modal-location"
    title="Выберите город"
    size="small"
    @hide="$emit('hide')"
  >
    <InputVue
      v-model="search"
      :size="'large'"
      label="Ваш город"
      :clearable="true"
    />

    <div
      v-for="item of items"
      :key="item.code"
      class="modal-location__item"
      :class="{
        'modal-location__item--current': current === item.code,
      }"
      @click="() => select(item.code)"
    >
      {{ item.name }}
    </div>
  </ModalVue>
</template>

<script lang="ts">
import { Vue, Component, Ref, Emit } from 'vue-property-decorator'
import ModalVue from './Modal.vue'
import { location } from '~/store'

import InputVue from '~/components/inputs/Input.vue'

import levenshteinFilter from '~/utils/levenshteinFilter'

@Component({
  components: {
    ModalVue,
    InputVue,
  },
})
export default class ModalLocationVue extends Vue {
  search = ''

  @Ref('modal') modalRef!: ModalVue

  get location() {
    return location
  }

  get current() {
    return location.currentSafe
  }

  get items() {
    if (!this.search.trim()) return location.items

    return levenshteinFilter(location.items, this.search)
  }

  @Emit('select')
  select(code: string) {
    location.setLocation(code)
    this.modalRef.hide()
  }
}
</script>

<style lang="scss" scoped>
.modal-location {
  &__item {
    margin: 1rem 0;
    font-size: 1rem;
    color: $gray-800;
    transition: color 0.3s;
    cursor: pointer;

    &:first-of-type {
      margin: 1.25rem 0 1rem;
    }

    &:hover,
    &--current {
      color: $secondary;
    }

    &--current {
      font-weight: 500;
    }
  }

  &::v-deep {
    label {
      font-size: 1rem;
    }
  }
}
</style>
