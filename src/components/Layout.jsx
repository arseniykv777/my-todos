import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout({ handleBurgerClick, isActive }) {
  return (
    <>
      <header className="header">
        <nav className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
              TODOS
            </NavLink>
          </div>

          <div className={isActive ? "burger-menu burger-active" : "burger-menu"} onClick={handleBurgerClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={isActive ? "navbar-all navbar-active" : "navbar-all"}>
            <NavLink to="/add" className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
              Создать новое дело
            </NavLink>
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
