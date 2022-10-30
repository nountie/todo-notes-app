import axios from 'axios'

export const sendNewTodo = async function (payload) {
  const response = await axios.post('/todos/add', payload)
  return response.data
}

export const deleteTodo = async function (payload) {
  const response = await axios.delete(`/todos/delete/${payload}`)
  return response.data
}
