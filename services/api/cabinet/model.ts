export interface AddressOptions {
  locality: string
  street: string
  house: string
  apartment: string
}

export interface PersonalDataOptions {
  phone: string
  firstName: string
  secondName: string
  email: string
}

export interface OrdersResponse {
  ITEMS: Array<{
    BASKET_ITEMS: {
      [id: string]: {
        ID: string
        PRICE: string
      }
    }
    ORDER: {
      ACCOUNT_NUMBER: string
      PAYED: string
      PRICE: string
      PRICE_DELIVERY: string
    }
    PAYMENT: Array<{
      PAY_SYSTEM_NAME: string
    }>
    SHIPMENT: Array<{
      DELIVERY_NAME: string
    }>
  }>
}
