<template>
  <div class="reviews-list">
    <div class="row">
      <div class="col-6">
        <h3>Отзывы</h3>
      </div>
      <div class="col-6 reviews-list__meta">
        <StarsVue :rating="5" :reviews="0" count />
        <SelectVue :options="orderOptions" size="small" label="Сортировать:" />
      </div>
    </div>

    <hr />

    <center class="py-5">Пока нет ни одного отзыва</center>

    <!-- <ReviewVue /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SelectVue from '../inputs/Select.vue'
import StarsVue from '../stars'
import ReviewVue from './Review.vue'
import { SelectOption } from '~/models/general'

export default defineComponent({
  components: { SelectVue, StarsVue, ReviewVue },
  setup() {
    const orderOptions: Array<SelectOption> = [
      {
        title: 'Высокие оценки',
        value: 'high'
      },
      {
        title: 'Низкие оценки',
        value: 'low'
      }
    ]

    return {
      orderOptions
    }
  }
})
</script>

<style lang="scss" scoped>
.reviews-list {
  &__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 1rem;
  }
}
</style>
