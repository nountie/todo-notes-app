<template>
  <transition name="fade">
    <div :class="toastClass" class="toast">
      <div class="toast__content">
        <div class="toast__icon">
          <svg v-if="type === 'alert'" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.811 485.811" style="enable-background:new 0 0 485.811 485.811" xml:space="preserve"><path fill="white" d="m476.099 353.968-170.2-294.8c-27.8-48.7-98.1-48.7-125.8 0l-170.3 294.8c-27.8 48.7 6.8 109.2 62.9 109.2h339.9c56.1 0 91.3-61.1 63.5-109.2zm-233.2 43.8c-14.8 0-27.1-12.3-27.1-27.1s12.3-27.1 27.1-27.1 27.1 12.3 26.5 27.8c.7 14.1-12.3 26.4-26.5 26.4zm24.7-175.2c-1.2 21-2.5 41.9-3.7 62.9-.6 6.8-.6 13-.6 19.7-.6 11.1-9.3 19.7-20.4 19.7s-19.7-8-20.4-19.1c-1.8-32.7-3.7-64.8-5.5-97.5-.6-8.6-1.2-17.3-1.9-25.9 0-14.2 8-25.9 21-29.6 13-3.1 25.9 3.1 31.5 15.4 1.9 4.3 2.5 8.6 2.5 13.6-.6 13.7-1.9 27.3-2.5 40.8z"/></svg>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CToast',
  props: {
    type: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    toastClass () {
      return `toast--${this.type}`
    }
  }
}
</script>

<style lang="scss">
  .toast {
    $r: &;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fff;
    width: 100%;

    &--success {
      #{$r}__content {
        background: #4caf50;
      }
    }
    &--alert {
      #{$r}__content {
        background: #ff0000;
      }
    }

    &__icon {
      position: absolute;
      left: 0;
      margin-left: 12px;
    }

    &__content {
      margin-bottom: 30px;
      position: relative;
      height: 58px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 300;
      letter-spacing: 0.5px;
      font-size: 16px;
      width: 992px;
      z-index: 1000;
      background: #fff;
      margin-left: auto;
      margin-right: auto;
      padding: 6px 6px 6px 60px;
      border-radius: 6px;
    }
  }
</style>
