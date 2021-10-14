import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { getSectionList, CatalogSection } from '~/services/api/catalog'
import { getStore, categories } from '~/utils/store-accessor'

export interface Category {
  id: string
  name: string
  slug: string
  parent: string | null
}

@Module({
  name: 'categories',
  stateFactory: true,
  namespaced: true,
})
export default class CategoriesModule extends VuexModule {
  isFetched = false
  items: Map<string, Category> = new Map()
  itemsByParent: Map<string, Array<Category>> = new Map()

  activeCategory: string | null = null
  categoriesToShow: Array<string> = []
  protectedCategories: Array<string> = []

  get getItemsAsync() {
    return async () => {
      if (!this.isFetched) await Promise.all([categories.fetch()])
      return this.itemsByParent
    }
  }

  get getByParentAsync() {
    return async (id: string) => {
      return (await this.getItemsAsync()).get(id)
    }
  }

  get getAllParents() {
    return (id: string) => {
      const parents = []
      let currentItem = this.items.get(id)

      while (currentItem?.parent !== '0') {
        currentItem = this.items.get(currentItem?.parent as string)
        parents.push(currentItem)
      }

      return parents
    }
  }

  get getLevel() {
    return (id: string) => {
      return this.getAllParents(id).length
    }
  }

  get getAllDescendants() {
    return (id: string) => {
      const descendants: Array<Category> = []

      this.itemsByParent.get(id)?.forEach((item) => {
        descendants.push(item, ...this.getAllDescendants(item.id))
      })

      return descendants
    }
  }

  @Action
  async fetch() {
    await getSectionList(3).then((response) => {
      const itemsByParent = new Map(this.itemsByParent)
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
}
