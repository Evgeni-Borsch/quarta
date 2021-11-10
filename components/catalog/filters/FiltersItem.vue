<template>
  <div class="filters-item">
    <CheckboxVue
      v-if="isItCheckbox"
      :value="valueIsInStore"
      @change="onCheckboxChange"
    >
      <span v-html="item.title" />
    </CheckboxVue>

    <div v-if="isItRange">
      <div class="row">
        <div class="col-6">
          <InputVue
            type="number"
            label="мин."
            :placeholder="item.min"
            :value="range[0]"
            @change="(value) => onRangeChange(value, null)"
          />
        </div>
        <div class="col-6">
          <InputVue
            type="number"
            label="макс."
            :placeholder="item.max"
            :value="range[1]"
            @change="(value) => onRangeChange(null, value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { useDebounceFn } from '@vueuse/shared'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import { filters } from '~/store'
import {
  CheckboxFilter,
  FilterInstance,
  PriceFilter,
  Range
} from '~/store/filters'

import InputVue from '~/components/inputs/Input.vue'

@Component({
  components: {
    CheckboxVue,
    InputVue
  }
})
export default class FiltersItemVue extends Vue {
  delaedRangeUpdate: NodeJS.Timeout | null = null

  @Prop({ required: true }) item!: FilterInstance

  get isItCheckbox() {
    return this.item instanceof CheckboxFilter
  }

  get isItRange() {
    return this.item instanceof PriceFilter
  }

  get valueIsInStore() {
    if (this.isItCheckbox) {
      return filters.isChecked(this.item.value as string)
    }

    return false
  }

  get range() {
    return filters.priceRange
  }

  setRangeDebounced(range: Range) {
    clearTimeout(this.delaedRangeUpdate as NodeJS.Timeout)

    this.delaedRangeUpdate = setTimeout(() => {
      filters.setPriceRange(range)
    }, 1000)
  }

  onRangeChange(start: string | null = null, end: string | null = null) {
    const safeStart = parseInt(start as string) || null
    const safeEnd = parseInt(end as string) || null
    const range = filters.priceRange

    if (safeStart !== null) range[0] = safeStart || null
    if (safeEnd !== null) range[1] = safeEnd || null

    this.setRangeDebounced(range)
  }

  onCheckboxChange(value: boolean) {
    if (value) {
      filters.addCheckboxValue(this.item.value as string)
    } else {
      filters.removeCheckboxValue(this.item.value as string)
    }
  }
}
</script>

<style lang="scss" scoped></style>
