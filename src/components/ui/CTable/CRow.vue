<template>
  <tr class="row">
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'CRow'
}
</script>

<style lang="scss">
.row {
  border-bottom: 1px solid #efefef;
  &:hover {
    background: #efefef;
  }
  &:last-child {
    border-bottom: 0;
  }
}

</style>
