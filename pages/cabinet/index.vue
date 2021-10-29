<template>
  <div class="cabinet">
    <div v-if="!hasAuth" class="container">
      <LoadingVue />
    </div>

    <div v-else class="container">
      <h2>Личный кабинет</h2>

      <div class="row">
        <div class="col-6">
          <CabinetSectionVue>
            <template #header>
              <PersonIcon class="icon" />
              <h6>Личные данные</h6>

              <button class="btn btn-light bg-gray-200">Изменить</button>
            </template>

            <p class="text-dark">{{ fullName }}</p>
            <p class="text-dark">
              {{ email }}<br />
              тел.: {{ phone }}
            </p>
          </CabinetSectionVue>

          <CabinetSectionVue>
            <template #header>
              <CopyIcon class="icon" />
              <h6>История заказов</h6>

              <button class="btn btn-light bg-gray-200">Подробнее</button>
            </template>

            <center>История заказов пуста</center>
          </CabinetSectionVue>

          <CabinetSectionVue>
            <template #header>
              <DeliveryIcon class="icon" />
              <h6>Адрес доставки</h6>

              <button class="btn btn-light bg-gray-200">Добавить</button>
            </template>

            <p class="text-dark">
              Укажите ваш адрес для доставки курьером или определения ближайщего
              пункта CДЭК
            </p>
          </CabinetSectionVue>
        </div>

        <div class="col-6">
          <CabinetBonusVue />
          <CabinetSectionVue>
            <p>
              В нашей компании существует бонусная система. Ознакомьтесь с
              ситемой накопления и управления бонусными баллами!
            </p>
            <p>
              <a href="#">Читать подробнее</a>
            </p>
          </CabinetSectionVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { mixins } from 'vue-class-component'
import AuthBaseVue from '~/components/auth/AuthBase.vue'
import CabinetSectionVue from '~/components/cabinet/CabinetSection.vue'
import InputVue from '~/components/inputs/Input.vue'
import CabinetBonusVue from '~/components/cabinet/CabinetBonus.vue'

import PersonIcon from '~/assets/icons/person.svg?icon'
import DeliveryIcon from '~/assets/icons/delivery.svg?icon'
import CopyIcon from '~/assets/icons/copy.svg?icon'
import { user } from '~/store'
import LoadingVue from '~/components/Loading.vue'
import PrivatePage from '~/mixins/PrivatePage'

@Component({
  components: {
    AuthBaseVue,
    InputVue,
    CabinetSectionVue,
    CabinetBonusVue,
    PersonIcon,
    DeliveryIcon,
    CopyIcon,
    LoadingVue
  },
  setup() {},
  fetchOnServer: false
})
export default class CabinetPage extends mixins(PrivatePage) {
  get email() {
    return user.email ?? ''
  }

  get phone() {
    return user.phone ?? ''
  }

  get firstName() {
    return user.firstName ?? ''
  }

  get secondName() {
    return user.secondName ?? ''
  }

  get fullName() {
    return `${this.firstName} ${this.secondName}`
  }
}
</script>

<style lang="scss" scoped>
.cabinet {
  padding: 5.625rem 0;
  background-color: $gray-100;

  h2 {
    margin-bottom: 1.625rem;
  }
}
</style>
