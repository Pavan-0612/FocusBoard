import { LayoutDashboard, CheckSquare, CalendarDays, Settings as SettingsIcon } from "lucide-react";

const items = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Tasks", icon: CheckSquare },
  { label: "Calendar", icon: CalendarDays },
  { label: "Settings", icon: SettingsIcon }
];

function Sidebar({ activeItem, onNavChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">F</div>
        <span>FocusBoard</span>
      </div>

      <p className="nav-label">WORKSPACE</p>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {items.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={`nav-item ${activeItem === label ? "active" : ""}`}
            onClick={() => onNavChange(label)}
            aria-current={activeItem === label ? "page" : undefined}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-avatar">FB</div>
        <div>
          <strong>My Workspace</strong>
          <span>Personal account</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
