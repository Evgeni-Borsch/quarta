<template>
  <div class="filters-item">
    <CheckboxVue
      v-if="isItCheckbox()"
      :value="valueIsInStore"
      @change="onCheckboxChange"
    >
      <span v-html="item.title" />
    </CheckboxVue>

    <div v-if="isItRange()">
      <div class="row">
        <div class="col-6">
          <InputVue type="number" label="мин." placeholder="0" />
        </div>
        <div class="col-6">
          <InputVue type="number" label="макс." placeholder="100000" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import { filters } from '~/store'
import { CheckboxFilter, FilterInstance, RangeFilter } from '~/store/filters'

import InputVue from '~/components/inputs/Input.vue'

@Component({
  components: {
    CheckboxVue,
    InputVue
  }
})
export default class FiltersItemVue extends Vue {
  @Prop({ required: true }) item!: FilterInstance

  isItCheckbox() {
    return this.item instanceof CheckboxFilter
  }

  isItRange() {
    return this.item instanceof RangeFilter
  }

  get valueIsInStore() {
    if (this.isItCheckbox()) {
      return filters.isChecked({
        name: this.item.name,
        value: this.item.value as string
      })
    }

    return false
  }

  onCheckboxChange(value: boolean) {
    if (value) {
      filters.addCheckboxValue({
        name: this.item.name,
        value: this.item.value as string
      })
    } else {
      filters.removeCheckboxValue({
        name: this.item.name,
        value: this.item.value as string
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
