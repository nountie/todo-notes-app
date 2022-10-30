<template>
  <CBox class="stats-box">
    <div class="stats-box__item">
      <h3>Total</h3>
      <span data-testid="total">{{ total }}</span>
    </div>
    <div class="stats-box__item">
      <h3>Completed</h3>
      <span data-testid="completed">{{ completed }}</span>
    </div>
    <div class="stats-box__item">
      <h3>Not completed</h3>
      <span data-testid="not-completed">{{ notCompleted }}</span>
    </div>
  </CBox>
</template>

<script>
import CBox from '@/components/ui/CBox.vue'
export default {
  components: { CBox },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    total () {
      return this.data.length
    },
    completed () {
      return this.data.filter(item => item.status === 'Completed').length
    },
    notCompleted () {
      return this.data.filter(item => item.status === 'Not completed').length
    }
  }
}
</script>

<style lang="scss">
.stats-box {
  &__item {
    h3 {
      text-align: center;
      font-weight: 400;
      margin: 0;
      font-size: 14px;
      color: #bbb;
    }
    span {
      font-size: 32px;
      color: #999;
      font-weight: 400;
    }
  }
}
</style>
