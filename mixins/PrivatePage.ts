import { Vue, Component } from 'vue-property-decorator'
import { user } from '~/store'

@Component({
  fetchOnServer: false,
})
export default class PrivatePage extends Vue {
  get hasAuth() {
    return user.hasAuth
  }

  async fetch() {
    await user.waitInitiation()
    if (!user.hasAuth) {
      this.$router.replace('/login')
    }
  }
}
