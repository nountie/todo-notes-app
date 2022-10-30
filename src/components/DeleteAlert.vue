<template>
  <CToast v-if="showAlert" type="alert">
    <p><slot /></p>
    <div>
      <CButton @click.native="decide('no')" class="alert__button" theme="toast" variant="outline">No</CButton>
      <CButton @click.native="decide('yes')" class="alert__button" theme="toast">Yes</CButton>
    </div>
  </CToast>
</template>

<script>
import CToast from './ui/CTable/CToast.vue'
import CButton from './ui/CButton.vue'

export default {
  name: 'DeleteAlert',
  model: {
    prop: 'showAlert',
    event: 'show'
  },
  components: {
    CToast,
    CButton
  },
  props: {
    showAlert: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    decide (decision) {
      this.$emit('show', false)
      this.$emit('decision', decision)
    }
  }
}
</script>

<style lang="scss">
.alert__button {
  margin: 0 6px;
}
</style>
