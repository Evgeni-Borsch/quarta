<template>
  <div v-if="filters.length" class="filters">
    <section class="filters__header">
      <h6>Фильтры</h6>
      <div class="filters__clear" @click="clear">Сбросить</div>
    </section>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
  computed,
  onUpdated,
  ref,
  Ref,
  useFetch,
  watch
} from '@nuxtjs/composition-api'
import CheckboxVue from '../../inputs/Checkbox.vue'
import FiltersSectionVue from './FiltersSection.vue'
import FiltersItem from './FiltersItem.vue'
import { CheckboxFilter, FiltersSection, RangeFilter } from '~/store/filters'
import { Category, filters } from '~/store'
import { getFilters } from '~/services/api/catalog'

@Component({
  components: { FiltersSectionVue, CheckboxVue, FiltersItem },
  setup(props) {
    const category = computed(() => props.category as Category)
    const filters: Ref<Array<FiltersSection> | null> = ref([])

    const { fetch } = useFetch(() => {
      if (!category.value) return

      return getFilters(category.value.id).then((filtersResponse) => {
        filters.value = []

        if (filtersResponse.P_MANIFACTURER) {
          filters.value.push(
            new FiltersSection({
              title: 'Производитель',
              children: filtersResponse.P_MANIFACTURER?.VALUE2?.map(
                (filter) => {
                  return new CheckboxFilter({
                    name: filtersResponse.P_MANIFACTURER.ID,
                    value: filter.ID,
                    title: filter.NAME
                  })
                }
              )
            })
          )
        }

        if (filtersResponse.P_BRAND) {
          filters.value.push(
            new FiltersSection({
              title: 'Бренд',
              children: filtersResponse.P_BRAND.VALUE2?.map((filter) => {
                return new CheckboxFilter({
                  name: filtersResponse.P_BRAND.ID,
                  value: filter.ID,
                  title: filter.NAME
                })
              })
            })
          )
        }

        if (filtersResponse.P_PROPERTIES) {
          filters.value.push(
            new FiltersSection({
              title: 'Характеристики',
              children: filtersResponse.P_PROPERTIES.VALUE2.map((prop) => {
                return new FiltersSection({
                  title: prop.NAME,
                  children: prop.P_VALUE.VALUE.map((value) => {
                    return new CheckboxFilter({
                      name: prop.ID,
                      value,
                      title: value
                    })
                  })
                })
              })
            })
          )
        }
      })
    })

    watch(category, fetch)

    return { filters }
  }
})
export default class FiltersVue extends Vue {
  @Prop({ required: true }) category!: Category

  filters!: Array<FiltersSection>

  // get filters() {
  //   return Array.from(filters.filtersList)
  // }

  get activeFilters() {
    return filters.activeFilters
  }

  isItSection(item: unknown) {
    return item instanceof FiltersSection
  }

  clear() {
    filters.clearActiveFilters()
  }

  created() {
    const filtersAsString = this.$route.query?.filters

    if (typeof filtersAsString === 'string') {
      const filtersParsed = JSON.parse(filtersAsString)
      filters.restoreFilters(filtersParsed)
    }
  }

  @Watch('activeFilters')
  onActiveFiltersChange() {
    const filtersAsString = JSON.stringify(
      Object.fromEntries(this.activeFilters)
    )

    this.$router.push({
      path: this.$route.path,
      query: {
        filters: filtersAsString
      }
    })
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
