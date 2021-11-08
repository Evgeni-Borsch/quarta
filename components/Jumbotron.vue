<template>
  <div class="jumbotron-vue" :style="styles">
    <div class="container">
      <div class="jumbotron-vue__body">
        <object class="jumbotron-vue__q" :data="qSvg"></object>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import qSvg from '~/assets/images/q.svg'

@Component({})
export default class JumbotronVue extends Vue {
  @Prop({ required: true }) background!: string

  qSvg = qSvg

  get styles() {
    return {
      backgroundImage: `url(${this.background})`
    }
  }
}
</script>

<style lang="scss" scoped>
.jumbotron-vue {
  background-size: cover;
  background-position: center;

  h1,
  h2,
  h3,
  p {
    position: relative;
    color: $white;
    z-index: 1;
  }

  h1,
  h2 {
    font-size: 3.75rem;
    font-weight: 700;
    margin-bottom: 0;
  }

  &__body {
    position: relative;
    padding: 10.625rem 0;
  }

  &__q {
    position: absolute;
    height: 100%;
    top: 50%;
    left: -180px;
    transform: translateY(-50%);
    z-index: 0;
  }
}
</style>
