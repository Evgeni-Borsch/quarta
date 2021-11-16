<template>
  <div class="price">
    <div class="container">
      <div class="row my-5 py-3">
        <div class="col-6">
          <h2>Актуальный прайс-лист от&nbsp;Quarta</h2>
        </div>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="row my-5 py-3">
        <div class="col-6">
          <h2>Как мы можем помочь вам продавать больше</h2>
        </div>
        <div class="col-6 pt-3">
          <p>
            Чтобы вы могли зарабатывать больше и привлекать новых клиентов, мы
            обеспечиваем:
          </p>
        </div>
      </div>

      <hr />

      <div class="row my-5 py-3">
        <div class="col-6">
          <h3>Доступ к мировым брендам по оптовым ценам!</h3>
        </div>
        <div class="col-6">
          <p>
            В зависимости от партии товара и его типа, мы предлагаем специальные
            условия на каждую позицию. 24 категорий товаров: оптика, аксессуары,
            кронштейны, манки и приманки, ножи и многое другое.
          </p>
        </div>
      </div>

      <hr />

      <div class="row my-5 py-3">
        <div class="col-6">
          <h3>Приоритетное обновление товаров</h3>
        </div>
        <div class="col-6">
          <p>Мы официальный дистрибьютор для десятков брендов.</p>
          <p>
            Это значит, что вы будете получать товарные новинки первыми, по
            первоначальной цене и в максимально короткие сроки.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PricePage extends Vue {}
</script>

<style lang="scss" scoped>
.price {
  h2,
  h3,
  h4 {
    max-width: 500px;
  }

  p {
    max-width: 500px;
  }

  background-color: $white;
  font-size: 1rem;
}
</style>
