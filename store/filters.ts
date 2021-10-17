/* eslint-disable no-use-before-define */

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { filters } from '~/store'

export enum FilterType {
  checkbox = 'checkbox',
  range = 'range',
}

export type FilterInstance = Filter | CheckboxFilter | RangeFilter

export interface FiltersOptions {
  name: string
  value: unknown
  title: string
}

export interface FiltersSectionOptions {
  title: string
  children: Array<Filter> | Array<FiltersSection>
}

export abstract class Filter {
  name!: string
  title!: string
  value!: unknown

  constructor(options: FiltersOptions) {
    this.name = options.name
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
export class RangeFilter extends Filter {
  value: Range = [null, null]

  setMin(value: number | null) {
    this.value[0] = value
  }

  setMax(value: number | null) {
    this.value[1] = value
  }
}

export class FiltersSection {
  title!: string
  children!: Array<Filter> | Array<FiltersSection>

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
  activeFilters: Map<string, Array<string>> = new Map()

  get isChecked() {
    return (payload: { name: string; value: string }) => {
      const { name, value } = payload
      const filter = this.activeFilters.get(name)

      if (filter === undefined) return false
      return filter.includes(value)
    }
  }

  get asString() {
    return JSON.stringify(Object.fromEntries(this.activeFilters))
  }

  @Mutation
  setActiveFilters(activeFilters: Map<string, Array<string>>) {
    this.activeFilters = activeFilters
  }

  // @Mutation
  // setFiltersList(filtersList: Array<FiltersSection>) {
  //   this.filtersList = new Set(filtersList)
  // }

  @Action
  addCheckboxValue(payload: { name: string; value: string }) {
    const { name, value } = payload
    const activeFilters = new Map(this.activeFilters)
    const checked = this.activeFilters.get(name) || []

    if (checked.includes(value)) return null

    checked.push(value)
    activeFilters.set(name, checked)
    this.setActiveFilters(activeFilters)
  }

  @Action
  removeCheckboxValue(payload: { name: string; value: string }) {
    const { name, value } = payload
    const activeFilters = new Map(this.activeFilters)
    const checked = this.activeFilters.get(name) || []

    const index = checked.indexOf(value)
    checked.splice(index, 1)

    if (checked.length) {
      activeFilters.set(name, checked)
    } else {
      activeFilters.delete(name)
    }

    this.setActiveFilters(activeFilters)
  }

  @Action
  restoreFilters(filters: { [key: string]: Array<string> }) {
    const activeFilters = new Map()

    for (const key in filters) {
      const value = filters[key]
      activeFilters.set(key, value)
    }

    this.setActiveFilters(activeFilters)
  }

  @Action
  clearActiveFilters() {
    this.setActiveFilters(new Map())
  }

  // @Action
  // clearFiltersList() {
  //   this.setFiltersList([])
  //   filterInstances.forEach((filter) => filter.destroy())
  // }
}
