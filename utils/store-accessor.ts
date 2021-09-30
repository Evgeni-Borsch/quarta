/* eslint-disable import/no-mutable-exports */

import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import Categories from '~/store/categories'
import Products from '~/store/products'

let categories!: Categories
let products!: Products
let _store!: Store<any>

function initialiseStores(store: Store<any>) {
  _store = store
  categories = getModule(Categories, store)
  products = getModule(Products, store)
}

function getStore() {
  return _store
}

export { initialiseStores, getStore, categories, products }
