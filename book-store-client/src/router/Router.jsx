import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from './UserRouter';
function Router() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/*" Component={UserRouter} />
    </Routes>
   </BrowserRouter>
  )
}

export default Router