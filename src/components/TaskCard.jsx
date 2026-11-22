import { CalendarDays, Pencil, Trash2 } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-card">
      <div className="task-card-main">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
        </div>
        <p className="task-description">{task.description || "No description provided."}</p>
        <div className="task-meta">
          <span className="category-chip">{task.category || "General"}</span>
          <span><CalendarDays size={14} /> {task.dueDate || "No due date"}</span>
        </div>
      </div>
      <div className="task-card-actions">
        <select value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)} aria-label={`Change status for ${task.title}`}>
          <option>To do</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <button className="small-icon-button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={16} /></button>
        <button className="small-icon-button danger" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}><Trash2 size={16} /></button>
      </div>
    </article>
  );
}

export default TaskCard;
