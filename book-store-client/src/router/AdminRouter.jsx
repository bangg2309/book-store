import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductManager from "../pages/admin/ProductManager/ProductManager";
import LoginAdmin from "../pages/admin/Login/LoginAdmin";

function AdminRouter() {
  const [isLogin, setIsLogin] = React.useState(false);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      if(localStorage.getItem('token') !== null && JSON.parse(localStorage.getItem('user')).roles === 'ROLE_ADMIN') {
        setIsLogin(true);
      }
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
      return (
        <div>
          <ScrollToTop />
          <Routes>
            <Route>
              <Route path="/" exact element={isLogin ? <ProductManager/> : <LoginAdmin/>} />
              <Route path="/login" exact element={<LoginAdmin/>} />
              <Route path="/productManager" element={isLogin?<ProductManager/>: <LoginAdmin/>} />
            </Route>
          </Routes>
        </div>
        );
}

export default AdminRouter