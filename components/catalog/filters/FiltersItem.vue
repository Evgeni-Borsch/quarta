<template>
  <div class="filters-item">
    <CheckboxVue
      v-if="isItCheckbox(item)"
      :value="valueIsInStore ? itemValue : null"
      @change="(value) => item.setValue(value)"
    >
      <span v-html="item.title" />
    </CheckboxVue>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import { filters } from '~/store'
import { CheckboxFilter, FilterType } from '~/store/filters'

@Component({
  components: {
    CheckboxVue,
  },
})
export default class FiltersItemVue extends Vue {
  @Prop({ required: true }) item!: FilterType

  isItCheckbox(item: unknown) {
    return item instanceof CheckboxFilter
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
