<template>
  <button
    :disabled="disabled"
    :class="`btn btn--${variant} ${theme && `btn--${theme}`} ${size && `btn--${size}`}`"
    class="btn"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss">
  .btn {
    $r: &;
    padding: 10px 20px;
    text-align: center;
    color: #444;
    font-size: 16px;
    min-width: 120px;
    border: 0;
    &:disabled {
      cursor: not-allowed;
    }
    &--wide {
      min-width: 180px;
    }
    &--primary {
       color: #fff;
      background: #00689b;
      cursor: pointer;
      &:hover {
        background: lighten(#00689b, 10);
      }
      &:disabled {
        background: rgba(#00689b, 0.7);
      }
    }
    &--outline {
      color: #00689b;
      background: none;
      cursor: pointer;
      &:hover {
        background: #e6e6e6;
      }
      &:disabled {
        opacity: 0.2;
      }
    }

    &--toast {
      &#{$r} {
        border-radius: 4px;
        border: 1px solid #fff;
        &--primary {
          background: #fff;
          color: #ff0000;
          &:hover {
            background: #efefef;
          }
        }
        &--outline {
          background: transparent;
          color: #fff;
          &:hover {
            background: #fff;
            color: #ff0000;
          }
        }
      }
    }
  }
</style>
