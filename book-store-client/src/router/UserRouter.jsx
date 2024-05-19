import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home/Home";


function UserRouter() {
  return (
    <div>
      <Routes>
        <Route>
        <Route path="/" exact element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserRouter;
