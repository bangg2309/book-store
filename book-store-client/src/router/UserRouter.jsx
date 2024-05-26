import React, {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "../pages/user/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

function Checkout() {
    return null;
}

function UserRouter() {
    const [isLogin, setIsLogin] = React.useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            if(token !== null){
                setIsLogin(true);
            }
            window.scrollTo(0, 0);
        }, [pathname, isLogin, token]);
        return null;
    }
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route>
        <Route path="/" exact element={<Home />} />
            <Route path="/login" exact  element={<Login />} />
            <Route path="/register" exact  element={<Register />} />
            <Route path="/checkout" exact  element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserRouter;
