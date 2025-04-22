function TaskTable({ tasks, onEdit, onDelete }) {
    return (
      <table border="1" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            (tasks == undefined) 
            ?
            <tr>
              <td colSpan="4">                
                  <p>There is no task</p>
                </td>            
            </tr>
            :
          tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => onEdit(task)}>Edit</button> &nbsp;
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  
  export default TaskTable  