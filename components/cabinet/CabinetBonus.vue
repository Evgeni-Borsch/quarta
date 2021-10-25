<template>
  <div v-if="bonus" class="cabinet-bonus">
    <div class="cabinet-bonus__title">
      <CoinsIcon class="icon" />Бонусные баллы
    </div>
    <div class="cabinet-bonus__score">{{ numberWithSpaces(bonus) }} балла</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CoinsIcon from '~/assets/icons/coins.svg?icon'
import { user } from '~/store'
import numberWithSpaces from '~/utils/numberWithSpaces'

@Component({
  components: { CoinsIcon }
})
export default class CabinetBonusVue extends Vue {
  numberWithSpaces = numberWithSpaces

  get bonus() {
    return user.bonus ?? ''
  }
}
</script>

<style lang="scss" scoped>
.cabinet-bonus {
  display: flex;
  justify-content: space-between;
  padding: 0.875rem 1.625rem;
  margin-bottom: 1.875rem;

  background-color: $primary;
  border-radius: $border-radius;
  font-size: 1.625rem;
  font-weight: 500;
  color: $white;

  .icon {
    margin-right: 1rem;
  }
}
</style>
