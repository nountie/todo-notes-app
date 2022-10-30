<template>
<div class="input">
  <input
    ref="input"
    :value="value"
    :placeholder="placeholder"
    v-bind="$attrs"
    type="text"
    class="input__input"
    @blur="emitInput($event)"
  />
  <span class="input__error" v-if="isTouched && isEmpty">Field cannot be empty!</span>
</div>
</template>

<script>
import * as DOMPurify from 'dompurify'

export default {
  name: 'CInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data () {
    return {
      isTouched: false
    }
  },
  computed: {
    isEmpty () {
      return !this.value
    }
  },
  methods: {
    emitInput (event) {
      this.touch()
      this.$emit('input', DOMPurify.sanitize(event.target.value))
    },
    touch () {
      this.isTouched = true
      this.$refs.input.blur()
    },
    untouch () {
      this.isTouched = false
    }
  }
}
</script>

<style lang="scss">
  .input {
    position: relative;
    margin: 20px 0 0;
    padding-bottom: 4px;

    &__input {
      border: 1px solid #ccc;
      padding: 8px 12px;
      display: block;
      width: 100%;
      font-size: 14px;

      &::placeholder {
        color: #bbb;
      }
    }
    &__error {
      color: rgb(207, 114, 114);
      font-size: 12px;
      position: absolute;
      bottom: -15px;
    }
  }
</style>
