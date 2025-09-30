import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "./Todo/TodoList";
import TodoAdd from "./Todo/TodoAdd";
import TodoDetails from "./Todo/TodoDetails";
import NotFoundPage from "./NotFoundPage";
import "./App.css";
import Layout from "./components/Layout";
import Register from "./Auth/Register";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "./firebase";
import Logout from "./Auth/Logout";
import Login from "./Auth/Login";
import { getList } from "./Auth/api";
import { del } from "./Auth/api";
import { setDone } from "./Auth/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(new Array());

  const setDoneTodo = async (deedKey) => {
    setDone(currentUser, deedKey);
    setData((prev) => prev.map((obj) => (obj.key === deedKey ? { ...obj, done: true } : obj)));
  };

  const deleteTodo = async (deedKey) => {
    await del(currentUser, deedKey);
    setData((prev) => prev.filter((obj) => obj.key !== deedKey));
  };

  const addTodo = (deed) => {
    setData((prev) => [...prev, deed]);
  };

  const getDeed = (key) => {
    return data.find((obj) => obj.key === key);
  };

  const handleBurgerClick = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebase), (user) => {
      setCurrentUser(user);

      if (!user) {
        setData(new Array());
        setLoading(false);
        return;
      }
      const newData = async () => getList(user);
      newData().then((dataNew) => setData(dataNew));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout handleBurgerClick={handleBurgerClick} isActive={isActive} currentUser={currentUser} />}
        >
          <Route index element={<TodoList list={data} setDoneTodo={setDoneTodo} deleteTodo={deleteTodo} />}></Route>
          <Route path="add" element={<TodoAdd addTodo={addTodo} currentUser={currentUser} />}></Route>
          <Route path=":key" element={<TodoDetails getDeed={getDeed} data={data} />}></Route>
          <Route path="register" element={<Register currentUser={currentUser} />} />
          <Route path="logout" element={<Logout currentUser={currentUser} />}></Route>
          <Route path="login" element={<Login currentUser={currentUser} />} />

          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
