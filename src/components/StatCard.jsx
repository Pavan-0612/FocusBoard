function StatCard({ title, value, icon: Icon, color }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={21} /></div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

export default StatCard;
