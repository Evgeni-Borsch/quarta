/* eslint-disable import/no-mutable-exports */

import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import CategoriesModule from '~/store/categories'
import ProductsModule from '~/store/products'
import FiltersModule from '~/store/filters'
import CartModule from '~/store/cart'

let categories!: CategoriesModule
let products!: ProductsModule
let filters!: FiltersModule
let cart!: CartModule
let _store!: Store<any>

function initialiseStores(store: Store<any>) {
  _store = store
  categories = getModule(CategoriesModule, store)
  products = getModule(ProductsModule, store)
  filters = getModule(FiltersModule, store)
  cart = getModule(CartModule, store)
}

function getStore() {
  return _store
}

export { initialiseStores, getStore, categories, products, filters, cart }
