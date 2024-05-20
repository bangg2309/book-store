import React from 'react'
import Logo from '../../assets/img/Bookworn.svg'
function Footer() {
  return (
    <div className='bg-primary'>
      <div className='container mx-auto flex py-20 justify-center text-white text-left'>
      <div className='basis-1/3'>
        <img src={Logo} alt="" />
      </div>
      <div className='basis-1/6'>
        <h1 className="uppercase mb-3 font-serif text-xl">About Us</h1>
        <ul className="text-md">
          <li>Vision</li>
          <li>Acticle</li>
          <li>Careers</li>
          <li>Service terms</li>
          <li>Donate</li>
        </ul>
      </div>
      <div className='basis-1/6'>
      <h1 className="uppercase mb-3 font-serif text-xl">Discovery</h1>
      <ul className="text-md">
          <li>Home</li>
          <li>Books</li>
          <li>Authors</li>
          <li>Subjects</li>
          <li>Advanded Search</li>
        </ul>
      </div>
      <div className='basis-1/6'>
      <h1 className="uppercase mb-3 font-serif text-xl">My Account</h1>
      <ul className="text-md">
          <li>Signin</li> 
          <li>View cart</li>
          <li>My wishlist</li>
          <li>Track my order</li>

        </ul>
      </div>
      <div className='basis-1/6'>
      <h1 className="uppercase mb-3 font-serif text-xl">Help</h1>
      <ul className="text-md">
          <li>Help center</li>
          <li>Report a problem</li>
          <li>Suggesting edits</li>
          <li>Contact Us</li>
        </ul>
      </div>
        
      </div>
    </div>
  )
}

export default Footer