import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [isLogin, setIsLogin] = useState(true);

  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: ""
  });

  const API_URL = "http://127.0.0.1:5000";

  useEffect(() => {

    if (token) {
      fetchTasks();
    }

  }, [token]);

  const fetchTasks = async () => {

    try {

      const response = await fetch(
        API_URL + "/api/tasks",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
      }

    } catch (error) {

      console.log(error);

      setTasks([]);
    }
  };

  const handleAuth = async () => {

    const endpoint = isLogin
      ? "/api/login"
      : "/api/register";

    const response = await fetch(
      API_URL + endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(authData)
      }
    );

    const data = await response.json();

    if (data.token) {

      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);

    } else {

      alert("Authentication failed");
    }
  };

  const createTask = async () => {

    await fetch(
      API_URL + "/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(formData)
      }
    );

    setFormData({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      due_date: ""
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {

    await fetch(
      API_URL + "/api/tasks/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchTasks();
  };

  const completeTask = async (task) => {

    await fetch(
      API_URL + "/api/tasks/" + task.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          ...task,
          status: "Completed"
        })
      }
    );

    fetchTasks();
  };

  const logout = () => {

    localStorage.removeItem("token");

    setToken("");

    setTasks([]);
  };

  if (!token) {

    return (
      <div className="auth-container">

        <div className="auth-card">

          <h1>OpsFlow</h1>

          <input
            placeholder="Email"
            value={authData.email}
            onChange={(e) =>
              setAuthData({
                ...authData,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={authData.password}
            onChange={(e) =>
              setAuthData({
                ...authData,
                password: e.target.value
              })
            }
          />

          <button onClick={handleAuth}>
            {isLogin ? "Login" : "Register"}
          </button>

          <p
            className="switch"
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {isLogin
              ? "Switch to Register"
              : "Switch to Login"}
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="container">

      <div className="topbar">

        <h1>OpsFlow Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <div className="task-form">

        <input
          placeholder="Task title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value
            })
          }
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value
            })
          }
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value
            })
          }
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: e.target.value
            })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={formData.due_date}
          onChange={(e) =>
            setFormData({
              ...formData,
              due_date: e.target.value
            })
          }
        />

        <button onClick={createTask}>
          Create Task
        </button>

      </div>

      <div className="task-grid">

        {tasks.map((task) => (

          <div
            key={task.id}
            className="task-card"
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span>
              Status: {task.status}
            </span>

            <span>
              Priority: {task.priority}
            </span>

            <span>
              Due: {task.due_date}
            </span>

            <div className="actions">

              <button
                onClick={() =>
                  completeTask(task)
                }
              >
                Complete
              </button>

              <button
                className="delete"
                onClick={() =>
                  deleteTask(task.id)
                }
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

export default App;
