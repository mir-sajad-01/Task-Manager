import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks
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

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  // Toggle complete
  const toggleComplete = async (task) => {
    const res = await axios.put(
      `http://localhost:5000/tasks/${task._id}`,
      { completed: !task.completed }
    );

    setTasks(tasks.map(t =>
      t._id === task._id ? res.data : t
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  })

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
      <ul>
        {filteredTasks.map(task => (
          <li key={task._id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none"
              }}
            >
              {task.title}
            </span>

            <button onClick={() => toggleComplete(task)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;