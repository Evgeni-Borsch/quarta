import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'
export * from '~/store/global'
export * from '~/store/categories'
export * from '~/store/products'
export * from '~/store/cart'
export * from '~/store/location'
export * from '~/store/user'
export * from '~/store/favourites'
export * from '~/store/orders'
export * from '~/store/compare'
export * from '~/store/promotions'
export * from '~/store/jobs'
// export * from '~/store/filters'
