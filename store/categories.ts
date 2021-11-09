import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { getSectionList } from '~/services/api/catalog'
import { categories } from '~/utils/store-accessor'

export interface Category {
  id: string
  name: string
  slug: string
  parent: string | null
  count: number
}

@Module({
  name: 'categories',
  stateFactory: true,
  namespaced: true,
})
export default class CategoriesModule extends VuexModule {
  isFetched = false
  items: Map<string, Category> = new Map()
  itemsBySlug: Map<string, Category> = new Map()
  itemsByParent: Map<string, Array<Category>> = new Map()

  activeCategory: string | null = null
  categoriesToShow: Array<string> = []
  protectedCategories: Array<string> = []

  get getItemsAsync() {
    return async () => {
      await categories.fetchIfNotFetched()
      return this.items
    }
  }

  get getItemsByParentAsync() {
    return async () => {
      await categories.fetchIfNotFetched()
      return this.itemsByParent
    }
  }

  get getByParentAsync() {
    return async (id: string) => {
      return (await this.getItemsByParentAsync()).get(id)
    }
  }

  get getBySlugAsync() {
    return async (slug: string) => {
      await categories.fetchIfNotFetched()

      if (this.itemsBySlug.has(slug)) return this.itemsBySlug.get(slug)

      const itemBySlug = Array.from(this.items, ([_id, item]) => item).find(
        (item) => item.slug === slug
      )

      if (itemBySlug) {
        const items = new Map(this.itemsBySlug)
        items.set(slug, itemBySlug)
        categories.setItemsBySlug(items)
      }

      return itemBySlug
    }
  }

  get getAllParentsAsync() {
    return async (id: string): Promise<Array<Category>> => {
      await categories.fetchIfNotFetched()

      const parents = []
      let currentItem = this.items.get(id)

      while (currentItem && currentItem?.parent !== '0') {
        currentItem = this.items.get(currentItem?.parent as string)
        if (currentItem) parents.push(currentItem)
      }

      return parents.reverse()
    }
  }

  get getAllParentIdsAsync() {
    return async (id: string): Promise<Array<string>> => {
      await categories.fetchIfNotFetched()

      const parents = []
      let currentItem = this.items.get(id)

      while (currentItem && currentItem?.parent !== '0') {
        currentItem = this.items.get(currentItem?.parent as string)
        if (currentItem) parents.push(currentItem.id)
      }

      return parents.reverse()
    }
  }

  get getLevelAsync() {
    return async (id: string) => {
      return (await this.getAllParentsAsync(id)).length
    }
  }

  get getAllDescendants() {
    return (id: string) => {
      if (!this.isFetched) throw new Error('Categories must be fetched!')

      const descendants: Array<Category> = []

      this.itemsByParent.get(id)?.forEach((item) => {
        descendants.push(item, ...this.getAllDescendants(item.id))
      })

      return descendants
    }
  }

  @Action
  async fetchIfNotFetched() {
    if (!this.isFetched) await categories.fetch()
  }

  @Action
  async fetch() {
    await getSectionList(2).then((response) => {
      const itemsByParent = new Map()
      const items = new Map(this.items)

      response.SECTIONS.forEach((item) => {
        const parentId = item.IBLOCK_SECTION_ID || '0'

        if (!itemsByParent.has(parentId)) {
          itemsByParent.set(parentId, [])
        }

        const category = {
          id: item.ID,
          name: item.NAME,
          parent: parentId,
          slug: item.CODE,
          count: parseInt(item.ELEMENT_CNT),
        }

        items.set(category.id, category)
        itemsByParent.get(parentId)?.push(category)
      })

      this.setItemsByParent(itemsByParent)
      this.setItems(items)
      this.setFetched()
    })
  }

  @Mutation
  setItemsByParent(items: Map<string, Array<Category>>) {
    this.itemsByParent = items
  }

  @Mutation
  setItems(items: Map<string, Category>) {
    this.items = items
  }

  @Mutation
  setFetched() {
    this.isFetched = true
  }

  @Mutation
  setItemsBySlug(items: Map<string, Category>) {
    this.itemsBySlug = items
  }
}
