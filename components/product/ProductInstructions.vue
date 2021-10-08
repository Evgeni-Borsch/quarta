<template>
  <div class="product-instructions container">
    <div class="row">
      <div class="col-6">
        <h3>Инструкции</h3>
        <div class="product-instructions__files">
          <div
            v-for="(file, index) of files"
            :key="index"
            class="product-instructions__file"
          >
            <div class="product-instructions__file-icon">
              <DocumentDownloadIcon />
            </div>
            <a :href="file.url" class="product-instructions__file-name">
              {{ file.name }}
            </a>
            <div class="product-instructions__file-size">
              ({{ file.size }} Mb)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import DocumentDownloadIcon from '~/assets/icons/document-download.svg?icon'
import { ProductItem } from '~/store'

@Component({
  components: {
    DocumentDownloadIcon,
  },
})
export default class ProductInstructions extends Vue {
  @Prop({ required: true }) product!: ProductItem

  files = [
    {
      name: 'Инструкция HS403B - 2016.pdf',
      size: '2,3',
      url: '#',
    },
    {
      name: 'Holosun Линза под углом.pdf',
      size: '2,3',
      url: '#',
    },
    {
      name: 'Инструкция HS403B - 2016.pdf',
      size: '2,3',
      url: '#',
    },
  ]
}
</script>

<style lang="scss" scoped>
.product-instructions {
  &__files {
    margin-top: 2.875rem;
  }

  &__file {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1.875rem;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__file-size {
    font-size: 0.75rem;
    padding-top: 0.25rem;
  }

  &__file-icon {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
