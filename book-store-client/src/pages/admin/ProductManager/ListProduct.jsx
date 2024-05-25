import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as productService from '../../../apiService/productService';
import { useContext } from 'react'
import { Pagination } from 'antd'
import { StoreContext } from '../../../store'
import { actions } from '../../../store'
import { formatCurrency } from '../../../utils/format';
import { toast } from "react-toastify";
function ListProduct() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(40);
  const [modal, dispatch] = useContext(StoreContext)

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
  
      const response = await productService.getAllProductAdmin(page,pageSize);
      // const res = await productService.getAll();
        setTotal(response?.data.totalElements);
      
      setProducts(response?.data.content);
 
  }
  const onShowSizeChange = (current, pageSize) => {
    setPage(current-1);
    setPageSize(pageSize);
    console.log(current, pageSize);
  }
  const handlePageChange = (page) => {
    if(page === 1){
      setPage(0);
    } else{ setPage(page-1);}
   
    console.log(page);
  }
  useEffect(() => {
    
    fetchProducts();
  }, [modal, page, pageSize])
const handleModal = (id) => {
  dispatch(actions.setShowModalEdit(!modal.modalEdit, id))
 
}
const handleDelete = (id) => {
  const fetchDelete = async () => {
    console.log("id: " + id);
    try {
    const res = await productService.deleteProductById(id);
      if(res.status === 200){
        toast.success("Delete product success!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        fetchProducts();
      }
    } catch (error) {
      if(error.response && error.response.status === 403){
        toast.error("Delete product failed!", {
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
  fetchDelete();
}
  return (
    <div >
      <div className=" mt-3 overflow-x-auto z-10 shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-[#6b7280] table-auto">
          <thead className="text-sm text-[#374151] uppercase bg-[#f9fafb] ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Quantity input
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {products.map((product, index) => (
            <tr key={index} className="bg-white">
              <td className="px-6 py-4 font-medium text-[#111827] whitespace-nowrap">
                {product.id}
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">
                <img src={product.image} alt="" className="w-10 h-14" />
              </td>
              <td className="text-center px-6 py-4">{product.quantity}</td>
              <td className="px-6 py-4">{product.quantity - product.sales <= 0 ? 'Hết hàng': 'Còn hàng'}</td>
              <td className="px-6 py-4">{formatCurrency(product.price)}</td>
              <td className="px-6 py-4">{product.category.name}</td>
              <td className="px-6 py-4">
                <Link className="font-medium text-[#3b82f6] hover:underline" onClick={()=>handleModal(product.id)}>
                  Edit
                </Link>
                <span
                  className="ml-2 cursor-pointer font-medium text-[#3b82f6] hover:underline"
                  onClick={()=>handleDelete(product.id)}
                >
                  Delete
                </span>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <div className='mt-5 mb-7'>
        <Pagination showSizeChanger onShowSizeChange={onShowSizeChange}  onChange={handlePageChange}  defaultCurrent={1} total={total} />
      </div>
    </div>
  );
}

export default ListProduct;
