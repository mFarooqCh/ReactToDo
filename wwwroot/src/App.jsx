import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskTable from './components/TaskTable'
import { fetchTodos, DeleteTodo } from './services/apiService'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTodo, setEditingTodo] = useState(null);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos()        
      setTasks(data)        
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadTodos()
  }, [])

  const handleEdit = (todo) => {
    setShowForm(true);
    setEditingTodo(todo);
  };
  
  const handleSaved = () => {
    setEditingTodo(null);
    setShowForm(false);
    loadTodos(); // re-fetch to show updated data
  };
  
  const handleDelete = (id) => {
    const removeTodo = async (id) => {
      try {
        await DeleteTodo(id);
        setTasks(tasks.filter((todo) => todo.id !== id));
      }
      catch (err) {
        console.error(err);
      }
    };
    removeTodo(id);
    //fetchTodos(); // re-fetch to show updated data
  };
  
  return (
    <div className="app">
      <h1>React ToDo</h1>
      <button onClick={() => setShowForm(true)}> Add New  Task </button>
      <br/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br/>
      {loading ? <p>Loading...</p> : <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />}
      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} onSaved={handleSaved} editingTodo={editingTodo} />
      )}
    </div>
  )
}

export default App
