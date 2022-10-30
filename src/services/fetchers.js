export const fetchTodos = async function () {
  const response = await fetch('/todos')
  return await response.json()
}
