<template>
  <div class="review">
    <div class="review__header">
      <div class="review__name">Александра</div>
      <div class="review__date">18.05.2021 10:20:53</div>
      <div class="review__stars">
        <StarsVue :rating="4.8" />
      </div>
    </div>
    <div class="review__pros">
      <h6>Достоинства</h6>
      <p>
        Aliquet odio feugiat quis integer scelerisque elit, risus, nam
        adipiscing. Faucibus proin at justo diam.
      </p>
    </div>
    <div class="review__cons">
      <h6>Недостатки</h6>
      <p>
        Aliquet odio feugiat quis integer scelerisque elit, risus, nam
        adipiscing. Faucibus proin at justo diam.
      </p>
    </div>
    <div class="review__comment">
      <h6>Комментарий</h6>
      <p>
        Aliquet odio feugiat quis integer scelerisque elit, risus, nam
        adipiscing. Faucibus proin at justo diam.
      </p>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StarsVue from '../stars'

export default defineComponent({
  components: { StarsVue },
  setup() {},
})
</script>

<style lang="scss" scoped>
.review {
  &__header,
  &__name,
  &__date,
  &__stars {
    display: flex;
    align-items: center;
  }

  &__name {
    color: $gray-800;
    font-size: 1rem;
    font-weight: 500;
  }

  &__date {
    font-size: 0.75rem;
    margin-left: 0.75rem;
  }

  &__stars {
    justify-self: flex-end;
    margin-left: auto;
  }

  &__pros,
  &__cons,
  &__comment {
    margin-top: 1rem;
    font-size: 1rem;
    color: $gray-800;

    h6 {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0.625rem;
      color: $body-color;
    }
  }

  &__comment {
    margin-top: 1.875rem;
  }
}
</style>
