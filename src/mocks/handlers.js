import { rest } from 'msw'

let todos = [
  {
    id: 1,
    title: 'delectus aut autem',
    content: 'Lorem ipsum',
    status: 'New'
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    content: 'Lorem ipsum',
    status: 'Completed'
  },
  {
    id: 3,
    title: 'fugiat veniam minus',
    content: 'Lorem ipsum',
    status: 'Not completed'
  }
]

export default [
  rest.get('/todos', (req, res, ctx) => {
    return res(
      ctx.json(todos)
    )
  }),
  rest.post('/todos/add', async (req, res, ctx) => {
    const { id, content, title } = await req.json()
    const newTodo = {
      id,
      title,
      content,
      status: 'New'
    }
    todos.push(newTodo)
    return res(
      ctx.status(201),
      ctx.json(newTodo)
    )
  }),
  rest.delete('/todos/delete/:id', async (req, res, ctx) => {
    const { id } = req.params
    todos = todos.filter(todo => todo.id !== Number(id))
    return res(
      ctx.json(todos)
    )
  })
]
