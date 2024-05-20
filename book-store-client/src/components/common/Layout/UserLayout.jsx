import React from 'react'
import Headers from '../../Header/Header'
import Footer from '../../Footer/Footer'
const UserLayout = ({children}) => {
  return (
    <div className='w-full max-w-full'>
       <Headers></Headers>
       <div className='scroll-smooth'>
        {children}
       </div>
       <Footer></Footer>
    </div>
  )
}

export default UserLayout