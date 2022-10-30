import Vue from 'vue'
import Vuex from 'vuex'

import { fetchTodos } from '@/services/fetchers'
import { sendNewTodo, deleteTodo } from '@/services/mutators'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    isLoading: true,
    error: null
  },
  mutations: {
    SET_TODOS (state, payload) {
      state.todos = payload
      state.isLoading = false
    }
  },
  actions: {
    async removeTodo ({ commit }, payload) {
      commit('SET_TODOS', await deleteTodo(payload))
    },
    async removeTodos ({ dispatch }, payload) {
      await Promise.allSettled(payload.map(id => dispatch('removeTodo', id)))
    },
    async createTodo ({ commit, state, dispatch }, { title, content }) {
      try {
        await sendNewTodo({
          title,
          content,
          id: state.todos.length ? Math.max(...state.todos.map(todo => todo.id)) + 1 : 1
        })
        this.dispatch('loadTodos')
      } catch (error) {
        throw new Error(`Error adding new todo: ${error}`)
      }
    },
    async loadTodos ({ state, commit }) {
      try {
        state.isLoading = true
        const todos = await fetchTodos()
        commit('SET_TODOS', todos)
      } catch (error) {
        state.isError = true
        throw new Error(`Error loading todos: ${error}`)
      }
    }

  }
})
