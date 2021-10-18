import Component, { mixins } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import BaseInput from './BaseInput'

@Component
export default class TextInput extends mixins(BaseInput) {
  innerValue: string = ''

  @Prop({ default: '' }) value!: string
  @Prop({ default: null }) placeholder!: string
  @Prop({ default: false }) error!: string | boolean
  @Prop({ default: false }) required!: boolean

  @Watch('innerValue')
  @Emit('input')
  onValueChange() {
    return this.innerValue
  }

  @Watch('value')
  updateValue() {
    this.innerValue = this.value
  }

  created() {
    this.updateValue()
  }
}
