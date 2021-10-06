import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { BaseStoredEntity } from '~/models/general'

export class ReviewsGroup extends BaseStoredEntity {
  constructor() {
    super()
  }
}

@Module({
  name: 'products',
  stateFactory: true,
  namespaced: true,
})
export default class ProductsModule extends VuexModule {
  items: Map<string, ReviewsGroup> = new Map()
}
