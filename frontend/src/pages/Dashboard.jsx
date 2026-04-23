import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FETCH TASKS
  useEffect(() => {
    if (!token) return (window.location.href = "/login");

    axios.get("/tasks", {
      headers: { Authorization: token }
    })
      .then(res => setTasks(res.data))
      .catch(() => alert("Failed to fetch tasks"));

  }, [token]);

  // ✅ ADD TASK
  const addTask = async () => {
    if (!title) return;

    try {
      const res = await axios.post(
        "/tasks",
        { title },
        { headers: { Authorization: token } }
      );

      setTasks([...tasks, res.data]);
      setTitle("");
    } catch {
      alert("Failed to add task");
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `/tasks/${id}`,
        { headers: { Authorization: token } }
      );

      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // ✅ TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: token } }
      );

      setTasks(tasks.map(t =>
        t._id === task._id ? res.data : t
      ));
    } catch {
      alert("Update failed");
    }
  };

  // ✅ FILTER + SEARCH
  const filteredTasks = tasks
    .filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });

  // ✅ STATS
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p className="text-sm text-gray-600">
            Welcome, {user?.email}
          </p>
        </div>

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

      {/* STATS */}
      <div className="flex gap-4 mb-4">
        <div className="bg-white p-3 rounded shadow">Total: {total}</div>
        <div className="bg-green-200 p-3 rounded">Completed: {completed}</div>
        <div className="bg-yellow-200 p-3 rounded">Pending: {pending}</div>
      </div>

      {/* ADD TASK */}
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

      {/* SEARCH */}
      <input
        placeholder="Search task..."
        className="p-2 border rounded mb-3 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-300 rounded">All</button>
        <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-400 rounded">Completed</button>
        <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-400 rounded">Pending</button>

        {/* MARK ALL */}
        <button
          onClick={async () => {
            await axios.put(
              "/tasks/mark-all",
              {},
              { headers: { Authorization: token } }
            );

            setTasks(tasks.map(t => ({ ...t, completed: true })));
          }}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Mark All Complete
        </button>
      </div>

      {/* TASK LIST */}
      <div className="bg-white p-4 rounded-xl shadow">
        {filteredTasks.map(task => (
          <div key={task._id} className="flex justify-between items-center mb-2">

            {/* LEFT */}
            {editId === task._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-1"
                />

                <button
                  onClick={async () => {
                    const res = await axios.put(
                      `/tasks/${task._id}`,
                      { title: editText },
                      { headers: { Authorization: token } }
                    );

                    setTasks(tasks.map(t =>
                      t._id === task._id ? res.data : t
                    ));

                    setEditId(null);
                  }}
                  className="bg-green-500 text-white px-2 ml-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <span className={task.completed ? "line-through" : ""}>
                {task.title}
              </span>
            )}

            {/* RIGHT */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(task)}
                className="bg-blue-400 px-2 rounded"
              >
                {task.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-400 px-2 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setEditId(task._id);
                  setEditText(task.title);
                }}
                className="bg-yellow-400 px-2 rounded"
              >
                Edit
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;