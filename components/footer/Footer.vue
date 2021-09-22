<template>
  <footer class="footer">
    <div class="container mb-5">
      <div class="row">
        <div class="col-12 col-lg-3">
          <a href="/">
            <LogoIcon class="footer__logo" />
          </a>
          <ul class="footer__free-call">
            <li>Бесплатный звонок по России</li>
            <li>
              <a href="tel:+">+7 (800) 500-54-17</a>
            </li>
          </ul>
        </div>

        <div class="col-12 col-lg-3">
          <FooterCollapseVue
            :title="isDesktop ? 'Санкт-Петербург' : 'Контакты Санкт-Петербург'"
          >
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-12">
                <ul>
                  <li>
                    <a href="tel:+">+7 (800) 775-03-04</a>
                  </li>
                  <li>Московский проспект, д.222А</li>

                  <li>
                    <a href="mailto:">shop@quarta-hunt.ru</a>
                  </li>
                </ul>
              </div>
              <div class="col-12 col-sm-6 col-lg-12">
                <ul>
                  <li>
                    <h6>Отдел оптовых продаж СПб</h6>
                  </li>
                  <li>
                    <a href="tel:+">+7 (812) 347-77-27</a>
                  </li>
                  <li>
                    <a href="mailto:">quarta@quarta-hunt.ru</a>
                  </li>
                </ul>
              </div>
            </div>
          </FooterCollapseVue>
        </div>

        <div class="col-12 col-lg-3">
          <FooterCollapseVue :title="isDesktop ? 'москва' : 'Контакты москва'">
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-12">
                <ul>
                  <li>
                    <a href="tel:+">+7 (495) 032-58-68</a>
                  </li>
                  <li>Южнопортовая, д.7, стр.7, оф. 407</li>

                  <li>
                    <a href="mailto:">shop@quarta-hunt.ru</a>
                  </li>
                </ul>
              </div>
              <div class="col-12 col-sm-6 col-lg-12">
                <ul>
                  <li>
                    <h6>Отдел оптовых продаж Москва</h6>
                  </li>
                  <li>
                    <a href="tel:+">+7 (495) 979-24-70</a>
                  </li>
                  <li>
                    <a href="mailto:">quarta@quarta-hunt.ru</a>
                  </li>
                </ul>
              </div>
            </div>
          </FooterCollapseVue>
        </div>
        <div class="col">
          <FooterCollapseVue title="Компания" class="footer__nav">
            <ul>
              <li>
                <a href="#">Каталог</a>
              </li>
              <li>
                <a href="#">О компании</a>
              </li>
              <li>
                <a href="#">Новости</a>
              </li>
              <li>
                <a href="#">Акции</a>
              </li>
              <li>
                <a href="#">Оптовикам</a>
              </li>
            </ul>
          </FooterCollapseVue>
        </div>
        <div class="col">
          <FooterCollapseVue title="Информация" class="footer__nav">
            <ul>
              <li>
                <a href="">Гарантии</a>
              </li>
              <li>
                <a href="">Оплата</a>
              </li>
              <li>
                <a href="">Доставка</a>
              </li>
              <li>
                <a href="">Контакты</a>
              </li>
              <li>
                <a href="">Вакансии</a>
              </li>
              <li>
                <a href="">Магазины</a>
              </li>
            </ul>
          </FooterCollapseVue>
        </div>
      </div>
    </div>
    <hr />
    <div class="container mt-4">
      <div class="row">
        <div class="col-4 footer__payment-methods">
          Принимаем к оплате
          <figure>
            <img
              width="342"
              src="~/assets/images/payment-methods.png"
              srcset="~/assets/images/payment-methods@2x.png 1.5x"
              alt="Visa, Yndex Money, MasterCard, Qiwi"
            />
          </figure>
        </div>
        <div class="col-4 footer__social">
          Мы в социальных сетях
          <div class="footer__social-icons">
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <VKIcon />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <TelegramIcon />
            </a>
          </div>
        </div>
        <div class="col-4 footer__made-by">
          <a
            href="https://serenity.agency/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="madeInSerenity" alt="Сделано в Serenity" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import FooterCollapseVue from './FooterCollapse.vue'

import useBreakpoints from '~/utils/useBreakpoints'

import LogoIcon from '~/assets/images/logo.svg?icon'
import FacebookIcon from '~/assets/icons/facebook.svg?icon'
import InstagramIcon from '~/assets/icons/instagram.svg?icon'
import VKIcon from '~/assets/icons/vk.svg?icon'
import TelegramIcon from '~/assets/icons/telegram.svg?icon'
import madeInSerenity from '~/assets/images/made-in-serenity.svg'

export default defineComponent({
  components: {
    FooterCollapseVue,
    LogoIcon,
    VKIcon,
    FacebookIcon,
    InstagramIcon,
    TelegramIcon,
  },
  setup() {
    const { isDesktop } = useBreakpoints()

    return { isDesktop, madeInSerenity }
  },
})
</script>

<style lang="scss" scoped>
.footer {
  padding: 100px 0;
  background-color: $gray-800;
  color: $white;

  &__free-call {
    font-size: 0.875rem;
    color: $white;
  }

  &__logo {
    margin-bottom: 1.875rem;
    color: $white;
  }

  a {
    font-size: 1rem;
    color: rgba($white, 0.5);
    text-decoration: none;
  }

  a:hover {
    color: $white;
  }

  a[href^='tel:'] {
    color: $white;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
  }

  ul {
    padding: 0 0 1em;
    li {
      display: block;
      margin: 0 0 10px;
      color: rgba($white, 0.5);
      text-decoration: none;

      font-size: 0.875rem;
    }
  }

  &::v-deep h6 {
    font-size: 0.875rem;
    color: $white;
    text-transform: uppercase;
  }

  &__nav {
    &::v-deep h6 {
      font-size: 0.875rem;
      text-transform: none;
      margin-bottom: 1.125rem;
    }

    a {
      font-size: 0.875rem;
    }
  }

  &__payment-methods {
    figure {
      margin-top: 1.5rem;
    }
  }

  &__social {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__social-icons {
    margin-top: 1rem;
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
    }
  }

  &__made-by {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-top: 2.25rem;
  }
}
</style>
