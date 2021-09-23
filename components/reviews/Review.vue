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
    <div class="review__images">
      <ImagePreviewVue :src="'/photo-preview.jpg'" />
      <ImagePreviewVue :src="'/photo-preview.jpg'" />
    </div>
    <div class="review__reply">
      <div class="review__reply-actions">
        <a @click="toggleExpand">Ответить</a>

        <div class="review__reaction"><ThumbUpIcon /> {{ likes }}</div>
        <div class="review__reaction"><ThumbDownIcon /> {{ dislikes }}</div>
      </div>
      <div v-if="replyExpand" class="card review__reply-form">
        <div class="card-body">
          <TextareaVue v-model="replyText" label="Введите ответ" class="mb-4" />
          <button class="btn btn-primary">Отправить</button>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImagePreviewVue from '../ImagePreview.vue'
import TextareaVue from '../inputs/Textarea.vue'
import StarsVue from '../stars'

import ThumbUpIcon from '~/assets/icons/thumbup.svg?icon'
import ThumbDownIcon from '~/assets/icons/thumbdown.svg?icon'

@Component({
  components: {
    StarsVue,
    ImagePreviewVue,
    TextareaVue,
    ThumbUpIcon,
    ThumbDownIcon,
  },
})
export default class Review extends Vue {
  replyExpand = false
  replyText = ''
  likes = 4
  dislikes = 0

  toggleExpand() {
    this.replyExpand = !this.replyExpand
  }
}
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

  &__images {
    display: flex;
    margin-top: 1.75rem;

    &::v-deep > div:not(:first-child) {
      margin-left: 0.625rem;
    }
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

  &__reply {
    padding: 1.875rem 0 1.875rem;

    a {
      color: $primary !important;
      font-size: 0.75rem;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  &__reply-form {
    margin: 1rem 0 0;

    &::v-deep .textarea {
      width: 100%;
    }
  }

  &__reply-actions {
    display: flex;
  }

  &__reaction {
    display: inline-flex;
    align-items: center;
    align-self: flex-end;
    margin-left: auto;
    font-size: 0.75rem;
    margin-right: 0.375rem;

    svg {
      margin-right: 0.25rem;
      cursor: pointer;
    }

    &:last-child {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
