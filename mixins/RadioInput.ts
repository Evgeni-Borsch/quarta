import Component, { mixins } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import BaseInput from './BaseInput'
import { SelectOption } from '~/models/general'

@Component({})
export default class RadioInputMixin extends mixins(BaseInput) {
  innerValue: string | null = null

  @Prop({ required: true }) options!: Array<SelectOption>
  @Prop({ default: null }) value!: string

  created() {
    this.updateInnerValue()
  }

  @Watch('value')
  updateInnerValue() {
    this.innerValue = this.value || this.options[0].value
  }

  @Watch('innerValue')
  @Emit('input')
  @Emit('change')
  onChange() {
    return this.innerValue
  }
}
