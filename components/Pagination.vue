<template>
  <div v-if="totalPages > 1" class="pagination">
    <div v-if="!firstVisable" class="btn btn-sm mx-1" @click="innerCurrent = 1">
      1
    </div>
    <div v-if="!firstVisable" class="btn btn-sm disabled mx-1">...</div>

    <div
      v-for="page of pages"
      :key="page"
      class="btn btn-sm mx-1"
      :class="{ 'btn-primary': current === page }"
      @click="innerCurrent = page"
    >
      {{ page }}
    </div>
    <div v-if="!lastVisable" class="btn btn-sm disabled mx-1">...</div>
    <div class="btn btn-primary btn-sm mx-1" @click="nextPage">Дальше</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import paginate from '~/utils/paginate'

@Component({})
export default class PaginationVue extends Vue {
  innerCurrent = 1
  pages: Array<Number> = []
  totalPages = 1

  @Prop({ default: 1 }) total!: number
  @Prop({ default: 1 }) current!: number
  @Prop({ default: 20 }) itemsPerPage!: number

  get firstVisable() {
    return this.pages[0] === 1
  }

  get lastVisable() {
    return this.pages[this.pages.length - 1] === this.totalPages
  }

  @Watch('current')
  onCurrentChange() {
    this.innerCurrent = this.current
  }

  @Watch('total')
  updatePages() {
    const pagination = paginate(
      this.total,
      this.innerCurrent,
      parseInt(this.itemsPerPage.toString()) || this.total,
      5
    )

    this.totalPages = pagination.totalPages
    this.pages = pagination.pages
  }

  nextPage() {
    if (this.current < this.totalPages) this.innerCurrent++
  }

  created() {
    this.innerCurrent = this.current
    this.updatePages()
  }

  @Watch('innerCurrent')
  @Emit('change')
  onChange() {
    this.updatePages()
    return this.innerCurrent
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
