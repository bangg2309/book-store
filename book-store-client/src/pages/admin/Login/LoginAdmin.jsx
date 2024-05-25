import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as authService from '../../../apiService/authService'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userService from '../../../apiService/userService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
function LoginAdmin() {
  const navigate = useNavigate();
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }
   const handleLogin = (values) => {
    const data = {username:values.username, password:values.password}
    console.log(data);
      const fetchLogin = async () => {
        try {
          const response = await authService.login(data);
          localStorage.setItem('token', JSON.stringify(response?.data));
            if(localStorage.getItem('token') !== null){ 
              const response = await userService.getUserByToken();
              if(response?.data.roles !== 'ROLE_ADMIN'){
                toast.error("Login failed username invalid!", toastConfig);
                localStorage.removeItem('token');
                return;
              }
              console.log(response?.data);
              localStorage.setItem('user', JSON.stringify(response?.data));
              console.log(JSON.parse(localStorage.getItem('user')).roles);
              navigate('/admin/productManager');
          }
          if(response.status === 200){
            
            toast.success("Login success!", toastConfig);
           
            
            
          }
        } catch (error) {
          if(error.response && error.response.status === 403){
            toast.error("Login failed username or password invalid!", toastConfig);
          }
        }
          
      }
      fetchLogin();
     
    }
    const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters').max(20, 'Password must be at most 20 characters'),
      })
      const initialValues = {
      username: '',
      password: '',
      }
  return (
    <div id="bg" className="w-full flex justify-center items-center h-screen">
      <div className='bg-[#000000c4] p-10 rounded-md w-[400px] h-[400px]'>
        <div >
          <h1 className='font-bold text-white text-4xl mb-4'>Login Admin</h1>
          <Formik 
            onSubmit={(values)=>handleLogin(values)}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form>
          <div className='shadow-md'>
            <Field type="text" required name="username" className='rounded-sm w-[100%] h-[35px] p-3  shadow-sm  focus:outline-none focus:ring focus:border-blue-500' placeholder='Username...' />
            <ErrorMessage name="username" component="div" className='text-[#ff3842] text-left' />
          </div>
          <div>
            <Field type="password" required name="password" className='rounded-sm w-[100%] h-[35px] mt-4 p-3 focus:outline-none focus:ring focus:border-blue-500' placeholder='Password...' />
            <ErrorMessage name="password" component="div" className='text-[#ff3842] text-left' />
            <div className='flex justify-end mb-1'>
            <Link to="/" className='block  text-yellow hover:text-yellow-hover active:text-yellow'>Forgot password?</Link>
            </div>
            <div className='flex justify-end mb-4'>  
              <p className='inline-block text-yellow'>Don't have an account? <Link to="/admin/register" className='text-yellow hover:text-primary underline decoration-white'>Signup</Link></p>
            </div>
          </div>

          <div>
            <button className='bg-yellow rounded-sm py-3 px-20 text-primary font-bold text-md hover:bg-yellow-hover duration-300 active:bg-yellow  ' >Login</button>
          </div>
          <Link to="/" className='block text-center text-white mt-4 hover:text-yellow duration-500'>Back to home</Link>
          </Form>
          </Formik>
        </div>
      </div>

    </div>
  )
}

export default LoginAdmin