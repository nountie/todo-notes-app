<template>
<div>
  <CTable
      :headers="['ID', 'Title', 'Content', 'Status']"
      :rows="todos"
      :is-loading="isLoading"
      class="todos-table"
  >
      <template #th-id="{ value }">
         <div class="todos-table__check-all">
            <input
              v-if="todos.length"
              id="check-all"
              type="checkbox"
              :checked="checkedRows.length === todos.length"
              @change="selectAll"
            />
            <label for="check-all">{{ value }}</label>
        </div>
      </template>
      <template #id="{ value, rowId }">
        <div class="id-cell">
          <input type="checkbox" v-model="checkedRows" :value="rowId" :id="`check-${rowId}`" />
          <label :for="`check-${rowId}`">{{ value }}</label>
        </div>
      </template>
      <template #empty>
        You have no todos :( Add one!
      </template>
  </CTable>
  <TodoActions />
  <DeleteAlert @decision="handleRemove($event)" v-model="showDeleteAlert">{{ deleteAlertText }}</DeleteAlert>
</div>
</template>

<script>
import CTable from '@/components/ui/CTable/CTable.vue'
import DeleteAlert from '@/components/DeleteAlert.vue'
import TodoActions from '@/components/TodoActions.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CTable,
    DeleteAlert,
    TodoActions
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checkedRows: [],
      showDeleteAlert: false
    }
  },
  computed: {
    ...mapState(['isLoading']),
    deleteAlertText () {
      switch (this.checkedRows.length) {
        case 1:
          return 'Do you want to delete selected note?'
        case this.todos.length:
          return 'Do you want to delete all notes?'
        default:
          return `Do you want to delete these ${this.checkedRows.length} notes?`
      }
    }
  },
  watch: {
    checkedRows (newVal) {
      this.showDeleteAlert = !!newVal.length
    }
  },
  methods: {
    handleRemove (decision) {
      if (decision === 'yes' && this.checkedRows.length) {
        this.removeTodos(this.checkedRows)
      }
      this.checkedRows = []
    },
    selectAll (e) {
      this.checkedRows = e.target.checked ? this.todos.map(todo => todo.id) : []
    },
    ...mapActions(['loadTodos', 'removeTodos'])
  },
  async created () {
    await this.loadTodos()
  }
}
</script>

<style lang="scss">
  .todos-table {
    &__actions {
      display: flex;
    }

    &__button-add {
      margin-left: auto;
    }

    &__check-all {
      display: flex;
      align-items: center;
      input {
        margin: 0;
        width: 15px;
        height: 15px;
      }
      label {
        padding-left: 0.75rem;
      }
      label, input {
        cursor: pointer;
      }
    }
  }

  .id-cell {
    color: #66b1cd;
    font-weight: 600;
    display: flex;
    align-items: center;

    label {
      padding: 0px 36px 0px 16px;
    }

    input {
      margin: 0;
      width: 15px;
      height: 15px;
    }

    label, input {
      cursor: pointer;
    }
  }

</style>
