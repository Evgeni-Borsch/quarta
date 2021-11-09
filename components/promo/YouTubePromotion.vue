<template>
  <PromoWide v-if="response" :image="image" class="bg-primary">
    <div class="row">
      <div class="col"></div>
      <div class="col-5">
        <h3 v-html="title"></h3>
        <a :href="link" class="btn btn-outline-light" target="_blank">{{
          buttonText
        }}</a>
      </div>
    </div>

    <template #content-backdrop>
      <div class="backdrop">
        <a :href="link" target="_blank">
          <PlayButtonSvg class="play-button" />
        </a>
      </div>
    </template>
  </PromoWide>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import PromoWide from './PromoWide.vue'
import PlayButtonSvg from '~/assets/images/play-button.svg?inline'
import cache from '~/services/cache'
import { BannerResponse, getBanner } from '~/services/api/sections'
import { API_BASE_URL } from '~/services/constants'

const YOUTUBE_PROMOTION_CACHE = 'YOUTUBE_PROMOTION_CACHE'

@Component({
  components: { PromoWide, PlayButtonSvg }
})
export default class YouTubePromotionVue extends Vue {
  response: BannerResponse | null = null

  get title() {
    return this.response?.PROPERTIES.BANNER_TEXT.VALUE
  }

  get buttonText() {
    return this.response?.PROPERTIES.BANNER_BTN_TEXT.VALUE
  }

  get image() {
    return API_BASE_URL + this.response?.PROPERTIES.BANNER_IMAGE.SRC
  }

  get link() {
    return this.response?.PROPERTIES.BANNER_LINK.VALUE
  }

  created() {
    if (cache[YOUTUBE_PROMOTION_CACHE]) {
      this.response = cache[YOUTUBE_PROMOTION_CACHE] as BannerResponse
      return null
    }

    getBanner('327').then((response) => {
      this.response = response
    })
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: -14.5625rem;
  background-image: url("data:image/svg+xml,%3Csvg width='466' height='450' viewBox='0 0 466 450' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M453.954 225C453.954 100.938 352.122 0 226.96 0C101.798 0 0 100.972 0 225C0 349.028 101.833 450 226.995 450C248.559 450 269.881 447.015 290.406 441.08L315.397 433.875L265.346 368.927L254.581 370.917C245.547 372.598 236.271 373.422 226.995 373.422C144.407 373.422 77.2225 306.828 77.2225 224.966C77.2225 143.104 144.407 76.5096 226.995 76.5096C309.582 76.5096 376.767 143.104 376.767 224.966C376.767 259.652 364.34 293.207 342.223 319.693H258.389L360.845 447.804L361.294 447.873L362.991 449.966H466L401.273 369.065C435.056 328.923 453.954 278.008 453.954 225Z' fill='white' fill-opacity='0.05'/%3E%3C/svg%3E%0A");
}

.play-button {
  position: relative;
  transform: translateX(-50%);
  z-index: 1;
  transition: transform 0.3s;

  &:hover {
    transform: translateX(-50%) scale(1.2);
  }
}

.btn {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  font-weight: 500;
}

h3,
p {
  color: $white;
}

h3 {
  margin-bottom: 1.5rem;
}
</style>
