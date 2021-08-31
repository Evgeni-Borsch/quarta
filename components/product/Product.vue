<template>
  <section class="product">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <ProductPhotosVue :images="product.images" />
        </div>

        <div class="col-6">
          <div class="product__article">Артикул: {{ product.article }}</div>

          <div class="product__title">
            {{ product.name }}
          </div>

          <StarsVue />

          <ProductPriceVue
            :current="product.price"
            :old="product.priceOld"
            :discount="product.discount"
          />

          <div class="product__availability">
            <span class="product__availability-in-stock"> В наличии </span>
            <a href="#"> Посмотреть наличие </a>
            <InfoVue />
          </div>

          <div class="product__bonus">
            <span class="product__bonus-points"> + {{ product.bonus }} б </span>
            Бонусные баллы
            <InfoVue />
          </div>

          <div class="product__add">
            <span class="product__add-count">
              <span class="product__add-minus" @click="decreaseCount">-</span>
              <span class="product__add-plus" @click="increaseCount">+</span>

              <input
                :value="count"
                type="number"
                class="form-control"
                @input="onCountInput"
              />
            </span>

            <button class="btn btn-primary">В корзину</button>
            <button class="btn bg-white mx-1"><HeartIcon /> В избранное</button>
            <button class="btn bg-white mx-1">
              <CompareIcon /> В сравнение
            </button>
          </div>

          <hr />

          <div class="product__delivery">
            <div class="product__delivery-option">
              <div class="product__delivery-icon">
                <DeliveryIcon />
              </div>
              Доставка по Москве: <span class="text-dark">с 11.03</span><br />
              <a href="#">Узнать стоимость</a>
            </div>
            <div class="product__delivery-option">
              <div class="product__delivery-icon">
                <LoactionIcon />
              </div>
              Доступно к самовывозу:
              <span class="text-dark">бесплатно, С 10.03,</span><br />
              <a href="#">28 магазинах</a>
            </div>
          </div>

          <ProductComboVue parent="parentId" />
        </div>
      </div>
    </div>

    <ProductAbout :product="product" />
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  unref,
  watch,
} from '@nuxtjs/composition-api'

import HeartIcon from '@/assets/icons/heart.svg?icon'
import CompareIcon from '@/assets/icons/compare.svg?icon'

import { Product } from '@/models/product'
import DeliveryIcon from '@/assets/icons/delivery.svg?icon'
import LoactionIcon from '@/assets/icons/location.svg?icon'
import StarsVue from '@/components/stars/Stars.vue'
import InfoVue from '@/components/Info.vue'
import ProductPriceVue from '@/components/product/ProductPrice.vue'
import ProductPhotosVue from '@/components/product/ProductPhotos.vue'
import ProductComboVue from '@/components/product/ProductCombo.vue'
import ReviewsSliderVue from '../ReviewsSlider.vue'
import ProductAbout from './ProductAbout.vue'

export default defineComponent({
  components: {
    InfoVue,
    DeliveryIcon,
    LoactionIcon,
    StarsVue,
    ProductPriceVue,
    ProductPhotosVue,
    ProductComboVue,
    ProductAbout,
    ReviewsSliderVue,
    HeartIcon,
    CompareIcon,
  },
  setup() {
    const count: Ref<number> = ref(1)
    const setCount = (num: string) => (count.value = parseInt(num) || 1)
    const increaseCount = () => count.value++
    const decreaseCount = () => {
      if (count.value > 1) count.value--
    }
    const onCountInput = (e: Event & { target: HTMLInputElement }) => {
      e.target.value = setCount(e.target.value).toString()
    }

    const product: Product = {
      article: 'AB66632',
      name: 'Бинокль Nikon Monarch 7 8x42, Призмы Porro',
      price: 44260,
      priceOld: 50260,
      discount: 25,
      bonus: 285,
      available: true,
      rating: 4.7,
      images: [
        {
          default: '/product-01-01.jpg',
          small: '/product-01-01.jpg',
          large: '/product-01-01.jpg',
        },
      ],
      props: {
        'Увеличение (х)': '8',
        'Диаметр объектива (мм)': '56',
        'Угол зрения (реальный/градусы)': '6,2',
      },
      description: `<ul>
<li><span> Легкий (менее 500 г) корпус изготовлен из армированного стекловолокном поликарбоната.</span></li>
<li><span>Тщательно продуманная и компактная конструкция.</span></li>
<li><span>Стекло ED со сверхнизким рассеиванием для устранения хроматических аберраций и более яркого, чёткого изображения.</span></li>
<li><span>Диэлектрическое высокоотражающее многослойное покрытие призм обеспечивает более яркое изображение по всему полю зрения и более естественные цвета.</span></li>
<li><span>Все линзы и призмы имеют многослойное покрытие для получения яркого и чёткого изображения.</span></li>
<li><span>Наружные поверхности линз объектива и окуляра имеют износостойкое покрытие, которое предотвращает появление царапин (только модели 8х42 и 10х42).</span></li>
<li><span>Крышеобразные призмы с фазокорректирующим покрытием обеспечивают более высокое разрешение.</span></li>
<li><span>Широкое видимое поле зрения (60,7&deg;).</span></li>
<li><span>Большое удаление выходного зрачка гарантирует полный обзор всего поля зрения даже для людей, которые носят очки.</span></li>
<li><span>Для всех линз и призм используется оптика из экологичного стекла, не содержащего свинец и мышьяк.</span></li>
<li><span>Водонепроницаемые (до 1 м в течение 10 минут), а также защищённые от запотевания, благодаря применению уплотнительных колец и заполнению азотом.</span></li>
</ul>`,
      configuration:
        '<p><span>Бинокль, защитные крышки на окуляр и объектив, чехол, ремень для переноски бинокля, салфетка для очистки оптики, инструкция по эксплуатации, гарантийный талон, коробка (ДхШхВ), мм &ndash; 170х100х180.<br /><br />В разделе &laquo;Инструкции&raquo; можно посмотреть полную информацию.</span></p>',
    }

    watch(count, () => {
      if (unref(count) < 1) count.value = 1
    })

    return { count, onCountInput, increaseCount, decreaseCount, product }
  },
})
</script>

<style lang="scss" scoped>
.product {
  &__article {
    line-height: 0.6875rem;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-weight: 500;
    font-size: 1.625rem;
    line-height: 120%;
    color: $dark;
    margin-bottom: 0.75rem;
  }

  &__price {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.75rem;

    font-weight: 500;
    line-height: 130%;

    &-current {
      font-size: 1.625rem;
      color: $dark;
    }

    &-old {
      margin-left: 0.5rem;
      text-decoration-line: line-through;
    }

    &-discount {
      display: inline-block;
      padding: 0 0.3125rem;
      line-height: 1rem;
      margin-left: 0.5rem;
      background-color: $secondary;
      color: $white;
      border-radius: $border-radius-sm;
    }
  }

  &__bonus {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.125rem;

    &-points {
      padding: 0.3125rem 0.75rem;
      margin-right: 0.75rem;
      background-color: $gray-200;
      border-radius: $border-radius-sm;
      color: $dark;
    }
  }

  &__add {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-count {
      position: relative;
      display: inline-block;
      width: 6.25rem;
      margin-right: 0.375rem;

      .form-control {
        font-size: 1rem;
        line-height: 130%;
        color: $black;
        text-align: center;
        background-color: $gray-200;
        border-color: $gray-200;
      }
    }

    &-minus {
      left: 0;
    }
    &-plus {
      right: 0;
    }

    &-minus,
    &-plus {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      color: $black;
      cursor: pointer;

      &:active {
        transform: scale(0.8);
      }
    }
  }

  &__availability {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.5rem;

    &-in-stock {
      display: inline-flex;
      align-items: center;
      color: $secondary;
      margin-right: 0.3125rem;

      &::before {
        content: '';
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        margin-right: 0.3125rem;
        border-radius: 50%;
        background-color: $secondary;
      }
    }
  }

  &__delivery {
    &-icon {
      position: absolute;
      top: 1px;
      left: 0;
      width: 1rem;
      display: flex;
      justify-content: center;
    }

    &-option {
      position: relative;
      padding-left: 1.75rem;
      margin-bottom: 0.875rem;
    }
  }
}
</style>
