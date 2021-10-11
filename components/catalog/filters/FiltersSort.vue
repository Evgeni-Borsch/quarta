<template>
  <div class="filters-sort">
    <CheckboxVue> В наличии </CheckboxVue>
    <SelectVue :options="sortOptions" label="Сортировать:" />

    <div class="filters-sort__count">
      Выводить по:
      <ul>
        <li
          v-for="option of countOptions"
          :key="option.value"
          :class="{ active: currentCount === option.value }"
          @click="() => (currentCount = option.value)"
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import SelectVue, { SelectOption } from '~/components/Select.vue'

@Component({
  components: {
    CheckboxVue,
    SelectVue,
  },
})
export default class FiltersSortVue extends Vue {
  currentCount = '20'

  sortOptions: Array<SelectOption> = [
    {
      title: 'по популярности',
      value: 'popularity',
    },
    {
      title: 'дешевле',
      value: 'lowPrice',
    },
    {
      title: 'дороже',
      value: 'hightPrice',
    },
  ]

  countOptions: Array<SelectOption> = [
    {
      title: '20',
      value: '20',
    },
    {
      title: '40',
      value: '40',
    },
    {
      title: '60',
      value: '60',
    },
    {
      title: 'Показать все',
      value: 'all',
    },
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
