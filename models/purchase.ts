export enum DeliveryOptions {
  pickup = 'pickup',
  post = 'post',
  delivery = 'delivery',
}

export enum DeliveryProvider {
  courier = 'courier',
  sdek = 'sdek',
}

export enum DeliverySDEKType {
  courier = 'courier',
  pvz = 'pvz',
}

export enum DiscountTypes {
  points = 'points',
  code = 'code',
}

export enum PaymentOptions {
  online = 'online',
  onReceiving = 'on-receiving',
  emoney = 'e-money',
  bankAccount = 'bank-account',
}

export enum OnlinePaymentType {
  card = 'card',
  apple = 'apple',
  google = 'google',
}

export enum BankPaymentType {
  receipt = 'receipt',
  account = 'account',
}

export enum PayOnRecive {
  cash = 'cash',
  card = 'card',
}
