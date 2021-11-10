/* eslint-disable no-use-before-define */

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { filters } from '~/store'

export enum FilterType {
  checkbox = 'checkbox',
  range = 'range',
}

export type FilterInstance = Filter | CheckboxFilter | PriceFilter

export interface FiltersOptions {
  value: unknown
  title: string
}

export interface FiltersSectionOptions {
  title: string
  children: Array<Filter | PriceFilter> | Array<FiltersSection>
}

export abstract class Filter {
  title!: string
  value!: unknown

  constructor(options: FiltersOptions) {
    this.value = options.value
    this.title = options.title
  }
}

export class CheckboxFilter extends Filter {
  value!: string
}

export interface Range extends Array<number | null> {
  0: number | null
  1: number | null
}
export class PriceFilter extends Filter {
  min = 0
  max = 1000000

  constructor(min: number, max: number) {
    super({
      title: 'Цена',
      value: null,
    })

    this.min = min
    this.max = max
  }
}

export class FiltersSection {
  title!: string
  children!: Array<Filter | PriceFilter> | Array<FiltersSection>

  constructor(options: FiltersSectionOptions) {
    this.title = options.title
    this.children = options.children
  }
}

@Module({
  name: 'filters',
  stateFactory: true,
  namespaced: true,
})
export default class FiltersModule extends VuexModule {
  activeFilters: Array<string> = []
  priceRange: Range = [null, null]

  get isChecked() {
    return (id: string) => {
      return this.activeFilters.includes(id)
    }
  }

  get asString() {
    return JSON.stringify(this.activeFilters)
  }

  @Mutation
  setPriceRange(range: Range) {
    this.priceRange = Array.from(range) as Range
  }

  @Mutation
  setActiveFilters(activeFilters: Array<string>) {
    this.activeFilters = activeFilters
  }

  // @Mutation
  // setFiltersList(filtersList: Array<FiltersSection>) {
  //   this.filtersList = new Set(filtersList)
  // }

  @Action
  addCheckboxValue(id: string) {
    if (this.activeFilters.includes(id)) return null

    const activeFilters = Array.from(this.activeFilters)
    activeFilters.push(id)

    this.setActiveFilters(activeFilters)
  }

  @Action
  removeCheckboxValue(id: string) {
    if (!this.activeFilters.includes(id)) return null

    const activeFilters = Array.from(this.activeFilters)
    const index = activeFilters.indexOf(id)
    activeFilters.splice(index, 1)

    this.setActiveFilters(activeFilters)
  }

  @Action
  restoreFilters(filters: Array<string>) {
    this.setActiveFilters(filters)
  }

  @Action
  clearActiveFilters() {
    this.setActiveFilters([])
    this.setPriceRange([null, null])
  }

  // @Action
  // clearFiltersList() {
  //   this.setFiltersList([])
  //   filterInstances.forEach((filter) => filter.destroy())
  // }
}
