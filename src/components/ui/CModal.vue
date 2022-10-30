<template>
  <Transition @after-leave="emitHideEvent" name="fade">
    <div v-show="visible" class="modal">
      <div class="modal__content">
        <slot name="header" />
        <slot />
        <footer class="modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script>

export default {
  name: 'CModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitHideEvent () {
      this.$emit('hidden')
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    bottom: 0;
    width: 992px;
    margin-left: auto;
    margin-right: auto;
    &__footer {
      display: flex;
      justify-content: flex-start;
    }
    &__content {
      width: 400px;
      z-index: 1000;
      background: #fff;
      margin-bottom: 90px;
      padding: 24px;
      box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.25);
    }
  }
</style>
