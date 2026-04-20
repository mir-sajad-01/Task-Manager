import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    const res = await axios.post("http://localhost:5000/tasks", {
      title
    });

    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const deleteTask = async (id) =>{
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task=>task._id!==id));
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}
          <button onClick ={()=>deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;