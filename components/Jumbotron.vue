<template>
  <div class="jumbotron-vue" :style="styles">
    <div class="container">
      <div class="jumbotron-vue__body">
        <object class="jumbotron-vue__q" data=""></object>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// import QSVG from '~/assets/images/'

@Component({})
export default class JumbotronVue extends Vue {
  @Prop({ required: true }) background!: string

  get styles() {
    return {
      backgroundImage: `url(${this.background})`
    }
  }
}
</script>

<style lang="scss" scoped>
.jumbotron-vue {
  &__body {
    padding: 10.625rem 0;
  }
}
</style>
