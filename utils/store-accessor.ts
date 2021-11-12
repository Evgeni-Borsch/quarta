/* eslint-disable import/no-mutable-exports */

import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import CategoriesModule from '~/store/categories'
import ProductsModule from '~/store/products'
import FiltersModule from '~/store/filters'
import CartModule from '~/store/cart'
import LocationModule from '~/store/location'
import UserModule from '~/store/user'
import FavouritesModule from '~/store/favourites'
import GlobalModule from '~/store/global'
import OrdersModule from '~/store/orders'
import CompareModule from '~/store/compare'
import PromotionsModule from '~/store/promotions'
import JobsModule from '~/store/jobs'

let globalModule!: GlobalModule
let categories!: CategoriesModule
let products!: ProductsModule
let filters!: FiltersModule
let cart!: CartModule
let location!: LocationModule
let user!: UserModule
let favourites!: FavouritesModule
let orders!: OrdersModule
let compare!: CompareModule
let promotions!: PromotionsModule
let jobs!: JobsModule
let _store!: Store<any>

function initialiseStores(store: Store<any>) {
  _store = store
  globalModule = getModule(GlobalModule, store)
  categories = getModule(CategoriesModule, store)
  products = getModule(ProductsModule, store)
  filters = getModule(FiltersModule, store)
  cart = getModule(CartModule, store)
  location = getModule(LocationModule, store)
  user = getModule(UserModule, store)
  favourites = getModule(FavouritesModule, store)
  orders = getModule(OrdersModule, store)
  compare = getModule(CompareModule, store)
  promotions = getModule(PromotionsModule, store)
  jobs = getModule(JobsModule, store)
}

function getStore() {
  return _store
}

export {
  initialiseStores,
  getStore,
  globalModule,
  categories,
  products,
  filters,
  cart,
  location,
  user,
  favourites,
  orders,
  compare,
  promotions,
  jobs,
}
