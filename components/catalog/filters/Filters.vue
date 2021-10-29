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
      >
        <div v-for="(item, childIndex) of section.children" :key="childIndex">
          <FiltersSectionVue
            v-if="isItSection(item)"
            :title="item.title"
            :compact="true"
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
import { CheckboxFilter, FiltersSection, PriceFilter } from '~/store/filters'
import { Category, filters } from '~/store'
import { getFilters } from '~/services/api/catalog'

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

  /**
   * Наполняет структуру фильтров при создании компонента или при обновлении категории
   */
  @Watch('category')
  populate() {
    if (!this.category) return

    const fixed = ['BREND', 'PRICE', 'CML2_MANUFACTURER']

    return getFilters(this.category.id).then((filtersResponse) => {
      const filtersKeys = Object.keys(filtersResponse)
      this.filters = []

      if (filtersResponse.CML2_MANUFACTURER) {
        this.filters.push(
          new FiltersSection({
            title: filtersResponse.CML2_MANUFACTURER.NAME,
            children: filtersResponse.CML2_MANUFACTURER.VALUE.map((value) => {
              return new CheckboxFilter({
                name: filtersResponse.CML2_MANUFACTURER!.NAME,
                value,
                title: value
              })
            })
          })
        )
      }

      const props: Array<FiltersSection> = []

      filtersKeys.forEach((key) => {
        if (fixed.includes(key)) return null

        const filterData = filtersResponse[key]

        props.push(
          new FiltersSection({
            title: filterData.NAME,
            children: filterData.VALUE.map((value: string) => {
              return new CheckboxFilter({
                name: filterData.NAME,
                value,
                title: value
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

      if (filtersResponse.BREND) {
        this.filters.push(
          new FiltersSection({
            title: filtersResponse.BREND.NAME,
            children: filtersResponse.BREND.VALUE.map((value) => {
              return new CheckboxFilter({
                name: filtersResponse.BREND!.NAME,
                value,
                title: value
              })
            })
          })
        )
      }

      // Цена
      this.filters.push(
        new FiltersSection({
          title: 'Цена',
          children: [
            new PriceFilter(
              filtersResponse.PRICE.MIN,
              filtersResponse.PRICE.MAX
            )
          ]
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
