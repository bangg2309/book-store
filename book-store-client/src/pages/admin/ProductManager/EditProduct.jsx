import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/common/Layout/AdminLayout";
import { useContext } from "react";
import { StoreContext, actions } from "../../../store";
import * as category from "../../../apiService/categoryService";
import * as product from "../../../apiService/productService";
import {storage, storageRef} from "../../../utils/firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

function EditProduct() {
  const [img, setImg] = useState("");
  const [cid, setCid] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
   const [categories, setCategories] = useState([]);
   const [pro, setProduct] = useState({});
   const [isFirst, setIsFirst] = useState(true)
   const [data, setData] = useState({
    name: pro.name,
    description: pro.description,
    price: pro.price,
    image: pro.image,
    quantity: pro.quantity,
    categoryId: '',
    author: pro.author?.name,
    publisher:pro.publisher?.name
   });
  const [dataEdit, dispatch] = useContext(StoreContext);
  
  const handleModal = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    dispatch(actions.setShowModalEdit(!dataEdit.modalEdit));
  };
  const handleChange = (e) => {
    const newCid = e.target.value
    setCid(newCid);
    const newData = { ...data };
  newData.categoryId = newCid;
  setData(newData);
    console.log(e.target.value);
  };
  const handleData = (e) => {
    const newData = {...data};
    newData.categoryId = cid;
    newData[e.target.name] = e.target.value;
    setData(newData);
  }
  const handleSubmit = () => {
    const newData = {...data};
    newData.categoryId = cid;
    setData(newData);
   const fetchCreateProduct = async () => {
    // console.log(data);
    try{
      console.log(data);
      const res = await product.updateProductById(dataEdit.idEdit, data);
      console.log(res);
      if(res.status === 200){
        toast.success("Update product success!", {
          position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
      }
    }catch(error){
        if(error.response.status === 400){
          toast.error("Update product failed!", {
            position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
        }
    }
    
   
     
    
    // console.log(res);
   }
   fetchCreateProduct();
    
  };
  const handleUpload =  async(e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    const storageRef = ref(storage, `image/${file.name}`);
  try {
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    
    const newData = await {...data};
    newData.image = downloadURL;
    setData(newData);
    setImg(downloadURL);
  } catch (error) {
    console.log("Error uploading file:", error);
  }}

  useEffect(() => {
    if(isFirst || dataEdit.idEdit === undefined){
      setIsFirst(false);
      return;
    }
    // console.log(dataEdit.idEdit);
    const fetchCategories = async () => {
      const res = await category.getAllCategory();
      setCategories(res?.data);
    };
    const fetchProductById = async () => {
      const res = await product.getProductById(dataEdit.idEdit);
      // console.log(res?.data);
      const newData = {...data}
      newData.categoryId = res.data.category.id;
      newData.author = res.data.author.name;
      newData.publisher = res.data.publisher.name;
      newData.description = res.data.description
      newData.price = res.data.price
      newData.name = res.data.name
      newData.quantity = res.data.quantity
      setData(newData);
      setProduct(res.data);
      setSelectedImage(res?.data.image);
    }
    fetchProductById();
    fetchCategories();
  }, [dataEdit.idEdit]);
  
   
    
  
  
  return (
    <div
      className={`bg-[#00000085] absolute bottom-0 overflow-y-auto left-0 w-full h-full z-50 ${dataEdit.idEdit ? "visible" : "invisible"}`}
    >
      <div className="flex justify-center ">
        <div className="basis-1/3 bg-[#fff] rounded-md shadow-xl px-10  py-5 my-22 mt-4">
          <div className="mb-3">
            <label className="block text-left font-medium" htmlFor="name">
              Name:
            </label>
            <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              defaultValue={pro.name}
              onChange={handleData}
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-left font-medium"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
              rows={4} 
              type="text"
              name="description"
              id="description"
              defaultValue={pro.description}
              onChange={handleData}
            />
          </div>
          <div className="mb-3">
            <label className="block text-left font-medium" htmlFor="price">
              Price:
            </label>
            <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
              type="number"
              name="price"
              id="price"
              defaultValue={pro.price}
              onChange={handleData}
            />
          </div>
          <div className="mb-3">
            <label className="block text-left font-medium" htmlFor="quantity">
              Quantity:
            </label>
            <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500" id="quantity" type="number" name="quantity" defaultValue={pro.quantity}  onChange={handleData}/>
          </div>
          <div className="mb-3 text-left flex justify-around items-center gap-4">
          <div className="basis-1/3">
            <label className="block text-left font-medium" htmlFor="quantity">
                Category:
              </label>
              <select
              className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
                 style={{ width: '100%' }}
                value={cid}
                onChange={handleChange}>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>{category.name}</option>
                ))};
              </select>

          </div>
          <div>
            <label className="block text-left font-medium" htmlFor="quantity">
                Author:
              </label>
              <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500" name="author"
              defaultValue={pro.author?.name}
                // style={{ width: '30%' }}
                onChange={handleData}
              />
          </div>
          <div>
            <label className="block text-left font-medium" htmlFor="quantity">
                Publisher:
              </label>
              <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
              name="publisher"
              defaultValue={pro.publisher?.name}
                // style={{ width: '30%' }}
                onChange={handleData}
              />
          </div>
          
          </div>
          <div className="mb-3">
            <label className="block text-left font-medium" htmlFor="image">
              Image:
            </label>
            <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
            name="image"
              type="file"
              id="image"
              onChange={handleUpload}
            />
             {selectedImage && <img className="mt-2 w-[130px] h-[130px]" src={selectedImage} alt="Selected" />}
          </div>
          <div className="text-right mt-2">
            <button
              onClick={handleSubmit}
              className="text-left text-[#10552a] text-[18px] font-medium bg-[#2dd51d82] px-3 py-2 mx-2 rounded-md"
            >
              Update Product
            </button>
            <button
              className="text-left text-[#8b1d1d] text-[18px] font-medium bg-[#f7464e82] px-3 py-2 rounded-md"
              onMouseDown={handleModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
