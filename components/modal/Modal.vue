<template>
  <Portal to="modal" :disabled="disabled">
    <div ref="modal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal__close" @click="hide">
          <CloseIcon />
        </div>
        <div class="modal-content">
          <div class="modal-body">
            <component :is="titleTag" v-if="title" class="modal-title">{{
              title
            }}</component>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Portal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Portal } from 'portal-vue'
import CloseIcon from '~/assets/icons/close.svg?icon'

@Component({
  components: { Portal, CloseIcon }
})
export default class ModalVue extends Vue {
  instance!: any
  disabled: boolean = true

  @Ref('modal') modalRef!: HTMLElement
  @Prop({ default: null }) title!: string
  @Prop({ default: 'h4' }) titleTag!: string

  show() {
    const { Modal } = require('bootstrap')

    this.disabled = false

    this.$nextTick().then(() =>
      this.$nextTick(() => {
        this.instance = new Modal(this.modalRef)
        this.instance.show()

        this.modalRef.addEventListener('hidden.bs.modal', () => {
          this.instance.dispose()
          this.instance = null
          this.disabled = true
          this.$emit('hide')
        })
      })
    )
  }

  hide() {
    this.instance.hide()
  }

  mounted() {
    this.show()
  }

  beforeDestroy() {
    this.instance?.dispose()
  }
}
</script>

<style lang="scss" scoped>
.modal {
  h4 {
    margin-bottom: 1.25rem;
  }

  &__close {
    position: absolute;
    top: 1.875rem;
    right: 1.875rem;
    z-index: 1;
    transform: scale(1.5);
    cursor: pointer;
    pointer-events: all;
    transition: color 0.3s;

    &:hover {
      color: $primary;
    }
  }

  &-dialog {
    position: relative;
    transition: all 0.5s;
  }

  &-content {
    box-shadow: 0px 4px 31px rgba(0, 0, 0, 0.25);
  }
}
</style>
