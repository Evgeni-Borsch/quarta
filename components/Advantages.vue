<template>
  <section class="advantages bg-white">
    <div class="container">
      <h2>Наши преимущества</h2>
      <div class="row">
        <div v-for="(item, index) of list" :key="index" class="col-3">
          <h4>
            <img :src="item.image" class="icon" />
            {{ item.title }}
          </h4>
          <p v-html="item.text"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import cache from '~/services/cache'
import { getBenefits } from '~/services/api/sections'
import { API_BASE_URL } from '~/services/constants'

const ADVANTAGES_CACHE = 'ADVANTAGES_CACHE'

export interface AdvantagesItem {
  title: string
  text: string
  image: string
}

@Component({})
export default class AdvantagesVue extends Vue {
  list: Array<AdvantagesItem> = []

  created() {
    if (cache[ADVANTAGES_CACHE]) {
      this.list = cache[ADVANTAGES_CACHE] as Array<AdvantagesItem>
      return null
    }

    getBenefits().then((response) => {
      response.ITEMS.forEach((item) => {
        this.list.push({
          title: item.NAME,
          text: item.PREVIEW_TEXT,
          image: API_BASE_URL + item.PREVIEW_PICTURE.SRC,
        })
      })

      cache[ADVANTAGES_CACHE] = this.list
    })
  }
}
</script>

<style lang="scss" scoped>
.advantages {
  padding: 8.75rem 0 2.75rem;

  h2 {
    margin-bottom: 6.125rem;
  }

  h4 {
    display: flex;
    align-items: center;
    padding: 0.875rem;
    background-color: $gray-100;
    border-radius: $border-radius;
    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1rem;
    max-width: 85%;
  }

  [class*='col-'] {
    margin-bottom: 6rem;
  }

  img.icon {
    margin-right: 1.25rem;
    max-height: 2.5rem;
    width: auto;
  }
}
</style>
