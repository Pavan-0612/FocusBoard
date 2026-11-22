import { useEffect, useMemo, useState } from "react";
import { ListTodo, Clock3, CheckCircle2, ChartNoAxesCombined } from "lucide-react";
import "./index.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Calendar from "./components/Calendar";
import Settings from "./components/Settings";
import { sampleTasks } from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard-tasks", sampleTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activePriority, setActivePriority] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("focusboard-theme") || "light");
  const [userName, setUserName] = useState(() => localStorage.getItem("focusboard-username") || "Alex");


  useEffect(() => {
    localStorage.setItem("focusboard-username", userName);
  }, [userName]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    localStorage.setItem("focusboard-theme", theme);
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const handleNavigation = (item) => {
    setActiveItem(item);
    setShowForm(false);
    setEditingTask(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (item === "My Tasks") {
      window.setTimeout(() => document.getElementById("my-tasks")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((task) => task.status === "In progress").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const completion = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeStatus === "All" || task.status === activeStatus;
    const matchesPriority = activePriority === "All" || task.priority === activePriority;
    return matchesSearch && matchesStatus && matchesPriority;
  }), [tasks, searchTerm, activeStatus, activePriority]);

  const saveTask = (taskData) => {
    if (editingTask) {
      setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...taskData, id: editingTask.id } : task));
    } else {
      setTasks((current) => [...current, { ...taskData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((current) => current.filter((task) => task.id !== id));
    }
  };

  const changeStatus = (id, status) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));
  };

  const openAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <Sidebar activeItem={activeItem} onNavChange={handleNavigation} />
      <main className="main-content">
        {activeItem === "Calendar" ? <Calendar tasks={tasks} /> :
         activeItem === "Settings" ? <Settings theme={theme} setTheme={setTheme} userName={userName} setUserName={setUserName} /> :
         <>
          <Header onAddTask={openAddTask} />
          <section className="welcome-section">
            <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
            <h2>{getGreeting()}, {userName.trim() || "there"}! 👋</h2>
            <p>Organize your work, track your progress, and achieve your goals.</p>
          </section>

          <section className="stats-grid" aria-label="Task statistics">
            <StatCard title="Total Tasks" value={totalTasks} icon={ListTodo} color="blue" />
            <StatCard title="In Progress" value={inProgressTasks} icon={Clock3} color="orange" />
            <StatCard title="Completed" value={completedTasks} icon={CheckCircle2} color="green" />
            <StatCard title="Completion" value={`${completion}%`} icon={ChartNoAxesCombined} color="purple" />
          </section>

          <FocusNotes />

          <section className="tasks-section" id="my-tasks">
            <div className="tasks-heading">
              <div><p className="eyebrow">STAY ON TRACK</p><h2>My Tasks</h2><p>Manage and organize your work.</p></div>
              <button className="primary-button mobile-add" onClick={openAddTask}>+ Add Task</button>
            </div>
            <div className="task-toolbar">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <FilterTabs activeStatus={activeStatus} onStatusChange={setActiveStatus} activePriority={activePriority} onPriorityChange={setActivePriority} />
            </div>
            <TaskList tasks={filteredTasks} onEdit={editTask} onDelete={deleteTask} onStatusChange={changeStatus} />
          </section>
          {showForm && <TaskForm task={editingTask} onSave={saveTask} onClose={() => { setShowForm(false); setEditingTask(null); }} />}
         </>}
      </main>
    </div>
  );
}

export default App;
