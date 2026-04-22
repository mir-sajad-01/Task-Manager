import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }

    axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: token }
    })
      .then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!title) return;

    const res = await axios.post(
      "http://localhost:5000/tasks",
      { title },
      { headers: { Authorization: token } }
    );

    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/tasks/${id}`,
      { headers: { Authorization: token } }
    );

    setTasks(tasks.filter(t => t._id !== id));
  };

  const toggleComplete = async (task) => {
    const res = await axios.put(
      `http://localhost:5000/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: token } }
    );

    setTasks(tasks.map(t =>
      t._id === task._id ? res.data : t
    ));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Enter task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-300 rounded">All</button>
        <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-400 rounded">Completed</button>
        <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-400 rounded">Pending</button>
      </div>

      {/* Task List */}
      <div className="bg-white p-4 rounded-xl shadow">
        {filteredTasks.map(task => (
          <div key={task._id} className="flex justify-between items-center border-b py-2">
            <span className={task.completed ? "line-through text-gray-400" : ""}>
              {task.title}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(task)}
                className="bg-green-500 text-white px-2 rounded"
              >
                {task.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;