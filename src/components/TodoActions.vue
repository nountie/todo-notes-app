<template>
  <div class="todos-table__actions">
    <CButton size="wide" :disabled="isLoading || isError" class="todos-table__button-add" @click.native="showModal = true">Add</CButton>
    <Portal to="modals">
      <AddModal v-model="showModal" />
    </Portal>
  </div>
</template>

<script>
import AddModal from '@/components/AddModal.vue'
import CButton from '@/components/ui/CButton.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AddModal,
    CButton
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState(['isLoading', 'isError'])
  }
}
</script>

<style>

</style>
