import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import ListProduct from './ListProduct'

import NewProduct from './NewProduct'
import { useContext } from 'react'
import { StoreContext } from '../../../store'
import { actions } from '../../../store'
import AdminLayout from '../../../components/common/Layout/AdminLayout'
// import * as productService from '../../../apiService/productService'

function ProductManager() {
  // const [searchResult, setSearchResult] = useState([])
  // const [search, setSearch] = useState('')
  // const [isFirst, setIsFirst] = useState(true)
  const [modal, dispatch] = useContext(StoreContext)
  const handleModal = () => {
   
    dispatch(actions.setShowModal(!modal.modal))
    // console.log(modal);
  }
  // useEffect(() => {
  //   if(isFirst) {
  //     setIsFirst(false)
  //     return;
  //   }
  //   const searchProduct = async () => {
  //     const response = await productService.searchProductByName(search);
  //     console.log(response?.data);
  //      setSearchResult(response?.data);
  //   }
  //   searchProduct();
  // }, [search])
  return (
    <AdminLayout >
    <div className='flex justify-between items-center'>
        
        <div className='bg-[#2dd51d82] w-[200px] cursor-pointer flex items-center justify-center rounded-md py-2 px-3' onClick={handleModal}>
            <FaPlus className='text-[#10552a] mr-2'/>
            <button className='text-[#10552a] text-[18px] font-medium'>Add new product</button>
        </div>
      
        <div className='flex justify-between items-center mr-3 border-b border-[#d8d8d8] pb-2'>
         
          <div className='flex justify-end items-center bg-[#d8d8d8] p-2 rounded-sm '>
            <p>Tìm kiếm: </p>
            <input className='ml-2 rounded-sm focus:outline-none px-1' type="text" />
          </div>
        </div>
          
      
        
    </div>
    <ListProduct/>
    </AdminLayout>
  )
}

export default ProductManager