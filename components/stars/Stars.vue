<template>
  <div class="stars">
    <StarVue :grade="1" :current="rating" @mouseenter="() => (rating = 1)" />
    <StarVue :grade="2" :current="rating" @mouseenter="() => (rating = 2)" />
    <StarVue :grade="3" :current="rating" @mouseenter="() => (rating = 3)" />
    <StarVue :grade="4" :current="rating" @mouseenter="() => (rating = 4)" />
    <StarVue :grade="5" :current="rating" @mouseenter="() => (rating = 5)" />

    <div class="stars__reviews">
      <a href="#">4 отзыва</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import StarVue from './Star.vue'

export default defineComponent({
  components: {
    StarVue,
  },
  setup() {
    const rating = ref(4.6)

    return {
      rating,
    }
  },
})
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  align-items: center;
  color: $secondary;
  margin-bottom: 1rem;

  &__reviews {
    color: $primary;
    margin-left: 5px;
    margin-bottom: -2px;
  }
}
</style>
