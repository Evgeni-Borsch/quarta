<template>
  <div class="login-to-continue">
    <h3 class="my-4">{{ title }}</h3>

    <p v-if="text" class="my-4" v-html="text"></p>

    <router-link :to="pathLogin" class="btn btn-primary px-5 me-2"
      >Войти</router-link
    >
    <router-link
      :to="pathRegister"
      class="btn bg-white text-primary border-primary px-5"
      >Зарегестрироваться</router-link
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { RawLocation } from 'vue-router'

@Component({})
export default class LoginToContinueVue extends Vue {
  @Prop({ default: 'Войдите чтобы продолжить' }) title!: string
  @Prop({ default: null }) text!: string

  get pathLogin(): RawLocation {
    return {
      path: '/login',
      query: {
        redirect: this.$route.path
      }
    }
  }

  get pathRegister(): RawLocation {
    return {
      path: '/registration',
      query: {
        redirect: this.$route.path
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
