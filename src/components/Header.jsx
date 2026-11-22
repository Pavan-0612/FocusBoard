import { Bell, Plus } from "lucide-react";

function Header({ onAddTask }) {
  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">WORKSPACE / OVERVIEW</p>
        <h1>My Dashboard</h1>
      </div>
      <div className="header-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
        </button>
        <button className="primary-button" onClick={onAddTask}>
          <Plus size={18} /> Add Task
        </button>
      </div>
    </header>
  );
}

export default Header;
