import {createRoutesFromElements, createBrowserRouter, Route} from "react-router-dom";

import App from "./App.jsx";
import TodoList from "./Todo/TodoList.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import TodoAdd from "./Todo/TodoAdd.jsx";
import TodoDetails from "./Todo/TodoDetails.jsx";
import Error404 from "./Error404.jsx";

import {getList, getTodo, actTodo, login, logout, register, add, onlyLoggedOut} from "./Auth/api.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='*' element={<App/>}>
      <Route index={true} element={<TodoList/>} loader={getList} hydrateFallbackElement={<div>Загрузка...</div>} />
      <Route path='login' element={<Login />} action={login} loader={onlyLoggedOut} hydrateFallbackElement={<div>Загрузка...</div>}/>
      <Route path='register' element={<Register/>} action={register} loader={onlyLoggedOut} hydrateFallbackElement={<div>Загрузка...</div>}/>
      <Route path='add' element={<TodoAdd />} action={add}/>
      <Route path=':key' element={<TodoDetails />} loader={getTodo} action={actTodo} errorElement={<Error404 />} hydrateFallbackElement={<div>Загрузка...</div>}/>
      <Route path='logout' loader={logout} hydrateFallbackElement={<div>Загрузка...</div>}/>
    </Route>
  )
)
export default router;

