<template>
  <div class="cabinet-section">
    <div v-if="$slots.header" class="cabinet-section__header">
      <slot name="header" />
    </div>

    <div class="cabinet-section__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CabinetSectionVue extends Vue {
  mounted() {
    // console.log(this.$slots)
  }
}
</script>

<style lang="scss" scoped>
.cabinet-section {
  background-color: $white;
  border-radius: $border-radius-lg;
  margin-bottom: 1.875rem;

  &__header {
    display: flex;
    align-items: center;

    padding: 0.875rem 1.625rem;
    border-bottom: 1px solid #eeeff3;

    &::v-deep {
      h6 {
        margin: 0;
      }

      .btn {
        justify-self: flex-end;
        margin-left: auto;
      }

      .icon {
        margin-right: 1.5rem;
      }
    }
  }

  &__content {
    padding: 1.625rem;

    &::v-deep {
      p {
        font-size: 1rem;
      }

      p:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
