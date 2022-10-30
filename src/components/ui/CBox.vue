<template functional>
  <div class="box">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CBox'
}
</script>

<style lang="scss">
  .box {
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
    padding: 8px 12px;
    display: block;
    width: 50%;
    margin: 26px 0;
    padding: 35px 50px 35px 30px;
    background: #fff;
    color: #777;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    &::placeholder {
      color: #bbb;
    }
  }
</style>
