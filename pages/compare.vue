<template>
  <div class="compare">
    <BreadcrumbsVue :path="breadcrumbs" />

    <div ref="containerRef" class="container">
      <h2>Сравнение</h2>

      <p class="my-4">{{ productsToCompare.length }} Товара</p>

      <div v-if="!productsToCompare.length">
        <p class="text-dark fs-6">Нет товаров для сравнения</p>
        <router-link to="/catalog" class="btn btn-primary px-4"
          >Продолжить покупки</router-link
        >
      </div>

      <div v-else-if="productsToCompare.length < 2">
        <p class="text-dark fs-6">
          Добавьте еще один товар чтобы начать сравнение
        </p>
        <router-link to="/catalog" class="btn btn-primary px-4"
          >Продолжить покупки</router-link
        >
      </div>

      <div
        :class="{ 'd-none': productsToCompare.length < 2 }"
        class="compare__table-wrapper"
      >
        <div
          ref="tableRef"
          class="compare__table"
          :class="{ 'compare__table--active': dragActive }"
        >
          <div class="compare__column-backdrop" :style="columnBackdropStyle" />

          <div class="compare__row" :style="rowStyle">
            <div
              class="compare__col compare__col--first"
              :style="colunmStyle"
            />
            <div
              v-for="productItem of productsToCompare"
              :key="productItem.id"
              class="compare__col"
              :style="colunmStyle"
            >
              <ProductCardVue
                :product="productItem"
                :stars="false"
                :remove="true"
                @remove="() => removeCompare(productItem.id)"
              />
            </div>
          </div>

          <div class="compare__row" :style="rowStyle">
            <div class="compare__col compare__col--first mb-0 mt-5">
              <CheckboxVue v-model="onlyDifference">
                Показывать только различия
              </CheckboxVue>
            </div>
          </div>

          <div class="compare__divider" :style="rowStyle"></div>

          <div class="compare__row" :style="rowStyle">
            <div class="compare__col compare__col--first" :style="colunmStyle">
              <b>Рейтинг</b>
            </div>
            <div
              v-for="productItem of productsToCompare"
              :key="productItem.id"
              class="compare__col"
              :style="colunmStyle"
            >
              <StarsVue :rating="productItem.rating" :reviews="5" />
            </div>
          </div>

          <div class="compare__divider" :style="rowStyle"></div>

          <div class="compare__row" :style="rowStyle">
            <div class="compare__col compare__col--first" :style="colunmStyle">
              <b>Основные характеристики</b>
            </div>
          </div>

          <div
            v-for="prop of propsToShow"
            :key="prop"
            class="compare__row"
            :style="rowStyle"
          >
            <div class="compare__col compare__col--first" :style="colunmStyle">
              {{ prop }}
            </div>
            <div
              v-for="productItem of productsToCompare"
              :key="productItem.id"
              class="compare__col"
              :style="colunmStyle"
            >
              {{ productItem.props[prop] }}
            </div>
          </div>

          <div class="compare__divider" :style="rowStyle"></div>
        </div>

        <div class="btn bg-white px-4 py-2 btn-sm mt-2">Отчистить</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { DragGesture, DragState } from '@use-gesture/vanilla'
import { INDEX_PAGE } from './index.vue'
import { compare, ProductItem, products } from '~/store'
import { Page } from '~/models/general'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import StarsVue from '~/components/stars'
import CheckboxVue from '~/components/inputs/Checkbox.vue'

const COMPARE_PAGE: Page = {
  title: 'Сравнение',
  slug: 'compare',
  path: '/compare'
}

@Component({
  components: { BreadcrumbsVue, ProductCardVue, StarsVue, CheckboxVue }
})
export default class ComparePage extends Vue {
  breadcrumbs: Array<Page> = [INDEX_PAGE, COMPARE_PAGE]
  productsToCompare: Array<ProductItem> = []
  allProps: Array<string> = []
  repeatedProps: Array<string> = []
  containerSize = 1000
  onResizeTimeout: NodeJS.Timeout | null = null
  onlyDifference = true

  lastValue: any = {}
  differentValue: Array<string> = []

  scrollOffset = 0
  offsetMemo = 0
  dragGesture!: DragGesture
  dragActive = false

  @Ref('containerRef') containerRef!: HTMLElement
  @Ref('tableRef') tableRef!: HTMLElement

  get propsToShow() {
    if (!this.onlyDifference) return this.allProps
    return this.differentValue
  }

  get compareList() {
    return compare.items
  }

  // ~~ Computed styles

  get colunmStyle() {
    return {
      width: `${this.containerSize / 4}px`
    }
  }

  get rowStyle() {
    const width = (this.containerSize / 4) * (this.productsToCompare.length + 1)
    return {
      width: `${Math.max(this.containerSize - 32, width)}px`
    }
  }

  get columnBackdropStyle() {
    return {
      width: `${this.containerSize / 4}px`,
      transform: `translateX(${this.scrollOffset}px)`
    }
  }

  async fetch() {
    this.productsToCompare = []

    for (const id of this.compareList) {
      this.productsToCompare.push(await products.getById(id))
    }

    this.updatePropsLists()
  }

  @Watch('compareList')
  refetch() {
    this.$fetch()
  }

  updatePropsLists() {
    this.productsToCompare.forEach((product) => {
      for (const key in product.props) {
        if (
          this.lastValue[key] &&
          !this.differentValue.includes(key) &&
          this.lastValue[key] !== product.props[key]
        ) {
          this.differentValue.push(key)
        }

        this.lastValue[key] = product.props[key]

        if (!this.allProps.includes(key)) {
          this.allProps.push(key)
        } else if (!this.repeatedProps.includes(key)) {
          this.repeatedProps.push(key)
        }
      }
    })
  }

  removeCompare(id: string) {
    compare.removeItem(id)
  }

  updateContainerSize() {
    clearTimeout(this.onResizeTimeout as NodeJS.Timeout)

    this.onResizeTimeout = setTimeout(() => {
      this.containerSize = this.containerRef.getBoundingClientRect().width
    }, 500)
  }

  // ~~ Event handlers

  onScroll() {
    if (this.dragActive) return null
    this.offsetMemo = this.tableRef.scrollLeft
    this.scrollOffset = this.tableRef.scrollLeft
  }

  onDrag({ active, movement: [mx], event }: DragState) {
    event.preventDefault()

    if (this.dragActive !== active) this.dragActive = active

    const currentPosition = this.offsetMemo - mx
    this.tableRef.scrollLeft = currentPosition
    this.scrollOffset = this.tableRef.scrollLeft

    if (!this.dragActive) this.offsetMemo = this.tableRef.scrollLeft
  }

  // ~~ Hooks

  mounted() {
    this.updateContainerSize()
    this.tableRef.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.updateContainerSize)

    this.dragGesture = new DragGesture(this.tableRef, this.onDrag, {
      axis: 'x',
      eventOptions: {
        capture: true,
        passive: false
      }
    })
  }

  beforeDestroy() {
    this.dragGesture.destroy()
    this.tableRef.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.updateContainerSize)
  }
}
</script>

<style lang="scss" scoped>
.stars {
  margin-bottom: 0;
}

.compare {
  background-color: $gray-100;

  padding-bottom: 8.75rem;

  .checkbox::v-deep input {
    border-color: $gray-600;
    transform: translateY(-0.15rem);
  }

  &__divider {
    position: relative;
    width: 100%;
    height: 1px;
    margin: 1.875rem 0;
    background-color: #808d9a;
    z-index: 5;
    opacity: 0.5;
  }

  &__table-wrapper {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      width: 20px;
      top: -1rem;
      bottom: -1rem;
      left: 100%;
      box-shadow: -10px 0 10px $gray-100;
      background: rgba($gray-100, 1);
      z-index: 2;
    }
  }

  &__table {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    position: relative;
    cursor: grab;

    &--active {
      cursor: grabbing;
      touch-action: 'none';

      & * {
        pointer-events: none;
      }
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__row {
    display: flex;
  }

  &__col {
    font-size: 1rem;
    color: $gray-800;
    margin: 0 0 1.25rem;
    padding: 0 2.5rem 0 2.5rem;

    &--first {
      position: sticky;
      left: 0;
      z-index: 3;
      padding: 0 2.5rem 0 0;
    }
  }

  &__column-backdrop {
    position: absolute;
    left: -1rem;
    top: -1rem;
    bottom: -1rem;
    background: rgba($gray-100, 0.8);
    // box-shadow: 0.5rem 0 0.5rem $gray-100;
    z-index: 2;

    backdrop-filter: blur(5px);
    filter: blur(5px);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(
        90deg,
        rgba(249, 249, 250, 1) 0%,
        rgba(249, 249, 250, 0) 100%
      );
    }
  }
}
</style>
