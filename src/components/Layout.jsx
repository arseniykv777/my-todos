import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout({ handleBurgerClick, isActive, currentUser }) {
  return (
    <>
      <header className="header">
        <nav className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
              {currentUser ? currentUser.email : "TODOS"}
            </NavLink>
          </div>

          <div className={isActive ? "burger-menu burger-active" : "burger-menu"} onClick={handleBurgerClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={isActive ? "navbar-all navbar-active" : "navbar-all"}>
            {currentUser && (
              <NavLink to="/add" className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
                Создать новое дело
              </NavLink>
            )}
            {currentUser && (
              <NavLink to="/logout" className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
                Выйти
              </NavLink>
            )}

            {!currentUser && (
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}
              >
                Зарегистрироваться
              </NavLink>
            )}

            {!currentUser && (
              <NavLink to="/login" className={({ isActive }) => (isActive ? "navbar-item is-active" : "navbar-item")}>
                Войти
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
