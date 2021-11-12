<template>
  <div class="filters">
    <section class="filters__header">
      <h6>Фильтры</h6>
      <div class="filters__clear" @click="clear">Сбросить</div>
    </section>
    <span v-if="filters.length">
      <FiltersSectionVue
        v-for="(section, index) of filters"
        :key="index"
        :title="section.title"
        :active="hasSelectedChild(section)"
      >
        <div v-for="(item, childIndex) of section.children" :key="childIndex">
          <FiltersSectionVue
            v-if="isItSection(item)"
            :title="item.title"
            :compact="true"
            :active="hasSelectedChild(item)"
          >
            <div
              v-for="(subSectionItem, subSectionChildIndex) of item.children"
              :key="subSectionChildIndex"
            >
              <FiltersItem :item="subSectionItem" />
            </div>
          </FiltersSectionVue>

          <FiltersItem v-else :item="item" />
        </div>
      </FiltersSectionVue>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive, Watch } from 'vue-property-decorator'
import CheckboxVue from '../../inputs/Checkbox.vue'
import FiltersSectionVue from './FiltersSection.vue'
import FiltersItem from './FiltersItem.vue'
import {
  CheckboxFilter,
  Filter,
  FilterInstance,
  FiltersSection,
  PriceFilter
} from '~/store/filters'
import { Category, filters } from '~/store'
import {
  FiltersResponse,
  FilterValue,
  getFilters
} from '~/services/api/catalog'
import toArray from '~/utils/toArray'

@Component({
  components: { FiltersSectionVue, CheckboxVue, FiltersItem }
})
export default class FiltersVue extends Vue {
  filters: Array<FiltersSection> = []

  @InjectReactive() category!: Category

  get activeFilters() {
    return filters.activeFilters
  }

  // ~~ Methods ~~

  isItSection(item: unknown) {
    return item instanceof FiltersSection
  }

  clear() {
    filters.clearActiveFilters()
  }

  hasSelectedChild(section: FiltersSection) {
    for (const item of section.children) {
      if (
        this.isItSection(item) &&
        this.hasSelectedChild(item as FiltersSection)
      ) {
        return true
      }

      if (filters.isChecked((item as CheckboxFilter).value)) return true
    }

    return false
  }

  /**
   * Наполняет структуру фильтров при создании компонента или при обновлении категории
   */
  @Watch('category')
  populate() {
    if (!this.category) return

    const fixed = ['BREND', 'PRICE', 'CML2_MANUFACTURER']

    return getFilters(this.category.id).then((filtersResponse) => {
      this.filters = []

      const manufacturer = filtersResponse.find(
        (filter) => filter.CODE === 'CML2_MANUFACTURER'
      )
      const brand = filtersResponse.find((filter) => filter.CODE === 'BREND')

      if (manufacturer) {
        this.filters.push(
          new FiltersSection({
            title: manufacturer.NAME,
            children: toArray(manufacturer.VALUES).map((value) => {
              return new CheckboxFilter({
                value: value.CONTROL_ID,
                title: value.VALUE
              })
            })
          })
        )
      }

      const props: Array<FiltersSection> = []

      filtersResponse.forEach((filter) => {
        if (fixed.includes(filter.CODE)) return null

        props.push(
          new FiltersSection({
            title: filter.NAME,
            children: toArray(filter.VALUES).map((value) => {
              return new CheckboxFilter({
                value: value.CONTROL_ID,
                title: value.VALUE
              })
            })
          })
        )
      })

      if (props.length) {
        this.filters.push(
          new FiltersSection({
            title: 'Характеристики',
            children: props
          })
        )
      }

      if (brand) {
        this.filters.push(
          new FiltersSection({
            title: brand.NAME,
            children: toArray(brand.VALUES).map((value) => {
              return new CheckboxFilter({
                value: value.CONTROL_ID,
                title: value.VALUE
              })
            })
          })
        )
      }

      // Цена
      this.filters.push(
        new FiltersSection({
          title: 'Цена',
          children: [new PriceFilter(0, 100000)]
        })
      )
    })
  }

  // ~~ Hooks ~~

  created() {
    const filtersAsString = this.$route.query?.filters

    if (typeof filtersAsString === 'string') {
      const filtersParsed = JSON.parse(filtersAsString)
      filters.restoreFilters(filtersParsed)
    } else {
      this.clear()
    }

    this.populate()
  }
}
</script>

<style lang="scss" scoped>
.filters {
  position: sticky;
  top: 1rem;
  width: 230px;
  margin: 0 0.75rem;
  padding: 0.3125rem 0;
  background-color: $white;
  border-radius: $border-radius-lg;
  max-height: 95vh;
  overflow-y: auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h6 {
      margin: 0;
    }
  }

  &__clear {
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: $primary;
    }
  }

  section {
    padding: 1.4375rem 1.25rem;

    &:not(:last-child) {
      border-bottom: 1px solid;
      border-color: $gray-200;
    }
  }
}
</style>
