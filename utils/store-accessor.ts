import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import Categories from '~/store/categories'

// eslint-disable-next-line import/no-mutable-exports
let categories!: Categories

function initialiseStores(store: Store<any>) {
  categories = getModule(Categories, store)
}

export { initialiseStores, categories }
