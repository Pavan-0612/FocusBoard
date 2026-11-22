import { useEffect, useState } from "react";
import { Sun, Moon, Palette, Info, RotateCcw } from "lucide-react";

const colors = ["#6865e9", "#2196f3", "#16a085", "#e67e22", "#e84393"];

function Settings({ theme, setTheme, userName, setUserName }) {
  const [accent, setAccent] = useState(() => localStorage.getItem("focusboard-accent") || colors[0]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", accent);
    localStorage.setItem("focusboard-accent", accent);
  }, [accent]);

  const resetSettings = () => {
    setTheme("light");
    setAccent(colors[0]);
  };

  return (
    <section className="page-section settings-section">
      <div className="page-heading"><div><p className="eyebrow">MAKE IT YOURS</p><h1>Settings</h1><p>Customize your FocusBoard experience.</p></div></div>

      <article className="settings-card profile-card">
        <div className="settings-card-heading">
          <Info size={21} />
          <div>
            <h2>Profile</h2>
            <p>Choose the name shown in your dashboard greeting.</p>
          </div>
        </div>
        <label className="profile-input-wrap">
          <span>Your name</span>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Enter your name"
            maxLength={40}
          />
        </label>
      </article>

      <article className="settings-card">
        <div className="settings-card-heading"><Sun size={21} /><div><h2>Appearance</h2><p>Choose your preferred theme.</p></div></div>
        <div className="theme-options">
          <button className={theme === "light" ? "theme-option active" : "theme-option"} onClick={() => setTheme("light")}><Sun size={18} /> Light Mode</button>
          <button className={theme === "dark" ? "theme-option active" : "theme-option"} onClick={() => setTheme("dark")}><Moon size={18} /> Dark Mode</button>
        </div>
      </article>

      <article className="settings-card">
        <div className="settings-card-heading"><Palette size={21} /><div><h2>Accent Color</h2><p>Choose the highlight color used in the dashboard.</p></div></div>
        <div className="color-options">
          {colors.map((color) => <button key={color} className={`color-swatch ${accent === color ? "active" : ""}`} style={{ backgroundColor: color }} onClick={() => setAccent(color)} aria-label={`Choose accent ${color}`} aria-pressed={accent === color} />)}
        </div>
      </article>

      <article className="settings-card">
        <div className="settings-card-heading"><Info size={21} /><div><h2>Application Information</h2><p>FocusBoard — Task Management Dashboard</p><p>Version 1.0.0</p></div></div>
      </article>

      <article className="settings-card reset-card">
        <div className="settings-card-heading"><RotateCcw size={21} /><div><h2>Reset Appearance</h2><p>Restore the default theme and accent color. Your tasks will not be changed.</p></div></div>
        <button className="secondary-button reset-button" onClick={resetSettings}>Reset Settings</button>
      </article>
    </section>
  );
}

export default Settings;
