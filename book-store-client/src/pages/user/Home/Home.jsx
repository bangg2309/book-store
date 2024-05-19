import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/common/Layout/UserLayout";
import Carousels from "./Carousel";
import Sliders from "./Sliders";
import Image from "../../../assets/img/Image1.png";
import Image2 from "../../../assets/img/Image2.png";
import * as productsService from "../../../apiService/productService";



function Home() {
  const [products, setProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await productsService.getNewArrivals();
       setProducts(response);
    }
    const fetchBestsellers = async () => {
        const response = await productsService.getBestSellers();
        console.log(response.length)
        setBestsellers(response);
    }
    fetchProducts();
    fetchBestsellers();
  },[])
  return (
    <UserLayout>
      <Carousels></Carousels>
      <div>
        <h1 className="text-primary mt-10 text-[35px] antialiased font-bold">New Arrival</h1>
      </div>
      <Sliders products={products}/>
    
     <div className="bg-[#F5F8FC] p-20 pt-24 mt-8">
      <div className=" container mx-auto flex ">
        <div className="basis-1/2 pl-[300px]">
            <div className="relative w-[350px] h-[400px] border-[10px] border-yellow">
              <div style={{backgroundImage: `url('${Image}')`}} className="absolute shadow-xl bg-cover bottom-[20px] right-[20px] w-[350px] h-[400px]"></div>
            </div> 
        </div>
        <div className="basis-1/2 text-left content-center my-auto pr-[250px]">
          <div>
            <h1 className="text-primary mb-5 text-[35px] antialiased font-bold text-center">Quote of the day</h1>
          </div>
          <div className="text-center">
            <p className="text-primary text-[25px]">The more that you read, the more things you will know. The more that you learn, the more places you’ll go
            </p>
            <p className="text-primary mt-3 text-[18px]">Dr. Seuss</p>
          </div>

        </div>
      </div>
     </div>
     <div>
        <h1 className="text-primary mt-10 text-[35px] antialiased font-bold">Best Seller</h1>
      </div>
    <Sliders products={bestsellers}/>
    </UserLayout>
  );
}

export default Home;
