<template>
  <div class="error-404__wrapper">
    <div class="error-404">
      <h2>Упс, что-то пошло не так, похоже, такой страницы не существует!</h2>
      <p>Попробуйте воспользоваться нашим поиском на сайте.</p>

      <a href="/" class="btn btn-lg btn-primary">Вернуться на главную</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  layout: 'notFound',
})
export default class ErrorNotFound extends Vue {}
</script>

<style lang="scss">
.error-404 {
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
