import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true,
})
export default class GlobalModule extends VuexModule {
  isMobileUserAgent = false

  @Mutation
  setMobileUserAgent(value: boolean) {
    this.isMobileUserAgent = value
  }
}
