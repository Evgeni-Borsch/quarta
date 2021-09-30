import Component, { mixins } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import BaseInput from './BaseInput'

@Component
export default class TextInput extends mixins(BaseInput) {
  innerValue: string = ''

  @Prop({ default: '' }) value!: string
  @Prop({ default: null }) placeholder!: string

  @Watch('innerValue')
  @Emit('input')
  emitInput(value: string) {
    return value
  }
}
