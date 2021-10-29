import { Vue, Component } from 'vue-property-decorator'
import { RawLocation } from 'vue-router'

@Component({})
export default class PeparedRedirect extends Vue {
  redirect(defaultPath: RawLocation) {
    const redirectPath = this.$route.query.redirect

    if (typeof redirectPath === 'string') {
      this.$router.push(redirectPath)
    } else {
      this.$router.push(defaultPath)
    }
  }
}
