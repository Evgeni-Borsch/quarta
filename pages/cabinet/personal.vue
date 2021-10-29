<template>
  <div class="address">
    <BreadcrumbsVue :path="breadcrumbs" />

    <LoadingVue v-if="!hasAuth && false" />

    <div v-else class="container">
      <div class="row">
        <div class="col-8">
          <div class="address__card">
            <h2><PersonIcon class="icon" />Личные данные</h2>

            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-8">
                  <div
                    v-if="errorFromServer"
                    class="alert alert-danger my-4"
                    role="alert"
                    v-html="errorFromServer"
                  ></div>

                  <InputVue
                    v-model="phone"
                    label="Номер телефона"
                    class="my-4"
                    placeholder="+7 (___)___-__-__"
                    mask="+7 (###) ###-##-##"
                    :required="true"
                    :error="$v.phone.$error ? FormErrors.phone : false"
                    @blur="$v.phone.$touch()"
                    @focus="$v.phone.$reset()"
                  />
                  <InputVue
                    v-model="firstName"
                    label="Имя"
                    class="my-4"
                    placeholder="Екатерина"
                    :required="true"
                    :error="$v.firstName.$error ? FormErrors.required : false"
                    @blur="$v.firstName.$touch()"
                    @focus="$v.firstName.$reset()"
                  />
                  <InputVue
                    v-model="secondName"
                    label="Фамилия"
                    class="my-4"
                    placeholder="Иванова"
                    :required="true"
                    :error="$v.secondName.$error ? FormErrors.required : false"
                    @blur="$v.secondName.$touch()"
                    @focus="$v.secondName.$reset()"
                  />
                  <InputVue
                    v-model="email"
                    label="Email"
                    class="my-4"
                    placeholder="example@gmail.com"
                    :required="true"
                    :error="$v.email.$error ? FormErrors.email : false"
                    @blur="$v.email.$touch()"
                    @focus="$v.email.$reset()"
                  />
                </div>

                <div class="col-8">
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
import { Component } from 'vue-property-decorator'
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

import {  setPersonalData } from '~/services/api/cabinet'

import PersonIcon from '~/assets/icons/person.svg?icon'
import pageTitle from '~/utils/pageTitle'
import { user } from '~/store'

@Component({
  components: {
    BreadcrumbsVue,
    SubscribeVue,
    InputVue,
    LoadingVue,
    PersonIcon
  },
  head() {
    return {
      title: pageTitle('Личные данные')
    }
  },
  fetchOnServer: false,
  validations: {
    phone: {
      required,
      minLength: minLength(10)
    },
    firstName: {
      required
    },

    secondName: {
      required
    },

    email: {
      required,
      email
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

  phone = ''
  firstName = ''
  secondName = ''
  email = ''

  fetch() {
    this.phone = user.phone ?? ''
    this.firstName = user.firstName ?? ''
    this.secondName = user.secondName ?? ''
    this.email = user.email ?? ''
  }

  async onSubmit() {
    this.$v.$touch()
    if (this.$v.$error) return null

    try {
      const response = await setPersonalData({
        phone: this.phone,
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email
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

  h2 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  h2 .icon {
    transform: scale(1.75) translateY(-0.05rem);
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
