import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from './UserRouter';
import AdminRouter from "./AdminRouter";
function Router() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/*" Component={UserRouter} />
      <Route path="/admin/*" Component={AdminRouter} />
    </Routes>
   </BrowserRouter>
  )
}

export default Router