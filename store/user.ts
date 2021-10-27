import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { checkAuth } from '~/services/auth'
import { AuthResponse } from '~/services/auth/model'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  hasAuth = false
  id: string | null = null
  bonus: number | null = null
  firstName: string = ''
  secondName: string = ''
  email: string | null = null
  phone: string | null = null

  get fullName() {
    return `${this.firstName} ${this.secondName}`
  }

  @Action
  async init() {
    const response = await checkAuth()
    if (response) this.setUserPromResponse(response)
  }

  @Mutation
  setUserPromResponse(response: AuthResponse) {
    this.hasAuth = true
    this.id = response.ID
    this.email = response.EMAIL
    this.phone = response.PERSONAL_PHONE
    this.firstName = response.NAME
    this.secondName = response.LAST_NAME
    this.bonus = parseInt(response.UF_BONUS_POINTS)
  }
}
