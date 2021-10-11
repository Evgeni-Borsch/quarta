<template>
  <a class="news-card">
    <div class="news-card__background" :style="backgroundStyles"></div>
    <div class="news-card__date">21 апреля 2021</div>
    <div class="news-card__title">
      Обзор коллиматорных прицелов и&nbsp;аксессуаров нового поколения
    </div>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class NewsCardVue extends Vue {
  background = '/news-1.jpg'

  get backgroundStyles() {
    return {
      backgroundImage: `url(${this.background})`,
    }
  }
}
</script>

<style lang="scss" scoped>
.news-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: relative;
  width: 100%;
  height: 27.75rem;
  padding: 2.75rem 1.5625rem;

  border-radius: $border-radius-lg;
  text-decoration: none;
  overflow: hidden;

  &__date,
  &__title {
    position: relative;
    z-index: 2;
  }

  &__date {
    color: $gray-600;
    margin-bottom: 1.375rem;
  }

  &__title {
    max-width: 40%;

    font-size: 1rem;
    color: $white;
  }

  &__background {
    background-size: cover;
    background-position: center;
    transition: transform 0.3s;
  }

  &::before,
  &__background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &::before {
    content: '';
    top: 50%;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      #000000 100%
    );
    z-index: 1;
  }

  &:hover &__background {
    transform: scale(1.1);
  }
}
</style>
