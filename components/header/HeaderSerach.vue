<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control border-primary bg-white"
      placeholder="Искать товары..."
    />
    <button class="btn btn-primary">
      <SearchIcon />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import SearchIcon from '@/assets/icons/search.svg?icon'

export default defineComponent({
  components: { SearchIcon },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
