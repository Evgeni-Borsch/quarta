import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { checkAuth } from '~/services/auth'
import { AuthResponse } from '~/services/auth/model'

let resolver: (value?: unknown) => void
let rejecter: (reason?: any) => void
const waitInitiation = new Promise((resolve, reject) => {
  resolver = resolve
  rejecter = reject
})

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

  city: string | null = null
  street: string | null = null
  mailbox: string | null = null
  zip: string | null = null

  sessid: string | null = null

  get fullName() {
    return `${this.firstName} ${this.secondName}`
  }

  get waitInitiation() {
    return () => waitInitiation
  }

  @Action
  async init() {
    const response = await checkAuth()
    if (response && response.ID) this.setUserPromResponse(response)
    resolver()
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

    this.city = response.PERSONAL_CITY
    this.street = response.PERSONAL_CITY
    this.mailbox = response.PERSONAL_CITY
    this.zip = response.PERSONAL_CITY

    this.sessid = response.sessid
  }
}
