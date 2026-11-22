import { useState } from "react";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

const notes = [
  { title: "Focus on what matters", body: "Break large goals into small, achievable tasks.", tag: "PRODUCTIVITY" },
  { title: "Make steady progress", body: "A little progress each day adds up over time.", tag: "MOTIVATION" },
  { title: "Take a mindful break", body: "Short breaks can help you return with fresh focus.", tag: "WELLBEING" }
];

function FocusNotes() {
  const [index, setIndex] = useState(0);
  const move = (step) => setIndex((current) => (current + step + notes.length) % notes.length);
  const note = notes[index];

  return (
    <section className="focus-note">
      <div className="note-symbol"><Lightbulb size={22} /></div>
      <div className="note-content">
        <span>{note.tag}</span>
        <h2>{note.title}</h2>
        <p>{note.body}</p>
        <div className="note-dots" aria-label={`Note ${index + 1} of ${notes.length}`}>
          {notes.map((item, i) => (
            <button key={item.title} className={i === index ? "current" : ""} onClick={() => setIndex(i)} aria-label={`Show note ${i + 1}`} />
          ))}
        </div>
      </div>
      <div className="note-controls">
        <button className="icon-button" onClick={() => move(-1)} aria-label="Previous note"><ChevronLeft /></button>
        <button className="icon-button" onClick={() => move(1)} aria-label="Next note"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default FocusNotes;
