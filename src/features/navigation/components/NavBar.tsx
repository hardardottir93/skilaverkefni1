import { NavLink } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="navbar">
      <h1>Team Task Hub</h1>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
      </div>
    </nav>
  );
}
