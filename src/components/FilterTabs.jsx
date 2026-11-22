const statuses = ["All", "To do", "In progress", "Completed"];

function FilterTabs({ activeStatus, onStatusChange, activePriority, onPriorityChange }) {
  return (
    <div className="filters">
      <div className="status-tabs" aria-label="Filter tasks by status">
        {statuses.map((status) => (
          <button key={status} className={activeStatus === status ? "selected" : ""} onClick={() => onStatusChange(status)}>
            {status}
          </button>
        ))}
      </div>
      <select value={activePriority} onChange={(event) => onPriorityChange(event.target.value)} aria-label="Filter by priority">
        <option value="All">All priorities</option>
        <option value="High">High priority</option>
        <option value="Medium">Medium priority</option>
        <option value="Low">Low priority</option>
      </select>
    </div>
  );
}

export default FilterTabs;
