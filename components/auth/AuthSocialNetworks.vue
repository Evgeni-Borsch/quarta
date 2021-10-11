<template>
  <div class="auth-social-networks">
    <div class="auth-social-networks__item--google"></div>
    <div class="auth-social-networks__item--vk"></div>
    <div class="auth-social-networks__item--facebook"></div>
    <div class="auth-social-networks__item--yandex"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class AuthSocialNetworksVue extends Vue {}
</script>

<style lang="scss" scoped>
.auth-social-networks {
  display: flex;
  margin-bottom: 2.875rem;

  &__item {
    &,
    &--google,
    &--vk,
    &--facebook,
    &--yandex {
      width: 2.75rem;
      height: 2.75rem;
      background-color: $gray-200;
      border-radius: 0.625rem;
      margin-right: 1rem;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    &--google {
      background-color: #dd4b39;
      background-image: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.89133 11.1261C-0.647801 8.6452 -0.6478 4.30353 1.99709 1.8227C3.90147 -0.0380294 6.65211 -0.451463 9.08549 0.478847L10.0376 0.995724L11.0956 1.71937L9.40286 3.37333L8.76811 2.9599C7.28698 2.02959 5.17098 2.23625 3.79571 3.58011C2.20871 5.13074 2.10296 7.92178 3.79571 9.57574C5.38271 11.2297 8.23923 11.2297 9.72036 9.57574C10.1435 9.16231 10.5667 8.54199 10.6725 7.92178V7.71501H6.86385V5.64761H12.8942L13 6.16449V7.61168C12.8942 8.95553 12.3652 10.2994 11.413 11.2297C8.87398 13.6071 4.43047 13.6071 1.89133 11.1261Z' fill='white'/%3E%3C/svg%3E%0A");
    }

    &--vk {
      background-color: #4d76a1;
      background-image: url("data:image/svg+xml,%3Csvg width='17' height='9' viewBox='0 0 17 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.1069 5.16086C13.8321 4.84586 13.9107 4.70571 14.1069 4.42414C14.1105 4.42093 16.3794 1.57564 16.6131 0.610714L16.6145 0.610071C16.7307 0.258428 16.6145 0 16.0528 0H14.1941C13.7209 0 13.5027 0.221786 13.3858 0.469929C13.3858 0.469929 12.4395 2.52579 11.1007 3.85843C10.6686 4.2435 10.4688 4.36693 10.2329 4.36693C10.1168 4.36693 9.93614 4.2435 9.93614 3.89186V0.610071C9.93614 0.188357 9.80367 0 9.41195 0H6.48927C6.19246 0 6.01608 0.196714 6.01608 0.379929C6.01608 0.779786 6.68548 0.871714 6.7549 1.99671V4.43764C6.7549 4.9725 6.64794 5.07086 6.41064 5.07086C5.77878 5.07086 4.24519 3.00664 3.33637 0.644143C3.1529 0.185786 2.97369 0.000642811 2.49696 0.000642811H0.637522C0.106962 0.000642811 0 0.222428 0 0.470571C0 0.909 0.631855 3.08893 2.93827 5.96893C4.4754 7.93479 6.64015 9 8.60938 9C9.79305 9 9.93755 8.76343 9.93755 8.3565C9.93755 6.47807 9.83059 6.30064 10.4235 6.30064C10.6983 6.30064 11.1715 6.42407 12.2765 7.37229C13.5396 8.49664 13.7471 9 14.454 9H16.3128C16.8426 9 17.1111 8.76343 16.9567 8.29671C16.6032 7.31507 14.2146 5.29586 14.1069 5.16086Z' fill='white'/%3E%3C/svg%3E%0A");
    }

    &--facebook {
      background-color: #3b5998;
      background-image: url("data:image/svg+xml,%3Csvg width='6' height='13' viewBox='0 0 6 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.75839 6.48748H3.97873V13H1.28239V6.48748H0V4.19872H1.28239V2.71763C1.28239 1.6585 1.78606 0 4.00273 0L6 0.00834647V2.22998H4.55085C4.31315 2.22998 3.9789 2.34861 3.9789 2.85384V4.20085H5.99396L5.75839 6.48748Z' fill='white'/%3E%3C/svg%3E%0A");
    }

    &--yandex {
      background-color: #d7143a;
      background-image: url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.29445 0H5.06499C2.80626 0 0.527093 1.4881 0.527093 4.81266C0.527093 6.53472 1.34512 7.8759 2.84467 8.63866L0.100074 13.0708C-0.0300576 13.2804 -0.0334596 13.518 0.0909407 13.7063C0.212399 13.8902 0.434505 14 0.684838 14H2.07322C2.38862 14 2.63454 13.864 2.75248 13.6257L5.32584 9.135H5.51365V13.4403C5.51365 13.7437 5.80061 14 6.14028 14H7.35314C7.73407 14 8 13.7627 8 13.4229V0.612582C8.00006 0.251918 7.70995 0 7.29445 0ZM5.51365 7.14016H5.18234C3.89773 7.14016 3.13083 6.20462 3.13083 4.63758C3.13083 2.68909 4.09961 1.99486 5.0063 1.99486H5.51365V7.14016Z' fill='white'/%3E%3C/svg%3E%0A");
    }
  }
}
</style>
