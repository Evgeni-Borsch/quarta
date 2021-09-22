<template>
  <div class="product-reviews">
    <div class="container">
      <div class="row">
        <div class="col-6 pe-5">
          <ReviewsListVue />
        </div>
        <div class="col-6 pe-5"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReviewsListVue from '../reviews/ReviewsList.vue'

export default defineComponent({
  components: { ReviewsListVue },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
