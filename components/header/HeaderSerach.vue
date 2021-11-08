<template>
  <form @submit.prevent="onSubmit">
    <div class="input-group">
      <input
        v-model="query"
        type="text"
        class="form-control border-primary bg-white"
        :class="{ 'py-2': mobile }"
        placeholder="Искать товары..."
      />
      <button
        class="btn btn-primary"
        :class="{ 'py-2 px-2': mobile }"
        type="submit"
      >
        <SearchIcon />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import SearchIcon from '@/assets/icons/search.svg?icon'

@Component({ components: { SearchIcon } })
export default class HeaderSerachVue extends Vue {
  @Prop({ default: false }) mobile!: boolean

  query = ''

  get queryFromURI(): string {
    return (this.$route.query.q as string) ?? ''
  }

  get path(): string {
    return this.$route.path
  }

  created() {
    this.updateQuery()
  }

  @Watch('path')
  updateQuery() {
    if (/^\/search/.test(this.$route.path)) {
      if (this.queryFromURI) this.query = this.queryFromURI
    } else {
      this.query = ''
    }
  }

  onSubmit() {
    this.$router.push({
      path: '/search',
      query: {
        q: this.query
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
