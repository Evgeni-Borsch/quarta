/* eslint-disable no-use-before-define */

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { filters } from '~/store'

let lastId = 0
const filterInstances: Array<FilterType> = []

function getUID() {
  lastId++
  return lastId
}

export type FilterType = Filter | CheckboxFilter | MakerFilter

export interface FiltersOptions {
  title: string
}

export interface FiltersSectionOptions {
  title: string
  children: Array<Filter> | Array<FiltersSection>
}

export abstract class Filter {
  id: string = getUID().toString()
  title!: string
  value!: unknown
  parent?: FiltersSection

  constructor(options: FiltersOptions) {
    this.title = options.title
    filterInstances.push(this)
  }

  setValue(_value: unknown) {
    throw new Error(
      `Method setValue is not implemented in ${this.constructor.name}`
    )
  }

  destroy() {
    const index = filterInstances.indexOf(this)
    filterInstances.splice(index, 1)
  }
}

export class CheckboxFilter extends Filter {
  value!: boolean

  setValue(value: boolean) {
    this.value = value

    if (value) {
      filters.addActiveFilter({ id: this.id, value })
    } else {
      filters.removeActiveFilter(this.id)
    }
  }
}

export class MakerFilter extends CheckboxFilter {}

export class FiltersSection {
  title!: string
  children!: Array<Filter> | Array<FiltersSection>

  constructor(options: FiltersSectionOptions) {
    this.title = options.title
    this.children = options.children
    this.mountParents()
  }

  mountParents() {
    this.children.forEach((child: Filter | FiltersSection) => {
      if (child instanceof Filter) {
        child.parent = this
      }
    })
  }
}

@Module({
  name: 'filters',
  stateFactory: true,
  namespaced: true,
})
export default class FiltersModule extends VuexModule {
  activeFilters: Map<string, unknown> = new Map()

  @Mutation
  setActiveFilters(activeFilters: Map<string, unknown>) {
    this.activeFilters = activeFilters
  }

  // @Mutation
  // setFiltersList(filtersList: Array<FiltersSection>) {
  //   this.filtersList = new Set(filtersList)
  // }

  @Action
  addActiveFilter(payload: { id: string; value: unknown }) {
    const { id, value } = payload
    const activeFilters = new Map(this.activeFilters)
    activeFilters.set(id, value)
    this.setActiveFilters(activeFilters)
  }

  @Action
  removeActiveFilter(id: string) {
    const activeFilters = new Map(this.activeFilters)
    activeFilters.delete(id)
    this.setActiveFilters(activeFilters)
  }

  @Action
  restoreFilters(filters: { [key: string]: unknown }) {
    const activeFilters = new Map(this.activeFilters)

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
