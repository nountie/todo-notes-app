<template>
  <td
      class="cell"
  >
    <slot/>
  </td>
</template>

<script>
export default {
  name: 'CCell'
}
</script>

<style lang="scss">
  .cell {
    padding: .85rem 1rem;
    color: #777;
    font-size: 16px;
  }
</style>
