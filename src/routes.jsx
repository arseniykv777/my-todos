import {createRoutesFromElements, createBrowserRouter, Route} from "react-router-dom";

import App from "./App.jsx";
import TodoList from "./Todo/TodoList.jsx";
import Login from "./Auth/Login.jsx";
import Logout from "./Auth/Logout.jsx";

import {getList, login} from "./Auth/api.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='*' element={<App/>}>
      <Route index={true} element={<TodoList/>} loader={getList}/>
      <Route path='login' element={<Login />} action={login}/>
      <Route path='logout' element={<Logout/>}/>
    </Route>
  )
)
export default router;

