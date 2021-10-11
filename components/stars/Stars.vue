<template>
  <div class="stars">
    <StarVue :type="getStarType(1, rating)" />
    <StarVue :type="getStarType(2, rating)" />
    <StarVue :type="getStarType(3, rating)" />
    <StarVue :type="getStarType(4, rating)" />
    <StarVue :type="getStarType(5, rating)" />

    <div v-if="count" class="stars__count">{{ rating }}</div>

    <div v-if="reviews" class="stars__reviews">
      <a @click="onReviews">{{ reviews }} {{ decine(reviews) }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StarVue, { StarType } from './Star.vue'
import useDecline from '~/utils/useDecline'

export interface StarsProps {
  rating: number
  count: boolean
  reviews: number | null
}

/**
 * TODO: берет данные по продукту из стора
 */
export default defineComponent({
  components: {
    StarVue,
  },
  props: {
    rating: {
      type: Number,
      default: 0,
      // required: true,
    },
    count: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: Number,
      default: null,
    },
  },
  setup(_, { emit }) {
    const onReviews = () => emit('reviews')
    const decine = useDecline(['отзыв', 'отзыва', 'отзывов'])
    const getStarType = (base: number, current: number) => {
      if (base - current <= 0) return StarType.fill
      if (base - current <= 0.5) return StarType.half
      return StarType.outline
    }

    return {
      decine,
      getStarType,
      onReviews,
    }
  },
})
</script>

<style lang="scss" scoped>
.stars {
  display: inline-flex;
  align-items: center;
  color: $secondary;
  margin-bottom: 1rem;

  &__count,
  &__reviews {
    display: inline-flex;
    align-items: center;
    margin-bottom: -0.125rem;
    margin-left: 0.3125rem;
  }

  &__count {
    font-size: 0.75rem;
    color: $gray-800;
    margin-right: 0.6875rem;
  }

  &__reviews {
    color: $primary;

    a {
      text-decoration: underline;
      cursor: pointer;
      font-size: 0.75rem;
    }
  }
}
</style>
