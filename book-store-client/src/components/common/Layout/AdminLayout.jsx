import React from 'react'
import SideBar from '../../SideBar/SideBar'

import NewProduct from '../../../pages/admin/ProductManager/NewProduct'
import EditProduct from '../../../pages/admin/ProductManager/EditProduct'
import EditOrder from '../../../pages/admin/OrderManager/EditOrder'

function AdminLayout({children}) {
 
  return (
    <div className='relative w-full max-w-full h-screen'>
      <SideBar children={children}>
      </SideBar>
      <div>
      <NewProduct/>
      <EditProduct/>
      <EditOrder/>
      </div>
     
      
    </div>
  )
}

export default AdminLayout