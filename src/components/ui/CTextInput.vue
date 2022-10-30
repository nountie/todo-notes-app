<template>
  <div class="text-input">
    <textarea
      ref="textInput"
      :placeholder="placeholder"
      :value="value"
      rows="3"
      class="text-input__textarea"
      @blur="emitInput($event)"
    ></textarea>
    <span class="text-input__error" v-if="isTouched && isEmpty">Field cannot be empty!</span>
  </div>
</template>

<script>
import * as DOMPurify from 'dompurify'

export default {
  name: 'CInput',
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
      this.$refs.textInput.blur()
    },
    untouch () {
      this.isTouched = false
    }
  }
}
</script>

<style lang="scss">
  .text-input {
    position: relative;
    margin-top: 20px;
    padding-bottom: 20px;
    &__textarea {
      font-family: 'Helvetica Neue', 'Arial', sans-serif;
      border: 1px solid #ccc;
      padding: 14px 12px;
      display: block;
      width: 100%;
      margin: 10px 0;
      font-size: 14px;

      &::placeholder {
        color: #bbb;
      }
    }

    &__error {
      color: rgb(207, 114, 114);
      font-size: 12px;
      position: absolute;
      bottom: 10px;
    }
  }
</style>
