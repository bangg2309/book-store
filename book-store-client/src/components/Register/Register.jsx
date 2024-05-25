import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import * as authService from '../../apiService/authService.js'
import {toast} from "react-toastify";
function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    roles:"ROLE_USER"

  });
const handleRegister = (values) => {
  const fetchRegister = async () => {
    try{
      const response = await authService.register(values);
      if(response?.status === 200){
        navigate('/login');
        toast.success("Register success", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
      }
    }catch(error){
      if(error.response && error.response.status === 400){
        toast.error("Username is already taken", {
         
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
      }
    }
    
    
  }
  fetchRegister();
}
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').test('check-username', 'Username is already taken', async (value) => {
    if (value) {
      const response = await authService.checkUsername(value);
      return response.data !== 'User is exists';
    }
    return true;
  }),
  password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters').max(20, 'Password must be at most 20 characters'),
  fullName: Yup.string().required('Fullname is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
});

  return (
    <div id="bg" className="w-full flex justify-center items-center h-screen">
    <div className='bg-[#000000c4] p-10 rounded-md w-[400px] h-[490px]'>
      <Formik onSubmit={(values)=>handleRegister(values)}
          initialValues={data}
        validationSchema={validationSchema}
       >

        <Form>
        <h1 className='font-bold text-white text-4xl mb-4'>SingUp</h1>
        <div>
          <Field type="text" className='rounded-sm w-[100%] h-[35px] p-3 mt-4 focus:outline-none focus:ring focus:border-blue-500' name='username'  placeholder='Username...'/>
          <ErrorMessage name='username' component='div' className='text-[#ff3842] text-left'/>
        </div>
        <div>
          <Field type="password" name='password'  className='rounded-sm w-[100%] h-[35px] p-3 mt-3 focus:outline-none focus:ring focus:border-blue-500' placeholder='Password...' />
          <ErrorMessage name='password' component='div' className='text-[#ff3842] text-left'/>
        </div>
       
        <div>
          <Field type="text" name='fullName'  className='rounded-sm w-[100%] h-[35px] p-3 mt-3 focus:outline-none focus:ring focus:border-blue-500' placeholder='Fullname...' />
          <ErrorMessage name='fullName' component='div' className='text-[#ff3842] text-left'/>
        </div>
        <div className='shadow-md'>
          <Field type="email" name='email'  className='rounded-sm w-[100%] h-[35px] p-3 mt-3 shadow-sm  focus:outline-none focus:ring focus:border-blue-500' placeholder='Email...'/>
          <ErrorMessage name='email' component='div' className='text-[#ff3842] text-left'/>
        </div>
        
        <div>
          <button className='bg-yellow mt-3 rounded-sm py-3 px-20 text-primary font-bold text-md hover:bg-yellow-hover duration-300 active:bg-yellow  ' type='submit'>Signup</button>
        </div>
        <Link to="/" className='block text-center text-white mt-4 hover:text-yellow duration-500'>Back to home</Link>
        </Form>

      </Formik>
    </div>

  </div>
  )
}

export default Register