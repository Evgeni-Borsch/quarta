<template>
  <div class="filters">
    <section class="filters__header">
      <h6>Фильтры</h6>
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
import CheckboxVue from '../../inputs/Checkbox.vue'
import FiltersSectionVue from './FiltersSection.vue'
import FiltersItem from './FiltersItem.vue'
import { CheckboxFilter, FiltersSection, MakerFilter } from '~/store/filters'
import { filters } from '~/store'

@Component({
  components: { FiltersSectionVue, CheckboxVue, FiltersItem },
})
export default class FiltersVue extends Vue {
  filters: Array<FiltersSection> = [
    new FiltersSection({
      title: 'Производитель',
      children: [
        new MakerFilter({
          title: 'Japan Optics / Hakko <small>(Япония)</small>',
        }),
      ],
    }),
    new FiltersSection({
      title: 'Характеристики',
      children: [
        new FiltersSection({
          title: 'Тип',
          children: [
            new CheckboxFilter({
              title: 'Закрытый',
            }),
            new CheckboxFilter({
              title: 'Открытый',
            }),
          ],
        }),
      ],
    }),
  ]

  // get filters() {
  //   return Array.from(filters.filtersList)
  // }

  get activeFilters() {
    return filters.activeFilters
  }

  isItSection(item: unknown) {
    return item instanceof FiltersSection
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
    console.log(this.activeFilters)

    const filtersAsString = JSON.stringify(
      Object.fromEntries(this.activeFilters)
    )

    this.$router.push({
      path: this.$route.path,
      query: {
        filters: filtersAsString,
      },
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

  section {
    padding: 1.4375rem 1.25rem;

    &:not(:last-child) {
      border-bottom: 1px solid;
      border-color: $gray-200;
    }
  }
}
</style>
