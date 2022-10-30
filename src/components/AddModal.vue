<template>
  <CModal data-testid="modal" :visible="visible" @hidden="resetForm">
    <template #header>
      <h2 class="modal__heading">Add note</h2>
    </template>

    <form id="add-form" @submit.prevent="addTodo">
      <CInput ref="title" type="text" v-model="newTodo.title" placeholder="Add title" />
      <CTextInput ref="content" v-model="newTodo.content" placeholder="Content" />
    </form>

    <template #footer>
      <CButton form="add-form" type="submit" variant="primary">Save</CButton>
      <CButton variant="outline" @click.native="closeModal">Cancel</CButton>
    </template>
    </CModal>
</template>

<script>
import CButton from '@/components/ui/CButton'
import CModal from '@/components/ui/CModal'
import CInput from '@/components/ui/CInput'
import CTextInput from '@/components/ui/CTextInput'
import { mapActions } from 'vuex'

export default {
  components: {
    CButton,
    CModal,
    CInput,
    CTextInput
  },
  model: {
    prop: 'visible',
    event: 'show'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newTodo: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions(['createTodo']),
    async addTodo () {
      if (!this.validate()) {
        return
      }

      await this.createTodo({
        title: this.newTodo.title,
        content: this.newTodo.content
      })
      this.closeModal()
    },
    validate () {
      this.$refs.title.touch()
      this.$refs.content.touch()
      if (!this.newTodo.title || !this.newTodo.content) {
        return false
      }
      return true
    },
    closeModal () {
      this.$emit('show', false)
    },
    resetForm () {
      this.$refs.title.untouch()
      this.$refs.content.untouch()
      this.newTodo = {
        title: '',
        content: ''
      }
    }
  }
}
</script>

<style lang="scss">
  .modal__heading {
    font-size: 21px;
    font-weight: 400;
    margin: 0 0 20px;
  }
</style>
