<template>
  <span class="info">
    <InfoIcon ref="info" @mouseenter="show" @mouseleave="hide" />

    <span ref="tooltip" class="tooltip"> <slot /> </span>
  </span>
</template>

<script lang="ts">
import { createPopper, Instance as PopperInstance } from '@popperjs/core'
import { Component, Ref, Vue } from 'vue-property-decorator'
import InfoIcon from '@/assets/icons/info.svg?icon'

@Component({
  components: {
    InfoIcon
  }
})
export default class InfoVue extends Vue {
  popperInstance!: PopperInstance

  @Ref('info') infoRef!: HTMLElement
  @Ref('tooltip') tooltip!: HTMLElement

  mounted() {
    this.popperInstance = createPopper(this.infoRef, this.tooltip, {
      placement: 'right',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ]
    })
  }

  beforeDestroy() {
    this.popperInstance.destroy()
  }

  show() {
    this.tooltip.setAttribute('data-show', '')
    this.popperInstance.update()
  }

  hide() {
    this.tooltip.removeAttribute('data-show')
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  margin: 0 0.3125rem;

  svg {
    cursor: help;
  }
}

.tooltip {
  display: none;
  background: #ffffff;
  box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.75rem 1rem;
  z-index: $zindex-popover;
  inline-size: max-content;

  &[data-show] {
    display: flex;
  }
}
</style>
