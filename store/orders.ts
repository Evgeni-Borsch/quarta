import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { getOrders } from '~/services/api/cabinet'

export interface OrderProduct {
  id: string
  name: string
  price: number
  count: number
}
export interface Order {
  id: string
  delivery: string
  deliveryPrice: number
  payment: string
  price: number
  products: Array<OrderProduct>
}

@Module({
  name: 'orders',
  stateFactory: true,
  namespaced: true,
})
export default class OrdersModule extends VuexModule {
  isFetched = false
  items: Array<Order> = []

  @Action
  async fetch() {
    const response = await getOrders()
    const items: Array<Order> = []

    response.ORDERS.forEach((item) => {
      const products: Array<OrderProduct> = []

      const keys = Object.keys(item.BASKET_ITEMS)

      for (const key of keys) {
        const product = item.BASKET_ITEMS[key]

        products.push({
          id: product.ID,
          name: product.NAME,
          price: parseInt(product.PRICE) || 0,
          count: 1,
        })
      }

      items.push({
        id: item.ORDER.ACCOUNT_NUMBER,
        delivery: item.SHIPMENT[0]?.DELIVERY_NAME ?? '',
        payment: item.PAYMENT[0]?.PAY_SYSTEM_NAME ?? '',
        deliveryPrice: parseInt(item.ORDER.PRICE_DELIVERY) || 0,
        price: parseInt(item.ORDER.PRICE),
        products,
      })
    })

    this.setItems(items)
  }

  @Mutation
  setItems(items: Array<Order>) {
    this.items = Array.from(items)
  }
}
