
const API_BASE = import.meta.env.VITE_API_BASE_URL

/**
 * Get all todos from the backend.
 */
export const fetchTodos = async () => {
    
  const response = await fetch(`${API_BASE}/todos`)
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  return await response.json()
}

/**
 * Create a new todo item.
 * @param {Object} todo - The todo object to be created.
 */
export const createTodo = async (todo) => {
  const response = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(
      errorBody?.title || 'Failed to create todo'
    )
  }

  return await response.json()
}


 export async function updateTodo(id, todo) {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
  }

  export async function DeleteTodo(id) {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }      
    });
  
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
  }