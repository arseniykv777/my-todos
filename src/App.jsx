import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import TodoList from "./Todo/TodoList";
import TodoAdd from "./Todo/TodoAdd";
import TodoDetails from "./Todo/TodoDetails";
import NotFoundPage from "./NotFoundPage";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  const date1 = new Date(2025, 8, 3, 14, 15);
  const date2 = new Date(2023, 8, 2, 12, 15);

  const [isActive, setIsActive] = useState(false);

  const initialData = [
    {
      title: "Изучить React",
      desc: "test",
      image: "",
      done: false,
      createdAt: date1.toLocaleString(),
      key: date1.getTime(),
    },
    {
      title: "qweqwe",
      desc: "ewewe",
      image: "",
      done: false,
      createdAt: date2.toLocaleString(),
      key: date2.getTime(),
    },
  ];

  const [data, setData] = useState(initialData);

  const setDoneTodo = (deedKey) => {
    setData((prev) => prev.map((obj) => (obj.key === deedKey ? { ...obj, done: true } : obj)));
  };

  const deleteTodo = (deedKey) => {
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout handleBurgerClick={handleBurgerClick} isActive={isActive} />}>
          <Route index element={<TodoList list={data} setDoneTodo={setDoneTodo} deleteTodo={deleteTodo} />}></Route>
          <Route path="add" element={<TodoAdd addTodo={addTodo} />}></Route>
          <Route path=":key" element={<TodoDetails getDeed={getDeed} />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
