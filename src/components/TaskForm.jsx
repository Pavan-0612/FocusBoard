import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyTask = {
  title: "",
  description: "",
  category: "General",
  status: "To do",
  priority: "Medium",
  dueDate: ""
};

function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || emptyTask);

  useEffect(() => {
    setForm(task || emptyTask);
  }, [task]);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim()
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{task ? "UPDATE YOUR WORK" : "PLAN YOUR WORK"}</p>
            <h2 id="task-form-title">{task ? "Edit Task" : "Create New Task"}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close form"><X /></button>
        </div>
        <form onSubmit={submit}>
          <label>Task title *
            <input name="title" value={form.title} onChange={update} required maxLength="90" placeholder="Enter task title" />
          </label>
          <label>Description
            <textarea name="description" value={form.description} onChange={update} rows="3" placeholder="Add a short description" />
          </label>
          <div className="form-row">
            <label>Category
              <input name="category" value={form.category} onChange={update} placeholder="General" />
            </label>
            <label>Due date
              <input type="date" name="dueDate" value={form.dueDate} onChange={update} />
            </label>
          </div>
          <div className="form-row">
            <label>Status
              <select name="status" value={form.status} onChange={update}>
                <option>To do</option><option>In progress</option><option>Completed</option>
              </select>
            </label>
            <label>Priority
              <select name="priority" value={form.priority} onChange={update}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">{task ? "Save Changes" : "Create Task"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskForm;
