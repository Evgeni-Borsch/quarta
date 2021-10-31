<template>
  <div class="history">
    <BreadcrumbsVue :path="breadcrumbs" />

    <div class="container history__container">
      <h2><CopyIcon class="icon" /> {{ HISTORY_PAGE.title }}</h2>
      <HistoryOrder></HistoryOrder>
      <HistoryOrder></HistoryOrder>
    </div>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { INDEX_PAGE } from '../index.vue'
import { CABINER_PAGE } from './index.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import { Page } from '~/models/general'
import CopyIcon from '~/assets/icons/copy.svg?icon'
import HistoryOrder from '~/components/order-history/HistoryOrder.vue'
import SubscribeVue from '~/components/Subscribe.vue'

export const HISTORY_PAGE: Page = {
  title: 'История заказов',
  slug: 'history',
  path: '/cabinet/history'
}

@Component({
  components: {
    BreadcrumbsVue,
    HistoryOrder,
    SubscribeVue,
    CopyIcon
  }
})
export default class HistoryPage extends Vue {
  HISTORY_PAGE = HISTORY_PAGE
  breadcrumbs: Array<Page> = [INDEX_PAGE, CABINER_PAGE, HISTORY_PAGE]
}
</script>

<style lang="scss" scoped>
.history {
  background: $gray-100;

  h2 {
    margin-bottom: 3.125rem;
  }

  h2 .icon {
    transform: scale(1.5) translateY(-0.15rem);
    margin: 0 0.75rem 0 0;
    color: $gray-600;
  }

  &__container {
    margin-bottom: 8.75rem;
  }
}
</style>
