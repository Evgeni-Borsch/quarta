<template>
  <div class="product-reviews">
    <div class="container">
      <div class="row">
        <div class="col-6 pe-5">
          <ReviewsListVue />
        </div>
        <div class="col-6 pe-5">
          <h3>Оставьте отзыв</h3>

          <ProductAddReview />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputFile from '../inputs/InputFile.vue'
import TextareaVue from '../inputs/Textarea.vue'
import ReviewsListVue from '../reviews/ReviewsList.vue'
import StarVue, { StarSize } from '../stars/Star.vue'
import ProductAddReview from './ProductAddReview.vue'

@Component({
  components: {
    ReviewsListVue,
    TextareaVue,
    InputFile,
    StarVue,
    ProductAddReview,
  },
  setup() {
    return {
      StarSize,
    }
  },
})
export default class ProductReviews extends Vue {}
</script>

<style lang="scss" scoped>
.product-reviews {
}
</style>
