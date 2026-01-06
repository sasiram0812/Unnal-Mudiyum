import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Todo.css";
import Loader from "../components/Loader";



import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Work");
  const [filter, setFilter] = useState("all");
  
  


  const categories = ["Work", "Personal", "College", "Shopping"];

  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    // TODO page does not load DB now, so just wait 300ms
    await new Promise(r => setTimeout(r, 300));
    setLoading(false);
  };

  fetchData();
}, []);


  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(list.sort((a, b) => b.createdAt - a.createdAt));
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async () => {
    if (!input.trim()) return;
    if (!user) return;

    await addDoc(collection(db, "tasks"), {
      userId: user.uid,
      text: input,
      completed: false,
      priority: false,
      category: category,
      date: new Date().toLocaleString(),
      createdAt: Date.now(),
    });

    setInput("");
  };

  const toggleTask = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed,
    });
  };

  const togglePriority = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      priority: !task.priority,
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    if (filter === "priority") return t.priority;
    return true;
  });
  if (loading) return <Loader />;


  return (
    <div className="todo-page-container">
      <Navbar />

      <div className="todo-layout">
        
        {/* SIDEBAR */}
        <aside className="todo-sidebar slide-left">
          <div className="user-card">
            <div className="user-stats">
              <div><h4>{tasks.length}</h4><p>Total</p></div>
              <div><h4>{tasks.filter(t => t.completed).length}</h4><p>Completed</p></div>
              <div><h4>{tasks.filter(t => t.priority).length}</h4><p>Priority</p></div>
            </div>
          </div>

          <h3 className="side-title">Categories</h3>
          <div className="category-list">
            {categories.map((cat, i) => (
              <button 
                key={i}
                className={`category-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="todo-main fade-in">

          <div className="todo-header">
            <h2>{category} Tasks</h2>

            <div className="filters">
              <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>ALL</button>
              <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>ACTIVE</button>
              <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>COMPLETED</button>
              <button className={filter === "priority" ? "active" : ""} onClick={() => setFilter("priority")}>PRIORITY</button>
            </div>
          </div>

          <div className="task-input-box pop">
            <input
              type="text"
              placeholder="Create new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="new-task-btn" onClick={addTask}>New Task</button>
          </div>

          <div className="task-list slide-up">
            {filteredTasks.length === 0 && (
              <p className="no-tasks">No tasks found.</p>
            )}

            {filteredTasks.map((t) => (
              <div key={t.id} className="task-card">

                {/* LEFT SECTION */}
                <div className="task-left">
                  <input 
                    type="checkbox" 
                    checked={t.completed}
                    onChange={() => toggleTask(t)}
                  />
                  <span className={t.completed ? "done" : ""}>{t.text}</span>
                </div>

                {/* RIGHT SECTION */}
                <div className="task-right">
                  <button 
                    className={`priority-btn ${t.priority ? "active" : ""}`}
                    onClick={() => togglePriority(t)}
                  >
                    ★
                  </button>

                  <button className="delete-btn" onClick={() => deleteTask(t.id)}>
                    ✖
                  </button>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>
      
      <footer className="footer">
        © 2025 Unnal Mudiyum — consistency
                <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default Todo;
