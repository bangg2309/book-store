import React, {useContext, useEffect, useState} from 'react'
import { FaSignOutAlt, FaTags, FaUser, FaChartBar } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { StoreContext,actions } from '../../store';
import * as authService from '../../apiService/authService.js'
import * as userService from '../../apiService/userService.js';
import {toast} from "react-toastify";
function SideBar({children}) {
    const navigate = useNavigate();
    const [isFirst, setIsFirst] = useState(true);
    const [active, dispatch] = useContext(StoreContext);
    // const [activeIndex, setActiveIndex] = useState();
    const data =[
        {name: 'Quản lí sản phẩm', icon: <FaTags/>, link: '/productManager'},
        {name: 'Quản lí đơn hàng', icon: <FaUser/>, link: '/orderManager'},
    ]
    const handleActive = (index) => {
      
        dispatch(actions.setActive(index)) 
        
    }
    let info = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const activeIndex = JSON.parse(localStorage.getItem('active'));
        if (activeIndex !== null) {
            dispatch(actions.setActive(activeIndex))
        }
       
    }, []);
    const handleLogout = () => {
        const fetchLogout = async () => {
          const response = await authService.logout();
          if(response?.status === 200){
            localStorage.removeItem('user');
            localStorage.removeItem('active');
            localStorage.removeItem('token');
            navigate('/admin/login')
            toast.success("Logout success", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            
          }else{
            toast.error("Logout failed", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
            
        }
        fetchLogout();  
      }
      const tmp =  () => {
        if(localStorage.getItem('token') !== null){ 
          const fetchUser = async () => {
          const response = await userService.getUserByToken();
          console.log(response?.data);
          localStorage.setItem('user', JSON.stringify(response?.data));
         info = response?.data;
         }
         fetchUser();
        }
      }
 
      useEffect(() => { 
        const fetch = setInterval(() => {
            tmp();
        },1000*60*15);
        return () => clearInterval(fetch);
       
    },[])
  return (
    <div className='z-50'>
        <div className='max-w-100 h-[40px] bg-primary sticky top-0'>
            <div className='container mx-auto h-[100%] flex justify-end items-center'>
                <button className='bg-yellow h-[100%] px-3' onClick={handleLogout}> <FaSignOutAlt className='text-primary'/></button>
            </div>
        </div>
        <div className='flex gap-3 max-h-screen'>
            <div id="separator-sidebar" className="z-40 w-64 fixed basis-1/6 bg-primary h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className='p-4 border-b border-[#ffffff]'>
                    <div className='rounded-full border-2 mx-auto border-yellow w-[100px] h-[100px] flex justify-center items-center'>
                        <img className='rounded-full w-[95%] h-[95%]' src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-9.jpg" alt=""  />
                    </div>
                    <h1 className='text-white font-medium text-lg'>{info?.fullName}</h1>
                </div>
                <div className='py-4'>
                    <ul className="space-y-2 font-medium">
                    {data.map((item, index) => {
                        return(
                            <Link key={index} onMouseDown={(e)=> e.preventDefault()} to={`/admin${item.link}`} >
                                <li onClick={()=>handleActive(index)}   className={`cursor-pointer mb-2 rounded-md ${active.active === index ? 'bg-yellow': 'hover:bg-[#62c7f3c2]' }  py-5 flex items-center justify-start pl-5 w-full h-[30px]`} >
                                    <div className='text-left flex gap-5 justify-start items-center text-white' >
                                        {item.icon}
                                        <p>{item.name}</p>
                                    </div>
                                </li>
                        </Link>
                    )})}
                    </ul>
                </div>
                </div>
            </div>
            <div className='basis-5/6 ml-[270px] py-3'>
                {children}
            </div>
        </div>
        
    </div>
  )
}

export default SideBar