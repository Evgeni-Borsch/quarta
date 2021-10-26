<template>
  <div class="filters-sort">
    <CheckboxVue :value="onlyAvailable" @change="setOnlyAvailable">
      В наличии
    </CheckboxVue>
    <SelectVue
      :options="sortOptions"
      :value="sort"
      size="small"
      label="Сортировать:"
      @change="setSort"
    />

    <div class="filters-sort__count">
      Выводить по:
      <ul>
        <li
          v-for="option of countOptions"
          :key="option.value"
          :class="{ active: itemsPerPage === option.value }"
          @click="() => setItemsPerPage(option.value)"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, InjectReactive, Inject } from 'vue-property-decorator'
import ProductsGridVue from '../ProductsGrid.vue'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import SelectVue from '~/components/inputs/Select.vue'
import CategoryPathResolver from '~/pages/catalog/_.vue'
import {
  CatalogCount,
  CatalogCountType,
  CatalogSort,
  CatalogSortType
} from '~/services/api/catalog'
import { SelectOption } from '~/models/general'

@Component({
  components: {
    CheckboxVue,
    SelectVue
  }
})
export default class FiltersSortVue extends Vue {
  currentCount = '20'
  $parent!: ProductsGridVue

  @InjectReactive() onlyAvailable!: boolean
  @InjectReactive() itemsPerPage!: CatalogCountType
  @InjectReactive() sort!: CatalogSortType

  @Inject() categoryContext!: CategoryPathResolver

  setOnlyAvailable(value: boolean) {
    this.categoryContext.onlyAvailable = value
  }

  setItemsPerPage(value: CatalogCountType) {
    this.categoryContext.itemsPerPage = value
  }

  setSort(value: CatalogSortType) {
    this.categoryContext.sort = value
  }

  sortOptions: Array<SelectOption> = [
    {
      title: 'по популярности',
      value: CatalogSort.popularity
    },
    {
      title: 'дешевле',
      value: CatalogSort.cheaper
    },
    {
      title: 'дороже',
      value: CatalogSort.expensive
    }
  ]

  countOptions: Array<any> = [
    {
      title: '20',
      value: CatalogCount.twenty
    },
    {
      title: '40',
      value: CatalogCount.fourty
    },
    {
      title: '60',
      value: CatalogCount.sixty
    },
    {
      title: 'Показать все',
      value: CatalogCount.all
    }
  ]
}
</script>

<style lang="scss" scoped>
.filters-sort {
  display: flex;
  align-items: center;
  margin-bottom: 1.875rem;

  &__count {
    display: flex;
    align-items: center;
    justify-self: flex-end;
    margin-left: auto;
    color: $gray-800;

    ul {
      display: inline-flex;
      align-items: center;
      margin: 0;
      padding: 0;
    }

    li {
      display: inline-flex;
      align-items: center;
      margin: 0;
      padding: 0;
      margin-left: 0.5rem;
      color: $primary;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        text-decoration: none;
      }

      &.active {
        color: $gray-800;
        cursor: default;
        text-decoration: none;
      }

      &:last-child {
        margin-left: 1rem;
      }
    }
  }

  &::v-deep {
    .checkbox {
      display: inline-flex;
      align-items: center;
      margin-bottom: 0;
      margin-right: 1.5rem;

      input {
        border-color: $gray-600;
        transform: translateY(-0.15rem);
        margin-right: 0.3125rem;
      }
    }
  }
}
</style>
