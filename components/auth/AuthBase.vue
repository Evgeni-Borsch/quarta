<template>
  <div class="auth">
    <section class="auth__main-section">
      <div class="container">
        <BreadcrumbsVue :path="breadcrumbs" :container="false" />

        <div class="auth__content">
          <h2>
            {{ title }}
          </h2>
          <slot />
        </div>
      </div>
    </section>
    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import { Page } from '~/models/general'

@Component({
  components: { BreadcrumbsVue, SubscribeVue },
})
export default class LoginPage extends Vue {
  @Prop({ default: 'Вход или регистрация' }) title!: string

  get breadcrumbs(): Array<Page> {
    return [
      {
        title: 'Главная',
        path: '/',
        slug: 'index',
      },
      {
        title: this.title,
        path: '/login',
        slug: 'login',
      },
    ]
  }
}
</script>

<style lang="scss" scoped>
.auth {
  .container {
    max-width: 885px;
  }

  &__main-section {
    background-color: $gray-100;
    padding-bottom: 8.4375rem;
  }

  &__content {
    font-size: 1rem;
    margin: 0 -4rem;
    padding: 4rem;
    background-color: $white;
    border-radius: $border-radius-lg;

    > h2 {
      margin-bottom: 3.125rem;
    }
  }

  &::v-deep {
    .checkbox {
      label {
        color: $gray-600
      }
    }
  }
}
</style>
