import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface Category {
  name: string
  slug: string
  children?: Array<Category>
}

function getFlatten(category: Category) {
  let flatten: Array<Category> = []

  flatten.push(category)
  category.children?.forEach((child) => {
    flatten = [...flatten, ...getFlatten(child)]
  })

  return flatten
}

@Module({
  name: 'categories',
  stateFactory: true,
  namespaced: true,
})
export default class CategoriesModule extends VuexModule {
  items: Array<Category> = [
    {
      name: 'Оружие и патроны',
      slug: 'weapons',
      children: [
        { name: 'Гладкоствольное оружие', slug: 'smoothbore' },
        { name: 'Нарезное оружие', slug: 'rifle' },
        { name: 'Комиссионное оружие', slug: 'sale' },
      ],
    },
    { name: 'Оптика и кронштейны', slug: 'accessories', children: [] },
    { name: 'Тюнинг оружия', slug: 'tuning', children: [] },
    { name: 'Снаряжение и одежда', slug: 'gear', children: [] },
    { name: 'Чистка, смазка и уход', slug: 'consumables', children: [] },
    // { name: 'Рыбалка', slug: 'fishing', children: [] },
  ]

  activeCategory: string | null = null
  categoriesToShow: Array<string> = []
  protectedCategories: Array<string> = []

  // ~~~ Getters

  get rootCategory(): Category {
    return {
      name: 'Каталог товаров',
      slug: 'catalog',
      children: this.items,
    }
  }

  get flatten() {
    return getFlatten(this.rootCategory)
  }

  get getBySlug() {
    return (slug: string): Category | undefined => {
      return this.flatten.find((item) => item.slug === slug)
    }
  }

  // ~~~ Mutations

  @Mutation
  setActiveCategory(value: string | null) {
    this.activeCategory = value
  }

  @Mutation
  setCategoriesToShow(value: Array<string>) {
    this.categoriesToShow = value
  }

  @Mutation
  setProtectedCategories(value: Array<string>) {
    this.protectedCategories = value
  }

  // ~~~ Actions of `categoriesToShow`

  @Action
  addCategoryToShow(category: string) {
    if (this.categoriesToShow.includes(category)) return
    this.setCategoriesToShow([...this.categoriesToShow, category])
  }

  @Action
  removeCategoryToShow(category: string) {
    const newCategoies = [...this.categoriesToShow]
    const index = newCategoies.indexOf(category)

    if (index !== -1) {
      newCategoies.splice(index, 1)
      this.setCategoriesToShow(newCategoies)
    }
  }

  @Action
  clearCategoriesToShow() {
    this.setCategoriesToShow([])
  }

  @Action
  clearUnprotected() {
    const showed = [...this.categoriesToShow]
    const newShowed = []

    while (showed.length) {
      const category = showed.shift() as string
      if (!this.protectedCategories.includes(category)) {
        newShowed.push(category)
      }
    }

    this.setCategoriesToShow(newShowed)
  }

  // ~~~ Actions of `protectedCategories`

  @Action
  addProtectedCategory(category: string) {
    if (this.protectedCategories.includes(category)) return
    this.setProtectedCategories([...this.protectedCategories, category])
  }

  @Action
  removeProtectedCategory(category: string) {
    const newCategoies = [...this.protectedCategories]
    const index = newCategoies.indexOf(category)

    if (index !== -1) {
      newCategoies.splice(index, 1)
      this.setProtectedCategories(newCategoies)
    }
  }

  @Action
  clearProtectedCategory() {
    this.setProtectedCategories([])
  }
}
