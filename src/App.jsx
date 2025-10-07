import { useEffect, useState } from "react";
import {NavLink, Outlet} from "react-router-dom";
import "./App.css";
import "./Layout.css"
import {setStateChangeHandler} from "./Auth/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleBurgerClick = () => {
    setIsActive((prev) => !prev);
  };

  const authStateChanged = __user => {
    setCurrentUser(__user);
  }

  useEffect(() => {
    const unsubscribe = setStateChangeHandler(authStateChanged);
    return () => {unsubscribe()};
  }, []);

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

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
