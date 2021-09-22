<template>
  <div class="header-dropdown">
    <div class="header-dropdown__toggler">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class HeaderDropdown extends Vue {}
</script>

<style lang="scss" scoped></style>
