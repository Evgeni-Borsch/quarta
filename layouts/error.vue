<template>
  <div class="wrapper">
    <header>
      <div class="container">
        <a href="/">
          <LogoSvg />
        </a>
      </div>
    </header>
    <main>
      <div class="error-message__wrapper">
        <div v-if="error.statusCode === 404" class="error-message">
          <h2>
            Упс, что-то пошло не так, похоже, такой страницы не существует!
          </h2>
          <p>Попробуйте воспользоваться нашим поиском на сайте.</p>

          <a href="/" class="btn btn-lg btn-primary">Вернуться на главную</a>
        </div>

        <div v-else class="error-message">
          <h2>Упс, что-то пошло не так!</h2>
          <p>{{ error.message }}</p>

          <a href="/" class="btn btn-lg btn-primary">Вернуться на главную</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LogoSvg from '@/assets/images/logo.svg?inline'

export default defineComponent({
  components: { LogoSvg },
  layout: 'clear',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-image: url('~/assets/images/404-bg.jpg');
  background-size: cover;
  background-position: top center;

  header {
    margin-top: 3.875rem;
  }
}

.error-message {
  margin: 0 auto;
  max-width: 495px;
  text-align: center;
  transform: translateY(-60%);

  h2,
  p {
    margin-bottom: 1.5rem;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 3.875rem - 29px);
  }
}
</style>
