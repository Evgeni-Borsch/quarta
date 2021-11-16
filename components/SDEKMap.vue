<template>
  <div class="sdek-map">
    <div :id="id"></div>
  </div>
</template>

<script lang="ts">
import { useScriptTag } from '@vueuse/core'
import { mixins } from 'vue-class-component'
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue-demi'
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import HasUid from '~/mixins/HasUid'
import { API_BASE_URL, YA_MAPS_KEY } from '~/services/constants'
import { location } from '~/store'

type SDEKMapInternalInstance = ComponentInternalInstance & {
  proxy: SDEKMap
}

export interface SDEKChoose {
  PVZ: {
    Address: string
    AddressComment: string
    WorkTime: string
  }
  city: string
  cityName: string
  currency: string
  id: string
  price: string
  tarif: number
  term: string
}

export interface SDEKChooseAddress {
  city: string
  cityName: string
  currency: string
  id: string
  price: string
  tarif: number
  term: string
  address: string
}

@Component({
  setup() {
    const { proxy } = getCurrentInstance() as SDEKMapInternalInstance

    useScriptTag('https://widget.cdek.ru/widget/widjet.js', () => {
      proxy.init()
    })
  }
})
export default class SDEKMap extends mixins(HasUid) {
  sdekInstance: any | null = null

  get id() {
    return `sdeck-${this.uid}`
  }

  @Emit('calculate')
  onCalculate(data: any) {
    return data
  }

  @Emit('choose')
  onChoose(data: any) {
    return data
  }

  @Emit('chooseProfile')
  onChooseProfile(data: any) {
    return data
  }

  @Emit('chooseAddress')
  onChooseAddress(data: any) {
    return data
  }

  init() {
    this.sdekInstance = new ISDEKWidjet({
      defaultCity: location.currentItem?.name ?? 'Санкт-Петербург', // какой город отображается по умолчанию
      cityFrom: 'Санкт-Петербург', // из какого города будет идти доставка
      country: 'Россия', // можно выбрать страну, для которой отображать список ПВЗ
      link: this.id, // id элемента страницы, в который будет вписан виджет
      path: 'https://widget.cdek.ru/widget/scripts/', // директория с библиотеками
      apikey: YA_MAPS_KEY,
      servicepath: API_BASE_URL + '/api/sdek/service.php', // ссылка на файл service.php на вашем сайте
      detailAddress: true,
      onCalculate: this.onCalculate,
      onChoose: this.onChoose,
      onChooseProfile: this.onChooseProfile,
      onChooseAddress: this.onChooseAddress
    })

    console.log(this.sdekInstance)
  }
}
</script>

<style lang="scss" scoped>
.sdek-map {
  min-height: 500px;
  background: $gray-200;
  overflow: hidden;
  border-radius: $border-radius-lg;
  border: 1px solid;
  border-color: $border-color;

  &::v-deep {
    .CDEK-widget,
    .CDEK-widget__map {
      min-height: 500px;
    }
  }
}
</style>
