<template>
  <div class="address">
    <BreadcrumbsVue :path="breadcrumbs" />

    <LoadingVue v-if="!hasAuth && false" />

    <div v-else class="container">
      <div class="row">
        <div class="col-8">
          <div class="address__card">
            <h2><DeliveryIcon class="icon" />Адрес доставки</h2>

            <form @submit.prevent="onSubmit">
              <div
                v-if="errorFromServer"
                class="alert alert-danger my-4"
                role="alert"
                v-html="errorFromServer"
              ></div>

              <InputVue
                v-model="locality"
                label="Город"
                class="my-4"
                :required="true"
                :error="$v.locality.$error ? FormErrors.required : false"
                @blur="$v.locality.$touch()"
                @focus="$v.locality.$reset()"
              />
              <InputVue
                v-model="street"
                label="Улица"
                class="my-4"
                :required="true"
                :error="$v.street.$error ? FormErrors.required : false"
                @blur="$v.street.$touch()"
                @focus="$v.street.$reset()"
              />

              <div class="row">
                <div class="col-6">
                  <InputVue
                    v-model="house"
                    label="Дом"
                    class="mb-4"
                    :required="true"
                    :error="$v.house.$error ? FormErrors.required : false"
                    @blur="$v.house.$touch()"
                    @focus="$v.house.$reset()"
                  />
                </div>
                <div class="col-6">
                  <InputVue
                    v-model="apartment"
                    label="Квартира"
                    class="mb-4"
                    :required="true"
                    :error="$v.apartment.$error ? FormErrors.required : false"
                    @blur="$v.apartment.$touch()"
                    @focus="$v.apartment.$reset()"
                  />
                </div>
                <div class="col-6">
                  <button type="submit" class="btn btn-primary w-100">
                    Сохранить изменения
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import { mixins } from 'vue-class-component'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { RawLocation } from 'vue-router'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import { Page } from '~/models/general'

import InputVue from '~/components/inputs/Input.vue'
import { FormErrors } from '~/services/errors'
import LoadingVue from '~/components/Loading.vue'
import PrivatePage from '~/mixins/PrivatePage'
import PeparedRedirect from '~/mixins/PeparedRedirect'

import { setAddress } from '~/services/api/cabinet'

import DeliveryIcon from '~/assets/icons/delivery.svg?icon'

@Component({
  components: {
    BreadcrumbsVue,
    SubscribeVue,
    InputVue,
    LoadingVue,
    DeliveryIcon
  },
  validations: {
    locality: {
      required
    },
    street: {
      required
    },
    house: {
      required
    },
    apartment: {
      required
    }
  }
})
export default class AddressPage extends mixins(
  validationMixin,
  PeparedRedirect,
  PrivatePage
) {
  redirect!: (defaultPath: RawLocation) => void

  breadcrumbs: Array<Page> = [
    {
      title: 'Главная',
      slug: 'index',
      path: '/'
    },
    {
      title: 'Личный кабинет',
      slug: 'cabinet',
      path: '/cabinet'
    },
    {
      title: 'Адрес доставки',
      slug: 'address',
      path: '/cabinet/address'
    }
  ]

  FormErrors = FormErrors
  errorFromServer: string | null = null

  locality = ''
  street = ''
  house = ''
  apartment = ''

  async onSubmit() {
    this.$v.$touch()
    if (this.$v.$error) return null

    try {
      const response = await setAddress({
        locality: this.locality,
        street: this.street,
        house: this.house,
        apartment: this.apartment
      })

      if (response.error) {
        this.errorFromServer = response.message
      } else {
        this.redirect('/cabinet')
      }
    } catch (e) {
      this.errorFromServer = e!.message
    }
  }
}
</script>

<style lang="scss" scoped>
.address {
  background: $gray-100;

  h2 .icon {
    transform: scale(1.75);
    margin: 0 1rem;
    color: $gray-600;
  }

  &__card {
    padding: 2.5rem 1.875rem;
    margin-bottom: 8.4375rem;
    background-color: $white;
    border-radius: $border-radius-lg;
  }

  &::v-deep {
    .input {
      label {
        font-size: 1rem;
      }
    }
  }
}
</style>
