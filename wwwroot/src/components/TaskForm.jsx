import { useEffect, useState } from "react";
import { createTodo, updateTodo } from "../services/apiService";

export default function TaskForm({onClose, onSaved, editingTodo }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "New",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      console.log(editingTodo)
      setFormData(editingTodo);
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.id) {
        await updateTodo(formData.id, formData);
      } else {
        await createTodo(formData);
      }
      onSaved();
      setFormData({ title: "", description: "", status: "New" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="form-header">
          <h2>{formData.id ? 'Edit Task' : 'Add New Task'}</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="InProgress">InProgress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Saving...' : (formData.id ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
