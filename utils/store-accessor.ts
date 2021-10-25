/* eslint-disable import/no-mutable-exports */

import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import CategoriesModule from '~/store/categories'
import ProductsModule from '~/store/products'
import FiltersModule from '~/store/filters'
import CartModule from '~/store/cart'
import LocationModule from '~/store/location'
import UserModule from '~/store/user'

let categories!: CategoriesModule
let products!: ProductsModule
let filters!: FiltersModule
let cart!: CartModule
let location!: LocationModule
let user!: UserModule
let _store!: Store<any>

function initialiseStores(store: Store<any>) {
  _store = store
  categories = getModule(CategoriesModule, store)
  products = getModule(ProductsModule, store)
  filters = getModule(FiltersModule, store)
  cart = getModule(CartModule, store)
  location = getModule(LocationModule, store)
  user = getModule(UserModule, store)
}

function getStore() {
  return _store
}

export {
  initialiseStores,
  getStore,
  categories,
  products,
  filters,
  cart,
  location,
  user,
}
