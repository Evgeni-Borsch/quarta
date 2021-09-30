<template>
  <a href="#" class="category-card">
    <div class="category-card__background"></div>

    <div class="category-card__body">
      <figure class="category-card__image">
        <img :src="image" :alt="title" />
      </figure>

      <div class="category-card__title">
        {{ title }}
      </div>
      <div v-if="count !== null" class="category-card__count">
        {{ count }} товаров
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CategoryCard extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) image!: string
  @Prop({ default: null }) count!: number
}
</script>

<style lang="scss" scoped>
.category-card {
  display: block;
  position: relative;
  padding-top: 135.949367089%;
  background-color: $gray-200;
  border-radius: $border-radius-lg;
  transition: $transition-base;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 66px rgba(0, 0, 0, 0.18);
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    padding-top: 100%;
    transform: translate3d(33%, -33%, 0) scale(0.95);

    transition: $transition-base;

    background-image: url('~/assets/images/category-card-bg.svg');
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
  }

  &:hover &__background {
    opacity: 1;
    transform: translate3d(30%, -30%, 0) scale(1.05);
  }

  &__body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  &__image {
    width: 100%;
    transform: scale(1.05);
    transition: $transition-base;

    img {
      width: 100%;
    }
  }

  &:hover &__image {
    transform: scale(1);
  }

  &__title {
    text-align: center;
    color: $gray-900;
    font-size: 1.625rem;
    font-weight: 500;
  }

  &__count {
    text-align: center;
    font-size: 1rem;
    margin-top: 0.75rem;
    color: $gray-600;
  }
}
</style>
