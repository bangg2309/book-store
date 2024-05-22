import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/common/Layout/UserLayout";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Carousels from "./Carousel";
import Sliders from "./Sliders";
import Image from "../../../assets/img/Image1.png";
import * as productsService from "../../../apiService/productService";
import { useTranslation } from "react-i18next";


function Home() {
    const {t} = useTranslation();
    const [products, setProducts] = useState([]);
    const [bestsellers, setBestsellers] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await productsService.getNewArrivals();
            setProducts(response.data);
        }
        const fetchBestsellers = async () => {
            const response = await productsService.getBestSellers();
            setBestsellers(response.data);
        }
        fetchProducts();
        fetchBestsellers();
    },[])
    return (
        <UserLayout>
            <Carousels></Carousels>
            <div>
                <h1 className="text-primary mt-10 text-[35px] antialiased font-bold">{t('new-arrival')}</h1>
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
                <h1 className="text-primary mt-10 text-[35px] antialiased font-bold">{t('best-seller')}</h1>
            </div>
            <Sliders products={bestsellers}/>
            <div className="bg-primary p-10  mt-8">
                <div className=" container mx-auto flex ">
                    <div className="basis-1/2 text-left content-center my-auto pl-20">
                        <div>
                            <h1 className="mb-3 text-white text-[35px] antialiased font-bold text-left">Get Book Copy Today!</h1>
                            <div className="mb-5 w-[55px] border-2 border-yellow"></div>
                        </div>
                        <div className="text-left">
                            <p className=" text-[20px] text-white">This the first true value generator on the Internet. It uses alphas dictionary of over 200 Latin words.</p>
                            <button className="mt-5 text-[18px] text-white px-4 py-2 border-2 border-yellow rounded-md hover:bg-yellow hover:text-primary duration-300 active:bg-yellow-hover">Order Today</button>
                        </div>
                    </div>
                    <div className="basis-1/2 ">
                        <div className="w-[640px] h-[427px]">
                            <div style={{backgroundImage: `url('${Image2}')`}} className="min-w-[400px] min-h-[400px] w-full bg-cover"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container mx-auto p-28">
                <div className=" bg-yellow mx-20 p-20">
                    <div className=" ">
                        <h1 className="font-serif text-primary mb-5 text-center text-[38px] font-bold">Subscribe to our</h1>
                    </div>
                    <div className="">
                        <div className="content-center">
                            <p className=" text-[20px] text-center mb-5 text-white">Leave your email so we can notify you when we have the <br></br> latest book information.</p>
                            <div className="flex justify-center">
                                <div className="bg-white px-1 py-2 rounded-md flex justify-center items-center basis-1/3 h-10">
                                    <input className="w-[100%] pr-2 focus:outline-none"  id="input" type="text" placeholder="Search..." />
                                </div>
                                <button  className="bg-primary text-white border-none ml-2 px-3 py-2 rounded-md flex justify-center items-center hover:bg-[#6d91ca] duration-200 active:bg-primary">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

export default Home;
