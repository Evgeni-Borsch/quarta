<template>
  <div class="filters-item">
    <CheckboxVue
      v-if="isItCheckbox()"
      :value="valueIsInStore ? itemValue : null"
      @change="(value) => item.setValue(value)"
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
import { CheckboxFilter, FilterType, RangeFilter } from '~/store/filters'

import InputVue from '~/components/inputs/Input.vue'

@Component({
  components: {
    CheckboxVue,
    InputVue,
  },
})
export default class FiltersItemVue extends Vue {
  @Prop({ required: true }) item!: FilterType

  isItCheckbox() {
    return this.item instanceof CheckboxFilter
  }

  isItRange() {
    return this.item instanceof RangeFilter
  }

  get itemValue() {
    return filters.activeFilters.get(this.item.id)
  }

  get valueIsInStore() {
    return this.itemValue !== undefined
  }
}
</script>

<style lang="scss" scoped></style>
