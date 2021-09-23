import Component, { mixins } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import HasUid from './HasUid'

@Component
export default class BaseInput extends mixins(HasUid) {
  @Prop({ default: null }) label!: string | null
}
