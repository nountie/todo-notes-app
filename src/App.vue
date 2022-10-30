<template>
  <div class="container">
    <StatsBox :data="todos" />
    <TodoTable :todos="todos" />
    <PortalTarget name="modals" />
  </div>
</template>

<script>
import StatsBox from './components/StatsBox.vue'
import TodoTable from './components/TodoTable.vue'
import { mapState } from 'vuex'

export default {
  components: {
    StatsBox,
    TodoTable
  },
  computed: {
    ...mapState(['todos'])
  }
}
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    background: #f7f7f7;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    max-width: 992px;
    margin: 50px auto;
  }

  /* Animations */
  .fade-enter-active, .fade-leave-active {
    transition: transform .5s;
  }

  .fade-enter, .fade-leave-to {
    transform: translateY(100%);
  }
</style>
