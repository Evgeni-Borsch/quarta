<template>
  <div class="pagination">
    <div
      v-for="page of pages"
      :key="page"
      class="btn btn-sm mx-1"
      @click="innerCurrent = page"
    >
      {{ page }}
    </div>
    <div class="btn btn-sm disabled mx-1">...</div>
    <div class="btn btn-primary btn-sm mx-1" @click="innerCurrent++">
      Дальше
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import paginate from '~/utils/paginate'

@Component({})
export default class PaginationVue extends Vue {
  innerCurrent = 1
  pages: Array<Number> = []

  @Prop({ default: 100 }) count!: number
  @Prop({ default: 1 }) current!: number

  updatePages() {
    this.pages = paginate(this.count * 20, this.innerCurrent, 20, 3).pages
  }

  created() {
    this.innerCurrent = this.current
    this.updatePages()
  }

  @Watch('innerCurrent')
  onChange() {
    this.updatePages()
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 3.125rem;

  .btn {
    font-size: 0.75rem;
  }

  .btn:not(.btn-primary) {
    background-color: $white;
    color: $gray-800;
  }
}
</style>
