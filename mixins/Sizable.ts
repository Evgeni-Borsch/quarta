import { Prop, Component, Vue } from 'vue-property-decorator'

export enum Sizes {
  small = 'default',
  medium = 'medium',
  default = 'small',
  large = 'large',
}

@Component({})
export default class Sizable extends Vue {
  @Prop({ default: Sizes.default }) size!: string

  get isSmall() {
    return this.size === Sizes.small
  }

  get isLarge() {
    return this.size === Sizes.large
  }

  get isMedium() {
    return this.size === Sizes.medium
  }
}
