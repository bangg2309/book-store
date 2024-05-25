import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/common/Layout/AdminLayout";
import { useContext } from "react";
import { StoreContext, actions } from "../../../store";
import * as category from "../../../apiService/categoryService";
import * as product from "../../../apiService/productService";
import {storage, storageRef} from "../../../utils/firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

function NewProduct() {
  const [img, setImg] = useState("");
  const [cid, setCid] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
   const [categories, setCategories] = useState([]);
   const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
    categoryId: cid,
    author:'',
    publisher:''
   });
  const [modal, dispatch] = useContext(StoreContext);
  
  const handleModal = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    dispatch(actions.setShowModal(!modal.modal));
  };
  const handleChange = (e) => {
    setCid(e.target.value);
    console.log(e.target.value);
  };
  const handleData = (e) => {
    const newData = {...data};
    newData.categoryId = cid;
    newData[e.target.name] = e.target.value;
    setData(newData);
  }
  const handleSubmit = () => {
    

   const fetchCreateProduct = async () => {
    console.log(data);
    const res = await product.createProduct(data);
    if(res.status === 200){
      toast.success("Add product success!", {
        position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
    }else{
      toast.error("Add product failed!", {
        position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
    }
    console.log(res);
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
    const fetchCategories = async () => {
      const res = await category.getAllCategory();
      setCategories(res?.data);
    };
    fetchCategories();
  }, []);
  
  return (
    <div
      className={`bg-[#00000085] absolute top-0 bottom-0 left-0 w-full h-full z-50 ${
        modal.modal ? "visible" : "invisible"
      }`}
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
              value={data.name}
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
              value={data.description}
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
              value={data.price}
              onChange={handleData}
            />
          </div>
          <div className="mb-3">
            <label className="block text-left font-medium" htmlFor="quantity">
              Quantity:
            </label>
            <input className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500" id="quantity" type="number" name="quantity" value={data.quantity}  onChange={handleData}/>
          </div>
          <div className="mb-3 text-left flex justify-around items-center gap-4">
          <div className="basis-1/3">
            <label className="block text-left font-medium" htmlFor="quantity">
                Category:
              </label>
              <select
              className="rounded-sm w-[100%] h-full p-2 mt-1 shadow-sm outline-1 outline-double outline-[#9e9a9ab2]  focus:outline-none focus:ring focus:border-blue-500"
                 style={{ width: '100%' }}
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
              Add New Product
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

export default NewProduct;
