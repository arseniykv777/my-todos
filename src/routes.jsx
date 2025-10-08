import {createRoutesFromElements, createBrowserRouter, Route} from "react-router-dom";

import App from "./App.jsx";
import TodoList from "./Todo/TodoList.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import TodoAdd from "./Todo/TodoAdd.jsx";
import TodoDetails from "./Todo/TodoDetails.jsx";

import {getList, getTodo, actTodo, login, logout, register, add} from "./Auth/api.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='*' element={<App/>}>
      <Route index={true} element={<TodoList/>} loader={getList} hydrateFallbackElement={<div>Загрузка...</div>} />
      <Route path='login' element={<Login />} action={login}/>
      <Route path='register' element={<Register/>} action={register}/>
      <Route path='add' element={<TodoAdd />} action={add}/>
      <Route path=':key' element={<TodoDetails />} loader={getTodo} action={actTodo}/>
      <Route path='logout' loader={logout}/>
    </Route>
  )
)
export default router;

