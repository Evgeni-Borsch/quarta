<template>
  <div
    class="add-review card mt-4"
    :class="{ 'add-review--reviews-page': reviewsPage }"
  >
    <div class="card-body">
      <span>Ваша оценка</span>

      <div class="add-review__stars" @mouseleave="() => setHoverRating(null)">
        <StarVue
          v-for="star of stars"
          :key="star.points"
          :size="StarSize.large"
          :class="{
            'star--active': isStarActive(star.points),
            'star--hovered': isStarHovered(star.points)
          }"
          @click.native="() => rate(star.points)"
          @mouseenter.native="() => setHoverRating(star.points)"
        />
        <div
          v-if="description"
          class="add-review__stars-description"
          @mouseenter="() => setHoverRating(null)"
        >
          {{ description }}
        </div>
      </div>

      <form>
        <TextareaVue label="Недостатки" class="mb-4" />
        <TextareaVue label="Достоинства" class="mb-4" />
        <TextareaVue label="Комментарий" class="mb-4" />
        <InputFileVue :max-files="3" multiple class="mb-4" />

        <button class="btn btn-primary">Опубликовать отзыв</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import InputFileVue from '../inputs/InputFile.vue'
import TextareaVue from '../inputs/Textarea.vue'
import StarVue, { StarSize } from '../stars/Star.vue'

@Component({
  components: {
    StarVue,
    TextareaVue,
    InputFileVue
  }
})
export default class ProductAddReview extends Vue {
  @Prop({ default: false }) reviewsPage!: boolean

  StarSize = StarSize
  stars = [
    {
      points: 1,
      description: 'Ужасно'
    },
    {
      points: 2,
      description: 'Плохо'
    },
    {
      points: 3,
      description: 'Нормально'
    },
    {
      points: 4,
      description: 'Хорошо'
    },
    {
      points: 5,
      description: 'Отлично'
    }
  ]

  rating: number | null = null
  ratingHover: number | null = null

  get description() {
    const rating = this.ratingHover || this.rating
    return this.stars.find((star) => star.points === rating)?.description
  }

  rate(points: number) {
    this.rating = points
  }

  setHoverRating(points: number | null) {
    this.ratingHover = points
  }

  isStarActive(points: number) {
    if (this.rating === null) return false
    return this.rating >= points
  }

  isStarHovered(points: number) {
    if (this.ratingHover === null) return false
    return this.ratingHover >= points
  }
}
</script>

<style lang="scss" scoped>
.add-review {
  &--reviews-page {
    border-color: transparent;
  }

  &__stars {
    display: flex;
    align-items: center;
    color: #bebebe;
    margin: 0.75rem 0 1.625rem;

    &::v-deep {
      .star {
        margin: 0 0.25rem;
        transition: color 0.2s;

        &--hovered {
          color: rgba($secondary, 0.75);
        }

        &--active {
          color: $secondary;
        }
      }
    }
  }

  &__stars-description {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    color: $gray-600;

    &::before {
      content: '';
      display: inline-block;
      background-color: $gray-600;
      width: 1rem;
      height: 0.05rem;
      margin: 0 0.75rem 0 0.5rem;
    }
  }
}
</style>
