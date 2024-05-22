import React, {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "../pages/user/Home/Home";


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
      <Routes>
        <Route>
        <Route path="/" exact element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default UserRouter;
